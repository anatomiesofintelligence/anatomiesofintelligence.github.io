/******************************

KMEANS CLUSTERING

(C) 2019 ANATOMIES OF INTELLIGENCE

*******************************/

// start the browser interface
"osc_websock_interface.py".runInTerminal;

s.scope(2,2)

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
Project.meter(s);

NetAddr.localAddr;

OSCdef.trace(false);

(
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\browser, {|msg|
  var freq = msg[1], mod = msg[2], dur = msg[3];
  msg.postln;
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
  (instrument: \thud, freq: \d5.f, amp: 0.6, dur: 0.5, dt: 0.4, atk: 0.01, rel: 0.5, decay: 0.1, out: Project.outverb).play;
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
  (instrument: \thud, freq: \d3.f, amp: 0.6, dur: 0.3, atk: 0.01, rel: 0.5, decay: 0.1, out: Project.outverb).play;
}, "/kmeans/iteration");


// distance calculation between entry and centroid
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "measure % <-> C%: % (%)".format(eidx, cidx, dist.round(0.001), eid).postln;
  (instrument: \fm01, freq: \c2.f * dist.asFloat, modhz: 100 * dist, amp: 1.0, atk: 0.001, rel: 0.001, dur: 0.01, pan: 0.0, out: Project.outverb).play;
}, "/kmeans/distance");


/*** change in best fit cluster for entry
/addr entry-idx entry-id cluster-idx normalized-distance */
OSCdef(\updateclosest, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "___reconsider % > C% (% %)".format(eidx, cidx, eid, dist).postln;
  (instrument: \pm, freq: cidx * 200, idx: 2, phase: msg[4], spread: 1, amp: 0.9, dur: 0.01 * dist, pan: 0.1, ratio: 2.5, co1: 9000, co2: 50, rq:0.2, out: Project.outclean).play;
}, "/kmeans/updateClosestCentroid");

// final cluster assignment for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "*CATEGORIZE % as C% (%)".format(eidx, cidx, eid).postln;
  (instrument: \rezpad, freq: [\fs2.f, \fs3.f, \a3.f].wrapAt(cidx), amp: 0.9, dur: 2.1, phase: 10.5, modhz: 2.1, out: Project.outverb).play;
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

(
~slib = [
  "viscera_crunch01", "viscera_crunch02", "viscera_crunch03",
  "viscera_fluid01","viscera_fruit01", "viscera_fruit02",
  "viscera_hits01","viscera_various01",
];
);

Smpl.gui;

(
Ndef(\g1, {|amp=0.5,pre=0.9,co=18000,rq=1|
  var g_dens = \dens.kr(20, 0.5);
  var g_prate = \prate.kr(1.0, 0.0);
  var g_dur = \gdur.kr(0.1, 1);
  var g_pan = \gpan.kr(0.0, 1.0);
  var g_amp = \gamp.kr(0.2, 1.0);
  var buf = Smpl.buf(~slib[1]);
  var t_gtrig = (Dust.ar(g_dens) > 0);
  var bufpos, sig;
  bufpos = \pos.kr(0.0, \poslag.kr(1.0, 0.0)) * BufDur.kr(buf); // in s
  sig = TGrains.ar(2, t_gtrig, buf, g_prate, bufpos, g_dur, g_pan, g_amp);
  //g_prate.poll(2);
  sig = (sig * pre).tanh;
  sig = BLowPass4.ar(sig, co, rq);
  Limiter.ar(sig * amp);
}).play(out: Project.outverb, numChannels: 2);
);


Ndef(\g1).set(\pos, 0.2, \amp, 1.0, \gamp, 0.7);
Ndef(\g1).set(\pos, 0.2, \amp, 1.0, \gamp, 0.7, \co, 12000);

Ndef(\g1).set(\pos, Ndef(\pos1, { LFNoise1.kr(0.2).range(0.1, 0.5) }), \amp, 0.2, \gamp, 1.0, \gdur, Ndef(\gdur, { LFNoise1.kr(5).range(0.01, 0.2) }), \dens, 100, \out, Project.outverb);

Ndef(\g1).set(\co, Ndef(\co, { SinOsc.ar(LFNoise1.ar(10).range(0.05,0.3)).range(80, 10000) }));
Ndef(\g1).set(\dens, 10, \amp, 0.5, \gdur, 0.1);

Ndef(\g1).set(\pos, Ndef(\pos, { SinOsc.ar(SinOsc.ar(0.4).range(0.05, 1.0)).range(0.0,4.0) } ), \prate, Ndef(\prate, { LFNoise0.ar(12).range(-0.4, 0.2) }) );

Ndef(\g1).set(\gdur, 0.08, \dens, 100, \gpan, Ndef(\pan, { LFNoise1.ar(10).range(-1,1) }));

Ndef(\g1).set(\pre, 3.0, \co, 12700, \rq, 2, \pos, 0.2, \dens, 20, \dur, 0.2, \gamp, 1.0);

Ndef(\g1).clear(10);


// Additive Synthesis



