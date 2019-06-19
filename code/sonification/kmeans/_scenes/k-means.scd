/******************************

KMEANS CLUSTERING ~ SONIFICATION

(C) 2019 ANATOMIES OF INTELLIGENCE

*******************************/

// X>> generalize OSC interface as a js library
// X>> generalize python server/interface to be called from SC
// X>> send sequence data

// Run SO_Server
"python %".format("SO_Server.py".resolveRelative).runInTerminal;



(
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\browser, {|msg|
  var freq = msg[1], mod = msg[2], dur = msg[3];
  {
    PMOsc.ar(freq, mod, 1.0, 8) * Env.perc(0.01, dur).ar(2);
  }.play;

}, "/browser");

// initial random initialization of centroids
// cluster-idx feature-vec
OSCdef(\initcentroid, {|msg|
  msg.postln;
}, "/kmeans/initcentroid");

// stepwise updates for each iteration
// iter# step
// steps: start, cluster-assignment, recalculate-centroids, end
OSCdef(\iter, {|msg|
  msg.postln;
}, "/kmeans/iteration");

// distance calculation between entry and centroid
// entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  msg.postln;
}, "/kmeans/distance");

// change in best fit cluster for entry
// entry-idx entry-id cluster-idx normalized-distance
OSCdef(\updateclosest, {|msg|
  msg.postln;
}, "/kmeans/updateClosestCentroid");

// final cluster assignment for entry
// entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  msg.postln;
}, "/kmeans/assignCluster");

// recalculated centroids for new cluster assignments
// status(new/keep) cluster-idx centroid-features
OSCdef(\recalccentroid, {|msg|
  msg.postln;
}, "/kmeans/recalculateCentroid");

);

NetAddr.localAddr;


