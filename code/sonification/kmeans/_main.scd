/******************************

KMEANS CLUSTERING

(C) 2019 ANATOMIES OF INTELLIGENCE

*******************************/

// start the browser interface
"osc_websock_interface.py".runInTerminal;


(
// TODO:: Implement all of these options in the startup gui
Project.startup(s, true, true,
  1000, 1000,
  scOnly:true, onBoot: {
  "K-MEANS CLUSTERING".postln;
});
);

// Run SO_Server
"python %".format("SO_Server.py".resolveRelative).runInTerminal;

Project.initAudioRouting;

(
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\browser, {|msg|
  var freq = msg[1], mod = msg[2], dur = msg[3];
  {
    PMOsc.ar(freq, mod, 1.0, 8) * Env.perc(0.01, dur).ar(2);
  }.play;

}, "/browser");

// initial random initialization of centroids
// addr cluster-idx feature-vec
OSCdef(\initcentroid, {|msg|
  //msg.postln;
  msg[2] = msg[2].asString.split($,);
  "INITIALIZE CENTROID %: %".format(msg[1], msg[2]).postln;
  (instrument: \thud, freq: \d5.f, amp: 0.6, dur: 0.5, dt: 0.4, out: Project.outverb).play;
}, "/kmeans/initcentroid");

// stepwise updates for each iteration
// addr iter# step
// steps: start, cluster-assignment, recalculate-centroids, end
OSCdef(\iter, {|msg|
  //msg.postln;
  if(msg[2] == 'start') {
    "-------ITERATION % START-------".format(msg[1]).postln;
  } {
    "% ITERATION % ---------".format(msg[2].asString.toUpper, msg[1]).postln;
  };
  (instrument: \thud, freq: \d3.f, amp: 0.6, dur: 0.3, out: Project.outverb).play;
}, "/kmeans/iteration");


// distance calculation between entry and centroid
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  //msg.postln;
  "measure % <-> C%: % (%)".format(msg[1], msg[3], msg[4].round(0.001), msg[2]).postln;
  (instrument: \fm01, freq: \c4.f * msg[4].asFloat, modhz: 1000, amp: 0.2, dur: 0.1, out: Project.outverb).play;
}, "/kmeans/distance");

// change in best fit cluster for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\updateclosest, {|msg|
  //msg.postln;
  var dist = msg[4];
  "___reconsider % > C% (%)".format(msg[1], msg[3], msg[2]).postln;
  (instrument: \pm, freq: [\fs5.f, \a4.f, \d3.f, \e3.f].wrapAt(msg[3]), idx: 2, phase: msg[4], spread: 1, amp: 0.8, dur: 0.5, out: Project.outclean).play;
}, "/kmeans/updateClosestCentroid");

// final cluster assignment for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  //msg.postln;
  "*CATEGORIZE % as C% (%)".format(msg[1], msg[3], msg[2]).postln;
  (instrument: \rezpad, freq: [\d3.f, \fs4.f, \cb5.f, \a4.f].wrapAt(msg[3]), amp: 0.5, dur: 2.0, phase: 10.5, modhz: 0.01, out: Project.outverb).play;
}, "/kmeans/assignCluster");

// recalculated centroids for new cluster assignments
// addr status(new/keep) cluster-idx centroid-features
OSCdef(\recalccentroid, {|msg|
  //msg.postln;
  msg[3] = msg[3].asString.split($,);
  if(msg[1] == 'new') {
    "NEW CENTROID %: %".format(msg[2], msg[3]).postln;
  } {
    "CENTROID % UNCHANGED".format(msg[2]).postln;
  };
  (instrument: \thud, freq: \d3.f, amp: 0.6, dur: 0.3, out: Project.outbass).play;
}, "/kmeans/recalculateCentroid");

);

NetAddr.localAddr;


Syn.gui



