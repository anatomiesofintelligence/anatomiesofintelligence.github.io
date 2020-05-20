/*
AI Instrumentation and Preparation Tools

Jonathan Reus (c) 2019 CC-SA

Linear Regression and K-means routines repurposed from shaman library: https://github.com/luccastera/shaman

*/
/* USAGE:

var c = new Catalog()
c.allEntries; // the Catalog contains a dictionary called entries
entry = c.allEntries["poetic-rhetoric"]; // entries contains an object for each catalog entry
entry.text;
entry.image;
entry.tags; // is an array of arrays, each is one tag and its weight [tagname, tagweight]
var num_clusters = 5;
var measurement = measures.euclidean; // or another premade function, or one that is created on the fly

c.cluster(num_clusters, measurement);

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
  if(typeof a == "number") { // special case where feature vec is a single value
          sum = Math.pow(a-b, 2);
  } else { // calculate euclidean distance in n dimensions
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
// UTILITY FUNCTIONS
****************************/
var Util = new Object();
// Must be called in an async function with "await Util.sleep(100)"
Util.sleep_ms = function(time_milliseconds) {
	return new Promise(resolve => setTimeout(resolve,time_milliseconds));
}
Util.sleep_s = function(time_seconds) {
	return new Promise(resolve => setTimeout(resolve,time_seconds * 1000));
}
Util.sleep_beats = function(beats, seconds_per_beat) {
	return new Promise(resolve => setTimeout(resolve, beats * seconds_per_beat * 1000));
}
/***************************
// END UTILITY FUNCTIONS
****************************/


/***************************
// PROJECTIONS / DIMENSIONALITY REDUCTION FOR VISUALIZATION PURPOSES
****************************/
var Projections = new Object();

// default projection, 1D distance between centroid and entry
Projections.RADIUS = 0; // simple distance-based radial projection around centroid
Projections.SIMPLE2D = 1; // 2D plot using two features as X/Y axes
Projections.RANDOM = 2; // randomize entry positions while keeping clustering indicators
Projections.PCA2D = 3; // 2D principal component analysis
Projections.NONE = 4; // entries stay where they are, only clusters change
Projections.GRID = 5; // entries are laid out in a grid

/***************************
// END MEASUREMENT FUNCTIONS
****************************/







/***************************
// ENTRY AND CATALOG CLASSES
****************************/
var Entry = function(id, url) {
        this.id = id;
        this.url = url;
        this.text;
        this.image;
        this.features = {};
}

Entry.prototype.addFeature = function(feature) {
        var value, feature_name;
        feature_name = this.cleanFeatureName(feature[0]);
        if(feature.length == 1) { // no value given for feature, treat it as a class and give a value of 1
                value = 1;
        } else {
                value = feature[1];
        }
        this.features[feature_name] = value;
}

// Remove spaces and other funky characters so the feature name can be used as a dictionary id
Entry.prototype.cleanFeatureName = function(feature_name_string) {
        return feature_name_string.trim().replace(/[\W]/g,'_');
}

// Get the value of given feature
Entry.prototype.getFeatureValue = function(feature_name) {
        var result = this.features[feature_name];
        // if this feature isn't present, give it a random value close to 0.0
        if(result == undefined) {
          this.features[feature_name] = Math.random() * 0.1;
          result = this.features[feature_name];
        };
        return result;
}

// Generates a feature vector from a given entry based on settings in the options dict.
// NOTE: for now options only contains one item: 'features' which is an array of feature names
// that will be returned in the feature vector.
// In the future options could request more complex/self-learned features that have not been created manually.
Entry.prototype.getFeatures = function(options) {
    var requested_features, value, vec;
    requested_features = options["features"];
    vec = new Array(requested_features.length);
    for(var i = 0; i < requested_features.length; i++) { // create a vector from feature values
        value = this.features[requested_features[i]];
        if(value == undefined) { // if entry does not have a value for this feature, throw an error
          throw new Error("Feature '" + requested_features[i] + "' does not exist");
          // Old response was to generate a feature value, but now all entries should contain values for all features
          //this.features[requested_features[i]] = Math.random() * 0.00;
          //value = this.features[requested_features[i]];
        };
        vec[i] = value;
    }
    return new FeatureVec(this, vec);
}

/********************
// FeatureVec
// An easier to work with feature vector object that contains a reference to its entry.
**************/
var FeatureVec = function(entry, vec) {
    this.entry = entry;
    this.features = vec;
}

// Make a copy of this FeatureVec
FeatureVec.prototype.copy = function() {
    return new FeatureVec(this.entry, this.features.slice());
}

/***************************************************************
// CATALOG
// The core class handling all operations on the catalog
***********************************/
var Catalog = function() {
        this.allEntries = {}; // dictionary of entry id->Entry
        this.allFeatureNames = []; // array of hand-picked feature names (taken from catalog database)
        // Algorithms:
        this.kmeans = new KMeans();
}

// Add a new entry to the catalog data structure
Catalog.prototype.addEntry = function(newentry) {
        for(let [feature_name, weight] of Object.entries(newentry.features)) {
            var found = false;
            for(var i=0; i < this.allFeatureNames.length; i++) {
                if(this.allFeatureNames[i] == feature_name) {
                    found = true;
                }
            }
            if(found != true) {
                this.allFeatureNames.push(feature_name);
            }
        }
        //this.allFeatureNames.sort();
        this.allEntries[newentry.id] = newentry;
}

// Get entries as an array of FeatureVecs that can then be used for calculations.
// The selection of features used is determined by options, which is passed to
// the 'getFeatures' method of each entry.
Catalog.prototype.entriesAsFeatures = function(options) {
    var entry_as_features, entries_as_features = [];
    for(let entry of Object.values(this.allEntries)) {
        entry_as_features = entry.getFeatures(options);
        entries_as_features.push(entry_as_features);
    }
    return entries_as_features;
}


/*****************
CATALOG META-CONTROL FUNCTIONS AND CONVENIENCE METHODS FOR ALGORITHM INTERVENTIONS
******************/

// Run a K-means clustering on the catalog.
// This method wraps an instance of KMeans and calls KMeans.cluster
Catalog.prototype.cluster = function(num_clusters=3, measurement, use_features, iterations=10, process_result_func, output=1.0, oscout, callback, post=true) {
    var options, measurement, entries_as_features;
    measurement = measurement || Measures.euclidean;
    if(output==true) {
      output = 1.0;
    } else {
      if(output == false) {
        output = 0.0;
      }
    }

    // features: is passed directly to Entry.getFeatures
    // similarityFunc: used by KMeans algorithm to determine distance between entries
    // iterations: hyperparameter for KMeans algorithm, number of iterations
    options = {features: use_features, similarityFunc: measurement, iterations: iterations,
      callbackFunc: callback, post_steps: post, output_verbosity: output};

    this.kmeans = new KMeans(num_clusters, options);
    entriesAsFeatures = this.entriesAsFeatures(options);
    process_result_func = process_result_func || this.processClusters;

    this.kmeans.cluster(num_clusters, entriesAsFeatures, process_result_func, oscout);
}


// Hard stop clustering algorithm
Catalog.prototype.stop = function() {
  if(this.kmeans.running == true) { this.kmeans.interrupt = true }
}

// Set the tempo of the underlying algorithm in BPM
// internall tempo is stored as seconds per beat
Catalog.prototype.setTempo = function(tempo) {
  tempo = tempo || 60;
  this.kmeans.tempo = 60.0 / tempo;
  return "Using "+tempo+"bpm";
}

// Update callback function
Catalog.prototype.setCallback = function(func) {
  this.kmeans.callback = func;
}

Catalog.prototype.setPost = function(should_post) {
  this.kmeans.post_steps = should_post;
}

Catalog.prototype.setVerbosity = function(verbosity) {
  this.kmeans.output_verbosity = verbosity;
}

// Final callback function for KMEANS algorithm that processes the resulting clusters.
Catalog.prototype.processClusters = function(err, clusters, centroids) {
        // show any errors
        console.log("ERROR:",err);
        // show the clusters found
        console.log("CLUSTERS:",clusters);
        // show the centroids
        console.log("CENTROIDS:",centroids);

        // TODO: REMAP THE DIVS BASED ON CLUSTER AND DISTANCES
}
/***************************
// END EXAMPLE AND CATALOG CLASSES
****************************/




/***************************
// KMEANS
// Class manages an instance of the KMeans algorithm in realtime
****************************/
var KMeans = function(K, options) {
  options = options || {};
  this.K = K || 3;
  this.centroids = [];
  this.clusters = [];
  this.similarityFunc = options["similarityFunc"];
  this.callback = options["callbackFunc"];
  this.featureNames = options["features"] || [];
  this.post_steps = options["post_steps"] || false;
  this.output_verbosity = options["output_verbosity"] || 0;
  this.iterations = options.iterations || 10;
  this.options = options || {};

  // meta state variables
  this.interrupt = false;   // FLAG to interrupt clustering algorithm
  this.running = false;     // FLAG true if algorithm is running
  this.tempo = 1.0;         // tempo in seconds per beat

}


// Run a clustering algorithm on the given entries
// entries must be an array of FeatureVec objects
// donecallback is a function called when the clustering algorithm has finished
// output gives different levels of verbosity 1.0->full output, 0.0->no output
// oscout, if not null, is an object that must respond to the method .sendmsg(address, args)
// callback, general callback function for algorithmic steps, receives the arguments: step, info -- where info is a dict
//    callback can also, optionally, return a duration (in beats) for the given step to wait until continuing.
// post, if true, posts feedback to the console
KMeans.prototype.cluster = async function(clusters=3, entries, donecallback, oscout=null) {
  var osc, cb, beats;
  this.K = clusters;

  if(oscout == null) {
    osc = function(address, args) { };
  } else {
    osc = function(address, args) { oscout.sendmsg(address, args) };
  }
  if(this.callback == null) {
    this.callback = function(step, info) { return 1 };
  }

  if (!entries) {
    throw new Error('an array of entries is required.');
  } else if (!Array.isArray(entries)) {
    throw new Error('entries must be an array.');
  } else if (entries.length < this.K) {
    throw new Error('entries must have at least K data points.');
  }

  var normalizedEntries = this.normalize(entries);
  if(this.output_verbosity > 0.0) {
    osc("/kmeans/normalize", ['entries']);
    beats = this.callback('normalize', {what: 'entries', normalizedEntries: normalizedEntries});
    beats = beats || 1;
    if(this.post_steps)
      console.log("Normalize entries "+i);
    await Util.sleep_beats(beats, this.tempo);
  }

  this.running = true;
  this.interrupt = false;

  // initialize random centroids
  for (let k = 0; k < this.K; k++) {
    let newcentroid, randomIndex = Math.floor(Math.random() * normalizedEntries.length);
    newcentroid = new FeatureVec("centroid"+k, normalizedEntries[randomIndex].features.slice());
    this.centroids.push(newcentroid);
    if(this.output_verbosity > 0.0) { // reporting
      osc("/kmeans/initcentroid", [k, newcentroid.features]); // centroid centroid-features
      beats = this.callback("initcentroid", {centroid: k, features: newcentroid.features});
      beats = beats || 1;
      if(this.post_steps)
        console.log("NEW CENTROID " + k + " with " + newcentroid.features.map(x=>x.toFixed(2)));
      await Util.sleep_beats(beats, this.tempo);
    }
  }

  // rhythm scales for each step {}

  // Begin Clustering Iterations
  for (let j = 0; j < this.iterations; j++) {
    if(this.output_verbosity > 0.0) {
      osc("/kmeans/iteration", [j, "start"]);
      beats = this.callback("section", {iter: j, section: "start"});
      beats = beats || 1;
      if(this.post_steps)
        console.log("----------- Begin ITERATION "+j+" ---------");
      await Util.sleep_beats(beats, this.tempo);
    }

    let clusterIndexes = []; // each entry index gets a cluster index [0,0,0,2,2,0,1... etc]
    for (var i = 0; i < normalizedEntries.length; i++) {
      if(this.interrupt == true) { // CHECK INTERRUPT FLAG BEFORE EACH ENTRY IS EXAMINED
        this.interrupt = false;
        return null;
      }

      let min;
      min = this.similarityFunc(normalizedEntries[i], this.centroids[0]);

      // entry-idx entry-id centroid-idx distance
      if(this.output_verbosity > 0.0) {
        osc("/kmeans/distance", [i, normalizedEntries[i].entry.id, 0, min]);
        beats = this.callback('distance', {idx: i, id: normalizedEntries[i].entry.id, cluster: 0, distance: min});
        beats = beats || 1;
        if(this.post_steps)
          console.log("Measured " + min.toFixed(3) + " from " + normalizedEntries[i].entry.id+" to category "+0);
        await Util.sleep_beats(beats, this.tempo);
      }

      var closestCentroid = 0;
      for (k = 1; k < this.K; k++) { // compare to other centroids
        var tmpDistance;
        tmpDistance = this.similarityFunc(normalizedEntries[i], this.centroids[k]);
        // entry-idx entry-id centroid-idx distance
        if(this.output_verbosity > 0) {
          osc("/kmeans/distance", [i, normalizedEntries[i].entry.id, k, tmpDistance]);
          beats = this.callback('distance', {idx: i, id: normalizedEntries[i].entry.id, cluster: k, distance: tmpDistance});
          beats = beats || 1;
          if(this.post_steps)
            console.log("Measured " + tmpDistance.toFixed(3) + " from " + normalizedEntries[i].entry.id + " to category "+k);
          await Util.sleep_beats(beats, this.tempo);
        }
        if (tmpDistance < min) {
          min = tmpDistance;
          closestCentroid = k;

          // entry-idx entry-id centroid-idx distance
          if(this.output_verbosity > 0.0) {
            osc("/kmeans/updateClosestCentroid", [i, normalizedEntries[i].entry.id, k, tmpDistance]);
            beats = this.callback('reconsider', {idx: i, id: normalizedEntries[i].entry.id, cluster: k, distance: tmpDistance});
            beats = beats || 1;
            if(this.post_steps)
              console.log("Reconsidering " + normalizedEntries[i].entry.id + " for category "+ k);
            await Util.sleep_beats(beats, this.tempo);
          }
        }
      }
      clusterIndexes.push(closestCentroid); // for each entry, push index of closest centroid

      // entry-idx entry-id centroid/cluster-idx distance
      if(this.output_verbosity > 0) {
        osc("/kmeans/assignCluster", [i, normalizedEntries[i].entry.id, closestCentroid, tmpDistance]);
        beats = this.callback('decide', {idx: i, id: normalizedEntries[i].entry.id, cluster: closestCentroid, distance: tmpDistance});
        beats = beats || 1;
        if(this.post_steps)
          console.log("Deciding that " + normalizedEntries[i].entry.id + " is category "+closestCentroid);
        await Util.sleep_beats(beats, this.tempo);
      }
    }

    if(this.output_verbosity > 0) {
      osc("/kmeans/iteration", [j, "recalculate-centroids"]);
      beats = this.callback('section', {iter: j, section: "recalculate-centroids"});
      beats = beats || 1;
      if(this.post_steps)
        console.log("Recalculating cluster centers for iteration "+j);
      await Util.sleep_beats(beats, this.tempo);
    }

    // Gather up entries by cluster & make better centroids
    this.clusters = [];
    var newCentroids = [];
    for (var k = 0; k < this.centroids.length; k++) { // for each centroid/cluster

      // Collect up all entries in that cluster
      var cluster = [];
      clusterIndexes.forEach(function(clusterIndex, index) {
        if (clusterIndex == k) {
          cluster.push(normalizedEntries[index]);
        }
      });
      this.clusters.push(cluster);

      // If there are entries in the cluster, recalculate the centroid to be more central
      var updatedCentroid;
      if (cluster.length > 0) {
        // Add a new centroid for each new cluster, with its center at the mean of all entries in the cluster
        updatedCentroid = new FeatureVec("centroid"+k, this.mean(cluster));

        if(this.output_verbosity > 0) {
          osc("/kmeans/recalculateCentroid", ["new", k, updatedCentroid.features]);
          beats = this.callback('recalculateCentroid', {action: "new", cluster: k, features: updatedCentroid.features});
          beats = beats || 1;
          if(this.post_steps)
            console.log("Recalculating the center of category "+k+" to vector "+updatedCentroid.features.map(x=>x.toFixed(2)));
          await Util.sleep_beats(beats, this.tempo);
        }
      } else { // clusters with no entries keep their old centroid
        updatedCentroid = this.centroids[k];
        if(this.output_verbosity > 0) {
          osc("/kmeans/recalculateCentroid", ["keep", k, updatedCentroid.features]);
          beats = this.callback('recalculateCentroid', {action:"keep", cluster: k, features: updatedCentroid.features});
          beats = beats || 1;
          if(this.post_steps)
            console.log("The vector center of category "+k+" remains unchanged");
          await Util.sleep_beats(beats, this.tempo);
        }
      }
      newCentroids.push(updatedCentroid);
    }
    this.centroids = newCentroids;
    if(this.output_verbosity > 0.0) {
      osc("/kmeans/iteration", [j, 'end']);
      beats = this.callback('section', {iter: j, section:'end'});
      beats = beats || 1;
      if(this.post_steps)
        console.log("--- END of iteration "+j);
      await Util.sleep_beats(beats, this.tempo);
    }

  }

  // NOTE: ADD A NORMALIZE / DENORMALIZE SONIFICATION...
  // denormalize centroids and entries
  this.centroids = this.denormalize(this.centroids);
  if(this.output_verbosity > 0.0) {
    osc("/kmeans/denormalize", ['centroids']);
    beats = this.callback('denormalize', {what:'centroids'});
    beats = beats || 1;
    if(this.post_steps) {
      console.log("--- denormalize centroids");
    };
    await Util.sleep_beats(beats, this.tempo);
  }

  for(let i = 0; i < this.clusters.size; i++) {
    let cluster = this.clusters[i];
    this.clusters[i] = this.denormalize(cluster);
    if(this.output_verbosity > 0.0) {
      osc("/kmeans/denormalize", ['cluster', i]);
      beats = this.callback('denormalize', {what:'entries-cluster', cluster: i});
      beats = beats || 1;
      if(this.post_steps)
        console.log("--- denormalize cluster "+i);
      await Util.sleep_beats(beats, this.tempo);
    }
  }

  this.running = false;
  return donecallback(null, this.clusters, this.centroids, this.featureNames);
};



/*-----------------
Math helper functions
------------------*/

// Returns an array of mean values for each feature of the entry set
// E.G. if each entry has four features, mean will return the average across
//  all samples of each feature [0.2, 0.34, 0.54, 0.4]
// entries is an array of FeatureVecs
KMeans.prototype.mean = function(entries) {
  if (!Array.isArray(entries)) {
    throw new Error('mean requires an array of entries as an argument.');
  }
  if (entries.length == 0) {
    return [];
  }
  var sum;
  sum = new Array(entries[0].features.length);
  for(let k = 0; k < sum.length; k++) {
    sum[k] = 0.0;
  }
  for (let i = 0; i < entries.length; i++) { // for each entry
    for (let k = 0; k < sum.length; k++) { // for each feature
      sum[k] = sum[k] + parseFloat(entries[i].features[k]);
    }
  }
  for(let k = 0; k < sum.length; k++) {
      sum[k] = sum[k] / entries.length;
  }
  return sum;
};

// Returns an array of standard deviation values for each feature of the entry set
// E.G. if each entry has four features, this will return the std_dev across
//  all samples of each feature [0.2, 0.34, 0.54, 0.4]
// entries is an array of FeatureVecs
KMeans.prototype.standard_deviation = function(entries, means) {
  if (!Array.isArray(entries)) {
    throw new Error('standard_deviation requires an array of entries as an argument.');
  }
  if (entries.length == 0) {
    return [];
  }
  var sum;
  sum = new Array(entries[0].features.length);
  for(let k = 0; k < sum.length; k++) {
    sum[k] = 0.0;
  }
  for (let i = 0; i < entries.length; i++) { // for each entry
    for (let k = 0; k < sum.length; k++) { // for each feature
      sum[k] = (parseFloat(entries[i].features[k]) - means[k]) ** 2;
    }
  }
  for(let k = 0; k < sum.length; k++) {
      sum[k] = Math.sqrt(sum[k] * (1 / (entries.length - 1)));
  }
  return sum;
}

// entries is an array of FeatureVecs
// normalizes a feature vector using the formula: (feature - mean) / mean
KMeans.prototype.normalize = function(entries) {
  var mean = this.mean(entries);
  var std_dev = this.standard_deviation(entries, mean);
  this.originalMean = mean;
  var normalizedEntries = [];
  entries.forEach(function(entry, j) {
    var normalizedEntry, normalizedFeatures, features;
    features = entry.features;
    normalizedFeatures = new Array(features.length);
    for (var i = 0; i < features.length; i++) {
        normalizedFeatures[i] = (features[i] - mean[i]) / std_dev[i];
        // Perhaps 'normalizing' is better than 'standardizing'
        //normalizedFeatures[i] = (features[i] - mean[i]) / std_dev[i]; // old version - returns a NaN when mean is 0 :-/

    }
    normalizedEntry = new FeatureVec(entry.entry, normalizedFeatures);
    normalizedEntries.push(normalizedEntry);
  });
  return normalizedEntries;
};

KMeans.prototype.denormalize = function(normalizedEntries) {
  var originalMean = this.originalMean;
  var denormalizedEntries = [];
  normalizedEntries.forEach(function(entry, j) {
    var normalizedFeatures, denormalizedFeatures, denormalizedEntry;
    normalizedFeatures = entry.features;
    denormalizedFeatures = new Array(normalizedFeatures.length);
    for (var i = 0; i < denormalizedFeatures.length; i++) {
      denormalizedFeatures[i] = (normalizedFeatures[i] * originalMean[i]) + originalMean[i];
    }
    denormalizedEntry = new FeatureVec(entry.entry, denormalizedFeatures);
    denormalizedEntries.push(denormalizedEntry);
  });
  return denormalizedEntries;
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
  if (this.trained) {
    if (!Array.isArray(input)) {
      input = [input];
    }

    if (this.normalized) {
      input = input.map(function(val, index) { return (val - this.means[index]) / this.ranges[index]; });
    }

    var xInput = $V([1]).augment(input);
    var output = this.theta.transpose().x(xInput);
    return output.e(1,1);
  } else {
    throw new Error('cannot predict before training');
  }
};

ai.LinearRegression = LinearRegression;
/***************************
// END LINEAR REGRESSION CLASS
****************************/
