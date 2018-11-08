/*
AI Instrumentation and Preparation Tools

Jonathan Reus (c) 2018 CC-SA

Linear Regression and K-means routines repurposed from shaman library: https://github.com/luccastera/shaman

*/

// embed this into the catalog object
// var taxonomy = KMeans(); // creates the KMeans clustering engine

/* USAGE:

var collection = new Catalog()

collection.entries = {}; // the Catalog contains a dictionary called entries
entry = collection.entries["poetic-rhetoric"]; // entries contains an object for each catalog entry
entry.text;
entry.image;
entry.tags; // is an array of arrays, each is one tag and its weight [tagname, tagweight]

var num_clusters = 5;
var measurement = measures.euclidean; // or another premade function, or one that is created on the fly

collection.cluster(num_clusters, measurement);

*/



/***************************
// MEASUREMENT, FEATURE CREATION, DISTANCE & SIMILARITY FUNCTIONS
****************************/
var Measures = new Object();

// euclidean distance between two FeatureVecs
Measures.euclidean = function(a, b, options) {
  var sum = 0;
  var n, feature_list;
  a = a.features;
  b = b.features;
  if(typeof a == "number") {
          sum = Math.pow(a-b, 2);
  } else {
        for (n=0; n < a.length; n++) {
          sum += Math.pow(a[n]-b[n], 2);
        }
  }
  return Math.sqrt(sum);
};
/***************************
// END MEASUREMENT FUNCTIONS
****************************/




/***************************
// EXAMPLE AND CATALOG CLASSES
****************************/
var Example = function(id) {
        this.id = id;
        this.text;
        this.image;
        this.tags = {};
}

Example.prototype.addTag = function(tag_weight) {
        var weight, tag;
        tag = this.cleanTag(tag_weight[0]);
        if(tag_weight.length == 1) { // no weight given for tag
                weight = 0.5;
        } else {
                weight = tag_weight[1];
        }
        this.tags[tag] = weight;
}

// Remove spaces and other funky characters so the tag can be used as a dictionary id
Example.prototype.cleanTag = function(tag_string) {
        return tag_string.trim().replace(/[\W]/g,'_');
}

Example.prototype.tagWeight = function(tag) {
        var result = this.tags[tag];
        if(result == undefined) {
                result = 0.0;
        }
        return result;
}

// Gets a feature vector for this example using the given options
// Generates a FeatureVec from a given example based on what's in options.
// for now options only contains one item: 'taglist' which is an array of tag names
// to retrieve as features, but could in the future describe more complex features
Example.prototype.getFeatures = function(options) {
    var taglist, tagweight, features;
    taglist = options["taglist"];
    features = new Array(taglist.length);
    for(var i = 0; i < taglist.length; i++) { // create a feature vector from tag weights
        tagweight = this.tags[taglist[i]];
        if(tagweight == undefined) {
            tagweight = 0.0;
        }
        features[i] = tagweight;
        //console.log("Set features",i,"to",tagweight);
    }
    return new FeatureVec(this, features);
}

/*************
// FeatureVec
// An easier to work with feature vector with its example attached to it.
**************/
var FeatureVec = function(example, features) {
    this.example = example;
    this.features = features;
}

// Make a copy of this FeatureVec
FeatureVec.prototype.copy = function() {
    return new FeatureVec(this.example, this.features.slice());
}


/*************
// CATALOG
**************/
var Catalog = function() {
        this.examples = {}; // dictionary of example id->Example
        this.allTags = [];
}

Catalog.prototype.addExample = function(newexample) {
        for(let [tag, weight] of Object.entries(newexample.tags)) {
            var found = false;
            for(var i=0; i < this.allTags.length; i++) {
                if(this.allTags[i] == tag) {
                    found = true;
                }
            }
            if(found != true) {
                this.allTags.push(tag);
            }
        }
        //this.allTags.sort();
        this.examples[newexample.id] = newexample;
}

// Get examples as an array of FeatureVecs
// the number and types of features are determined by options
// usually this is just a list of tag weights
Catalog.prototype.examplesAsFeatures = function(options) {
    var asfeatures, examples_as_features = [];
    for(let example of Object.values(this.examples)) {
        asfeatures = example.getFeatures(options);
        examples_as_features.push(asfeatures);
    }
    return examples_as_features;
}

// Randomize example DIVs in the DOM
Catalog.prototype.randomize = function() {
        for (let [key, value] of Object.entries(this.examples)) {
                document.querySelector("#"+key).style.top = Math.floor(Math.random() * 900) + 'px';
                document.querySelector("#"+key).style.left = Math.floor(Math.random() * 1200) + 'px';
        }
}

// Clusters using a number of clusters and a comparison function
// uses KMEANS clustering/unsupervised learning
Catalog.prototype.cluster = function(num_clusters, measure, thetaglist, iters) {
    var options, iterations, measurement, examples_as_features;
    iterations = iters || 100;
    measurement = measure || Measures.euclidean;
    options = {taglist: thetaglist, similarityFunc: measurement, iterations: iterations};
    this.kmeans = new KMeans(num_clusters, options);
    examplesAsFeatures = this.examplesAsFeatures(options);
    this.kmeans.cluster(examplesAsFeatures, this.processClusters);
}

// Callback function for KMEANS algorithm
Catalog.prototype.processClusters = function(err, clusters, centroids) {
        // show any errors
        console.log("ERROR:",err);
        // show the clusters found
        console.log("CLUSTERS:",clusters);
        // show the centroids
        console.log("CENTROIDS:",centroids);

        // REMAP THE DIVS BASED ON CLUSTER AND DISTANCES

}
/***************************
// END EXAMPLE AND CATALOG CLASSES
****************************/




/***************************
// KMEANS CLASS
****************************/
var KMeans = function(K, options) {
  options = options || {};
  this.K = K || 3;
  this.centroids = [];
  this.clusters = [];
  this.similarityFunc = options["similarityFunc"];
  this.tagList = options["taglist"] || [];
  this.iterations = options.iterations || 1000;
  this.options = options || {};
}

KMeans.prototype.cluster = function(examples, callback) {
  var self = this;

  if (!examples) {
    return callback(new Error('an array of examples is required.'));
} else if (!Array.isArray(examples)) {
    return callback(new Error('examples must be an array.'));
} else if (examples.length < self.K) {
    return callback(new Error('examples must have at least K data points.'));
  }


  console.log("INCOMING_EXAMPLES:", examples);

  var normalizedExamples = self.normalize(examples);

  console.log("NORMALIZED_EXAMPLES:",normalizedExamples);

  // initialize random centroids
  for (var k = 0; k < self.K; k++) {
    var newcentroid, randomIndex = Math.floor(Math.random() * normalizedExamples.length);
    newcentroid = new FeatureVec("centroid"+k, normalizedExamples[randomIndex].features.slice());
    self.centroids.push(newcentroid);
  }

  //console.log("RANDOM CENTROIDS:", self.centroids);

  // Clustering Refinement Iterations...
  for (var j = 0; j < self.iterations; j++) {
    // cluster assignment step
    var clusterIndexes = [];
    for (var i = 0; i < normalizedExamples.length; i++) {
      // How close is each point to centroid 0
      var min;
      min = this.similarityFunc(normalizedExamples[i], self.centroids[0]);
      var closestCentroid = 0;
      for (k = 0; k < self.K; k++) { // compare to other centroids
        var tmpDistance;
        tmpDistance = this.similarityFunc(normalizedExamples[i], self.centroids[k]);
        if (tmpDistance < min) {
          min = tmpDistance;
          closestCentroid = k;
        }
      }
      clusterIndexes.push(closestCentroid); // for each example, push index of closest centroid
    }

    console.log("ITERATION:",j,"CLOSEST CENTROIDS", clusterIndexes);

    // Make new centroids that better fit clusters
    // Create clusters of examples as an array of arrays
    var newCentroids = [];
    self.clusters = [];
    for (var k = 0; k < self.centroids.length; k++) { // for each centroid k
      var cluster = [];
      clusterIndexes.forEach(function(clusterIndex, index) {
        if (clusterIndex == k) {
          cluster.push(normalizedExamples[index]);
        }
      });
      self.clusters.push(cluster);

      if (cluster.length > 0) {
        // Add a new centroid for each new cluster, with its center at the mean of all examples in the cluster
        newCentroids.push(new FeatureVec("centroid"+k, self.mean(cluster)));
      } else { // clusters with no entries keep their old centroid
        newCentroids.push(self.centroids[k]);
      }
    }
    self.centroids = newCentroids;
	}

  // denormalize clusters and centroids
  self.centroids = self.denormalize(self.centroids);
  self.clusters.forEach(function(cluster, index) {
    self.clusters[index] = self.denormalize(cluster);
  });

  return callback(null, self.clusters, self.centroids);
};

// Returns an array of mean values for each feature of the example set
// E.G. if each example has four features, mean will return the average across
//  all samples of each feature [0.2, 0.34, 0.54, 0.4]
// examples is an array of FeatureVecs
KMeans.prototype.mean = function(examples) {
  if (!Array.isArray(examples)) {
    throw new Error('mean requires an array of examples as an argument.');
  }
  if (examples.length == 0) {
    return [];
  }
  var sum;
  sum = new Array(examples[0].features.length);
  for (var i = 0; i < examples.length; i++) {
    for (var k = 0; k < sum.length; k++) {
      sum[k] = (sum[k] || 0) + parseFloat(examples[i].features[k], 10);
      if (i == (examples.length - 1)) {
          sum[k] = sum[k] / examples.length;
      }
    }
  }
  return sum;
};

// examples is an array of FeatureVecs
// normalizes a feature vector using the formula: (feature - mean) / mean
KMeans.prototype.normalize = function(examples) {
  var mean = this.mean(examples);
  this.originalMean = mean;
  var normalizedExamples = [];
  examples.forEach(function(example, j) {
    var normalizedExample, normalizedFeatures, features;
    features = example.features;
    normalizedFeatures = new Array(features.length);
    for (var i = 0; i < features.length; i++) {
        normalizedFeatures[i] = (features[i] - mean[i]) / mean[i];
    }
    normalizedExample = new FeatureVec(example.example, normalizedFeatures);
    normalizedExamples.push(normalizedExample);
  });
  return normalizedExamples;
};

KMeans.prototype.denormalize = function(normalizedExamples) {
  var originalMean = this.originalMean;
  var denormalizedExamples = [];
  normalizedExamples.forEach(function(example, j) {
    var normalizedFeatures, denormalizedFeatures, denormalizedExample;
    normalizedFeatures = example.features;
    denormalizedFeatures = new Array(normalizedFeatures.length);
    for (var i = 0; i < denormalizedFeatures.length; i++) {
      denormalizedFeatures[i] = (normalizedFeatures[i] * originalMean[i]) + originalMean[i];
    }
    denormalizedExample = new FeatureVec(example.example, denormalizedFeatures);
    denormalizedExamples.push(denormalizedExample);
  });
  return denormalizedExamples;
};

var ai = new Object;
ai.KMeans = KMeans;
/***************************
// END KMEANS CLASS
****************************/



/***************************
// LINEAR REGRESSION CLASS
// REQUIRES Matrix and Vector classes from sylvester module
****************************/
var LinearRegression = function(X, Y, options) {
  this.X = X || [];
  this.Y = Y || [];

  // Setup options
  this.options = options || {};
  if (this.options.algorithm === 'GradientDescent') {
    this.algorithm = 'GradientDescent';
    this.saveCosts = options.saveCosts || false;
    this.costs = [];
  } else if (this.options.algorithm === 'NormalEquation') {
    this.algorithm = 'NormalEquation';
  } else {
    this.algorithm = 'NormalEquation';
  }

  this.debug = this.options.debug || false;

  // initialize some attributes used by LinearRegression
  this.trained = false;
  this.normalized = false;

  // verify that X is an array
  if (X && !Array.isArray(X)) {
    throw new Error('X must be an array');
  }

  // verify that Y is an array
  if (Y && !Array.isArray(Y)) {
    throw new Error('Y must be an array');
  }
};

LinearRegression.prototype.train = function(callback) {
  if (this.X.length === 0) {
    return callback(new Error('X is empty'));
  } else if (this.Y.length === 0) {
    return callback(new Error('Y is empty'));
  }

  // verify that X and Y inputs have the same length
  if (this.X.length !== this.Y.length) {
    return callback(new Error('X and Y must be of the same length'));
  }

  // if there is only one point, let's just choose a
  // slope of 0 and a y-intercept of the y passed in
  if (this.X.length === 1) {
    this.theta = $M([0, this.Y[0]]);
    this.trained = true;
    return callback();
  }

  if (this.algorithm === 'GradientDescent') {
    return this.trainWithGradientDescent(callback);
  } else {
    return this.trainWithNormalEquation(callback);
  }
};

LinearRegression.addColumnOne = function(X) {
  // The x matrix for the normal equation needs to
  // have a row of ones as its first row.
  // Let's first build the x matrix
  var zeros = Matrix.Zero(X.length,1);
  var ones = zeros.add(1);
  var x = ones.augment($M(X));
  return x;
};

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

LinearRegression.prototype.normalize = function(X) {
  if (this.debug) {
    console.log('Normalizing features...');
  }
  var nbrOfFeatures = X.dimensions().cols;
  var m = X.dimensions().rows;
  var newX = Matrix.Zero(X.dimensions().rows,1).add(1);
  this.means = [];
  this.ranges = [];
  for (var i = 2; i <= nbrOfFeatures; i++) {
    var feature = X.column(i);
    var sum = _.reduce(feature.elements, function(memo, num) { return memo + num; }, 0);
    var mean = sum / m;
    this.means.push(mean);
    var featureArray = feature.elements;
    var range = getMaxOfArray(featureArray) - getMinOfArray(featureArray);
    var normalizedFeature;
    this.ranges.push(range);
    if (range === 0) {
      normalizedFeature = feature.subtract(mean);
    } else {
      normalizedFeature = feature.subtract(mean).multiply(1 / range);
    }
    newX = newX.augment(normalizedFeature);
  }
  return newX;
};

LinearRegression.prototype.trainWithNormalEquation = function(callback) {
  if (this.debug) {
    console.log('Training with Normal Equation...');
  }
  var x = LinearRegression.addColumnOne(this.X);
  // Build the y matrix
  var y = $M(this.Y);

  // now we can apply the normal equation:
  // see formula at http://upload.wikimedia.org/math/2/c/e/2ce21b8e24ea7509a3295c3acd2ae0ea.png
  var inversePortion = x.transpose().x(x).inverse();
  if (inversePortion) {
    this.theta = inversePortion.x(x.transpose()).x(y);
    this.trained = true;
    return callback();
  } else {
    if (this.debug) {
      console.log('  shaman could not inverse the matrix. Try to use Gradient Descent instead.');
    }
    return callback(new Error('could not inverse the matrix in normal equation. Try to use Gradient Descent instead.'));
  }
};

LinearRegression.computeCost = function(X, Y, theta) {
  var m = Y.dimensions().rows;
  var xThetaMinusY = (X.x(theta)).subtract(Y);
  var xThetaMinusYSquared = _.flatten(xThetaMinusY.elements).map(function(val) { return val * val; });
  var sum = _.reduce(xThetaMinusYSquared, function(memo, num) { return memo + num; }, 0);
  return (1 / (2 * m)) * sum;
};

LinearRegression.prototype.gradientDescent = function(X, Y, theta, learningRate, numberOfIterations) {
  var m = Y.dimensions().rows;
  var nbrOfFeatures = X.dimensions().cols;

  var normalizedX = this.normalize(X);

  for (var i = 0; i < numberOfIterations; i++) {
    var xThetaMinusY = (normalizedX.x(theta)).subtract(Y);
    var tempArray = [];

    for (var j = 1; j <= nbrOfFeatures; j++) {
      var xThetaMinusYTimesXj = xThetaMinusY.transpose().x(normalizedX.column(j));
      var arrayToSum = _.flatten(xThetaMinusYTimesXj.elements);
      var sum = _.reduce(arrayToSum, function(memo, num) { return memo + num; }, 0);

      var temp = theta.e(j,1) - (learningRate / m) * sum;
      tempArray.push([temp]);
    }
    theta = $M(tempArray);
    if (this.saveCosts) {
      this.costs.push(LinearRegression.computeCost(normalizedX, Y, theta));
    }
    if (this.debug) {
      console.log('Iteration: ', i ,' -> Cost:', LinearRegression.computeCost(normalizedX, Y, theta));
    }
  }
  return theta;
};

LinearRegression.prototype.trainWithGradientDescent = function(callback) {
  var learningRate = this.options.learningRate || 0.1;
  var numberOfIterations = this.options.numberOfIterations || 8500;

  if (this.debug) {
    console.log('Training with Normal Equation...');
    console.log('  Learning Rate = ', learningRate);
    console.log('  Number of Iterations', numberOfIterations);
  }

  // build the matrix of input features
  var x = LinearRegression.addColumnOne(this.X);
  var nbrOfFeatures = x.dimensions().cols;

  // Build the y matrix
  var y = $M(this.Y);

  // initialize theta to zero
  this.theta = Matrix.Zero(nbrOfFeatures, 1);

  this.theta = this.gradientDescent(x, y, this.theta, learningRate, numberOfIterations);
  this.normalized = true;
  this.trained = true;
  return callback();
};

LinearRegression.prototype.predict = function(input) {
  var self = this;
  if (self.trained) {
    if (!Array.isArray(input)) {
      input = [input];
    }

    if (self.normalized) {
      input = input.map(function(val, index) { return (val - self.means[index]) / self.ranges[index]; });
    }

    var xInput = $V([1]).augment(input);
    var output = self.theta.transpose().x(xInput);
    return output.e(1,1);
  } else {
    throw new Error('cannot predict before training');
  }
};

ai.LinearRegression = LinearRegression;
/***************************
// END LINEAR REGRESSION CLASS
****************************/
