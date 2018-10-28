/*globals exports */
// DISTANCE LIB

shaman = new Object();

shaman.euclidean = function(a, b) {
  var sum = 0;
  var n;
  for (n=0; n < a.length; n++) {
    sum += Math.pow(a[n]-b[n], 2);
  }
  return Math.sqrt(sum);
};


/*globals require, exports */
// KMEANS LIB

var distance = shaman.euclidean;

var KMeans = function(K, options) {
  options = options || {};
  this.K = K || 3;
  this.centroids = [];
  this.clusters = [];
  this.iterations = options.iterations || 1000;

  this.options = options || {};
}

KMeans.prototype.cluster = function(data, callback) {
  var self = this;

  if (!data) {
    return callback(new Error('data is required.'));
  } else if (!Array.isArray(data)) {
    return callback(new Error('data must be an array.'));
  } else if (data.length < self.K) {
    return callback(new Error('data must have at least K data points.'));
  }

  var normalizedData = self.normalize(data);

  // initialize random centroids
  for (var k = 0; k < self.K; k++) {
    var randomIndex = Math.floor(Math.random() * normalizedData.length);
    self.centroids.push(normalizedData[randomIndex]);
  }

  for (var j = 0; j < self.iterations; j++) {

    // cluster assignment step
    var clusterIndexes = [];
    for (var i = 0; i < normalizedData.length; i++) {
      var min = distance(normalizedData[i], self.centroids[0]);
      var closestCentroid = 0;
      for (k = 0; k < self.K; k++) {
        var tmpDistance = distance(normalizedData[i], self.centroids[k]);
        if (tmpDistance < min) {
          min = tmpDistance;
          closestCentroid = k;
        }
      }
      clusterIndexes.push(closestCentroid);
    }

    // move centroids
    var newCentroids = [];
    self.clusters = [];
    for (var k = 0; k < self.centroids.length; k++) {
      var points = [];
      clusterIndexes.forEach(function(clusterIndex, index) {
        if (clusterIndex == k) {
          points.push(normalizedData[index]);
        }
      });
      self.clusters.push(points);
      if (points.length > 0) {
        newCentroids.push( self.mean(points) );
      } else {
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

KMeans.prototype.mean = function(points) {
  if (!Array.isArray(points)) {
    throw new Error('mean requires an array of data points as an argument.');
  }
  if (points.length === 0) {
    return [];
  }
  var sum = new Array(points[0].length);
  for (var i = 0; i < points.length; i++) {
    for (var k = 0; k < sum.length; k++) {
      sum[k] = (sum[k] || 0) + parseFloat(points[i][k], 10);

      if (i === points.length - 1) {
        sum[k] = sum[k] / points.length;
      }

    }
  }
  return sum;
};

KMeans.prototype.normalize = function(points) {
  var mean = this.mean(points);
  this.originalMean = mean;
  var newPoints = [];
  points.forEach(function(point, j) {
    var newPoint = new Array(point.length);
    for (var i = 0; i < point.length; i++) {
      newPoint[i] = (point[i] - mean[i]) / mean[i];
    }
    newPoints.push(newPoint);
  });
  return newPoints;
};

KMeans.prototype.denormalize = function(points) {
  var originalMean = this.originalMean;
  var newPoints = [];
  points.forEach(function(point, j) {
    var newPoint = new Array(point.length);
    for (var i = 0; i < point.length; i++) {
      newPoint[i] = (point[i] * originalMean[i]) + originalMean[i];
    }
    newPoints.push(newPoint);
  });
  return newPoints;
};

shaman.KMeans = KMeans;


/*globals require, exports */

// LINEAR REGRESSION LIB
// REQUIRES Matrix and Vector classes from sylvester module

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

shaman.LinearRegression = LinearRegression;
