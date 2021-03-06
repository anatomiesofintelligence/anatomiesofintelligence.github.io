/******************************
AN
   _____                 __
  /  _  \   ____ _____ _/  |_  ____   _____ ___.__.
 /  /_\  \ /    \\__  \\   __\/  _ \ /     <   |  |
/    |    \   |  \/ __ \|  | (  <_> )  Y Y  \___  |
\____|__  /___|  (____  /__|  \____/|__|_|  / ____|
        \/     \/     \/                  \/\/
OF A K MEANS CLUSTERING
MAY 24, 2020
NL_CL#2 FLESH


*******************************/

Scenes.init;
Scenes.gui;

"../_main.scd".resolveRelative
// TODO: Report error to SC group, runInTerminal doesn't work on Linux Ubuntu?
"ls %".format("../../SimpleOSC".resolveRelative).unixCmd({|a,b,c| [a,b,c].postln })
// run SO_Server (SimpleOSC Server)
~servercmd = "python %".format("../../SimpleOSC/SO_Server.py".resolveRelative);
~servercmd.runInTerminal;
"gnome-terminal -- bash -c \"%; exec bash\"".format(~servercmd.shellQuote).unixCmd;
"gnome-terminal -x \"bash\" -c \"python\"".unixCmd;

~servercmd.unixCmd({|a,b| [a,b].post}, true);
"open http://anatomiesofintelligence.github.io/theatre/kmeans".runInTerminal;
"open %".format("..".resolveRelative).runInTerminal

(
Project.startup(s, slimLocal: 200, slimGlobal: 20, rootPath: "..".resolveRelative, onBoot: {
  "ANATOMIES OF INTELLIGENCE: AARHUS 13.12.2019".postln;
  ~scope = s.scope(2,0);
  ~scope.view.bounds_(Rect(400, 800, 1200, 1200));
  ~scope.view.front;
  ~scope.size = 1200;
  ~scope.xZoom = 10.0;
  ~scope.yZoom = 10.0;
  ~scope.style = 2; // or 0, or 1
  ~slib = [
  "viscera_crunch01", "viscera_crunch02", "viscera_crunch03",
  "viscera_fluid01","viscera_fruit01", "viscera_fruit02",
  "viscera_hits01","viscera_various01",
];
   // Livesample, Bufs
  if(~buf.notNil) { ~buf.free };
  ~buf = Buffer.alloc(s, s.sampleRate * 10, 1);
  Macros.prefixStr = "!!!!!!!"

});
);
OSCFunc.trace(true);
OSCFunc.trace(false);

/*-------------
     ,;;`;,
    (_______)
      \===/
      /===\
     /=aat=\
---------------*/
s.scope;

(// busses
if(~mixgroup.isNil) { ~mixgroup = Group.new(s, \addToTail) };
if(~synthgroup.isNil) { ~synthgroup = Group.new(s, \addToHead) };
if(~clean.isNil) { ~clean = Bus.audio(s, 2) };
if(~low.isNil) { ~low = Bus.audio(s, 2) };
if(~verb.isNil) { ~verb = Bus.audio(s, 2) };
Ndef(\mix, {|vmix=0.5|
	var inclean, inlow, inverb, s1, s2, s3, mix;
	var temp;
	inclean = In.ar(~clean, 2);
	inlow = In.ar(~low, 2);
	inverb = In.ar(~verb, 2);
	s1 = inclean;
	s2 = inverb;
	s3 = inlow;
	s2 = JPverb.ar(s2, 5.0, 0.1, 2.0, 0.4, 0.5, 2.0, 1.0, 1.0, 0.1).madd(vmix) + s2.madd(1-vmix);
	temp = Amplitude.ar(s3, 0.001, 0.001);
	s3 = (s3*100).tanh * temp;
	s3 = BLowPass4.ar(s3, 3400, 0.1);
	s3 = JPverb.ar(s3, 5.0, 0.1, 2.0, 0.4, 0.5, 2.0, 0.3, 0.3, 0.5);
	mix = s1 + s2 + s3;
	mix = LeakDC.ar(Limiter.ar(mix, 1.0, 0.001));
	mix;
}).play(out: 0, numChannels: 2, group: ~mixgroup, addAction: \addToTail);
);

Ndef.clear;

(
Ndef(\sawsweep, {
  var sig;
  sig = Saw.ar(\a4.f * Scale.major.ratios).sum * Pulse.ar(10) * Line.ar(0.0, 1.0);
  sig = Pan2.ar(sig, SinOsc.ar(0.5)) * 0.03 * SinOsc.ar(0.01).range(0.0, 1.0);
	sig;
}).play(out: ~clean, numChannels: 2, group: ~synthgroup);
);
Ndef(\sawsweep).clear(10);
Ndef.clear;



Smpl.buf(~slib[1]);
Ndef(\g1).clear(1);
(
~sbuf = Smpl.buf(~slib[2]);
~sbuf = Smpl.buf(~slib[1]);
~sbuf.duration;

Ndef(\g2, {|amp=0.5,pre=0.9,co=18000,rq=1|
  var g_dens = \dens.kr(20, 0.5);
  var g_prate = \prate.kr(1.0, 0.0);
  var g_dur = \gdur.kr(0.1, 1);
  var g_pan = \gpan.kr(0.0, 1.0);
  var g_amp = \gamp.kr(0.2, 1.0);
  var buf = ~sbuf;
  var t_gtrig = (Dust.ar(g_dens) > 0);
  var bufpos, sig;
  bufpos = \pos.kr(0.0, \poslag.kr(1.0, 1.0)) * BufDur.kr(buf);
  sig = TGrains.ar(2, t_gtrig, buf, g_prate, bufpos, g_dur, g_pan, g_amp);
  sig = (sig * pre).tanh;
  sig = BLowPass4.ar(sig, co, rq);
  //sig = sig * Line.ar(0.0, 1.0, 10);
  sig = Limiter.ar(sig * amp);
  sig;
}).play(out: ~verb, numChannels: 2, group: ~synthgroup);
);

Ndef(\g2).clear(1);
Ndef(\sawsweep).clear(10);
Ndef(\mix).set(\vmix, 0.2);
Ndef(\g2).set(\pos, 0.2, \amp, 1.0, \gamp, 1.0);
Ndef(\g2).set(\pos, 4.2, \amp, 1.0, \gamp, 0.7, \co, 12000, \gpan, -1.0);
Ndef(\g2).set(\pos, 0.5, \amp, 1.0, \gamp, 0.3, \co, 12000, \gpan, 1.0);
Ndef(\g2).set(\gdur, 0.1, \pos, rrand(0.0, ~sbuf.duration), \amp, 1.0, \gamp, 0.4, \co, 12000, \gpan, 0.0, \poslag, 5);
Ndef(\g2).set(\pos, Ndef(\pos1, { LFNoise1.kr(0.2).range(0.0, 4.0) }), \amp, 0.4, \gamp, 0.5, \gdur, Ndef(\gdur, { LFNoise1.kr(5).range(0.01, 0.2) }), \dens, 100, \out, Project.outverb);
Ndef(\g2).set(\gpan, { LFNoise2.ar(0.1).range(-1,1) }.ndef(\gpan) ,\rq, 0.2, \co, Ndef(\co, { LFNoise2.ar(10).range(80, 10000) }));
Ndef(\g2).set(\dens, 0.4, \amp, 0.2, \gdur, 2.0, \prate, Ndef(\playpitch, { Saw.ar(0.1).range(-0.5, -0.2) }), \gpan, 0.0);
Ndef(\g2).set(\dens, 2, \amp, 0.5, \gdur, 0.3, \prate, -0.3, \gpan, 0.0);
Ndef(\g2).set(\pos, \amp, 0.2, Ndef(\pos, { SinOsc.ar(SinOsc.ar(0.4).range(0.05, 1.0)).range(0.0,4.0) } ), \prate, Ndef(\prate, { LFNoise0.ar(12).range(-0.4, 0.2) }) );
Ndef(\g2).set(\gdur, 0.08, \amp, 0.6, \dens, 100, \gpan, Ndef(\gpan, { LFNoise1.ar(10).range(-1,1) }), \prate, -0.5);
Ndef(\g2).set(\pre, 3.0, \co, 12700, \rq, 2, \pos, 0.2, \dens, 20, \dur, 0.2, \gamp, 1.0);
Ndef(\g2).clear(10);

Ndef(\g2).clear;
Syn.gui;
Ndef.clear(10);

/* --------------------------------------------------
OSC Responders
,am8888ca8"""""'' ``""""8ac88888ma,
"""""]8a.    .a8["""""
      "8ba.        .ad8"'
        `"8bma,."'
------------------------------- */
(
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\browser, {|msg|
  var freq = msg[1], mod = msg[2], dur = msg[3];
  msg.postln;
  {
    PMOsc.ar(freq, mod, 1.0, 8) * Env.perc(0.01, dur).ar(2);
  }.play(outbus: ~clean, target: ~synthgroup, addAction: \addToHead);

}, "/browser");

// initial random initialization of centroids
// addr cluster-idx feature-vec
OSCdef(\initcentroid, {|msg|
  //msg.postln;
  msg[2] = msg[2].asString.split($,);
  "\n>>> INITIALIZE CENTROID % <<< to VECTOR %".format(msg[1], msg[2]).postln;
  (instrument: \thud, freq: \d3.f, amp: 0.8, dur: 0.5, dt: 0.4, atk: 0.01, rel: 0.5, decay: 0.1, out: ~verb).play;

}, "/kmeans/initcentroid");

// stepwise updates for each iteration
// addr iter# step
// steps: start, cluster-assignment, recalculate-centroids, end
OSCdef(\iter, {|msg|
  //msg.postln;
  if(msg[2] == 'start') {
    "BEGIN ITERATION %".format(msg[1]).postln;
  } {
    "\nstage % (iter %)".format(msg[2].asString.toUpper, msg[1]).postln;
  };
  (instrument: \thud, freq: \d4.f, amp: 0.8, dur: 0.1, atk: 0.01, rel: 0.05, decay: 0.1, out: ~low).play;
}, "/kmeans/iteration");


// distance calculation between entry and centroid
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nThe measure of entry % to centroid C% is %\n Δ • Δ           (%: %)".format(eidx, cidx, dist.round(0.001), eidx, eid).postln;
  // If distance is very small, or 0, modhz will be 0 and this instrument will be silent.
  (instrument: \saw2, freq: \g5.f * dist.asFloat, modhz: 100 * dist, amp: 0.6, atk: 0.001, rel: 0.1, dur: 0.01, pan: 0.0, out: ~verb).play;
}, "/kmeans/distance");


// RECONSIDER
OSCdef(\updateclosest, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nReconsider ENTRY % >> distance is % to category %\n⋱ ⋱ ⋱         (%: %)".format(eidx, dist, cidx, eidx, eid).postln;
	(instrument: \pm2, freq: dist * 4, pmidx: (eid+1) / 10.1, rq: 0.1, amp: 0.5, dur: 0.01, pan: 0.0, co1: 2600, co2: 60, out: ~low).play;
}, "/kmeans/updateClosestCentroid");


// DECIDE
// final cluster assignment for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nENTRY % will be placed in CATEGORY % \n⊙ ⊙ ⊙ ⊙ ⊙              (%: %)".format(eidx, cidx, eidx, eid).postln;
  (instrument: \rezpad, amp: 0.8, freq: [\fs4, \fs2, \a4].f.wrapAt(cidx), dur: [0.01, 0.03, 0.01, 0.03].wrapAt(eidx), phase: [1.5, 0.2, 0.1, 10.2].wrapAt(cidx), modhz: 12.1, out: ~verb).play;
}, "/kmeans/assignCluster");



// recalculated centroids for new cluster assignments
// addr status(new/keep) cluster-idx centroid-features
OSCdef(\recalccentroid, {|msg|
  //msg.postln;
  msg[3] = msg[3].asString.split($,);
  if(msg[1] == 'new') {
    "Recalculating ⊙ CENTER ⊙ of cluster ⊙ % ⊙ as vector %".format(msg[2], msg[3]).postln;
  } {
    "The ⊙ CENTER ⊙ of cluster % remains unchanged".format(msg[2]).postln;
  };
  (instrument: \thud, freq: \d3.f, amp: 0.8, dur: 0.3, out: ~clean).play;
}, "/kmeans/recalculateCentroid");

);



( // General Processing
Ndef(\fx, {
  var voice, cello, mix;
  voice = SoundIn.ar(0) * 1.0;
  cello = SoundIn.ar(2) * 1.0;
  mix = GVerb.ar(voice + cello, 30, 3, 0.2, 0.3, 30, 0.5, 0.2, 0.8);
  Limiter.ar(mix, 1.0, 0.001) * 0.1;
}).play(out: 0, numChannels: 2);
);

Ndef(\fx).clear(1);

(
Ndef(\eh, {
  var sig;
  //sig = Pulse.ar(Scale.major.ratios * \fs6.f, mul: 1.0) * Line.ar(0,1,0.5) * SinOsc.ar(4) * Saw.ar(8);
  sig = SinOsc.ar(Scale.major.ratios * \fs3.f, mul: 1.0) * Line.ar(0,1,0.5) * SinOsc.ar(4) * Saw.ar(8);
  sig = Splay.ar(sig);
  sig = sig * SinOsc.ar(0.05).range(0.0, 1.0);
  sig = sig + [CombL.ar(sig, 0.5, 0.25, 0.5), CombL.ar(sig, 0.5, 0.3, 0.5)];
  sig * 0.3;
}).play(out: Project.outverb, numChannels: 2);
);
Ndef(\eh).clear(1);

(
Ndef(\rec, {
  var voice, mix;
  voice = SoundIn.ar(1) * 1.0;
  RecordBuf.ar(voice, ~buf, 0, 1, 0, 1, 1);
}).play(out: 30);
);

Ndef(\fx).clear(3);
Ndef(\rec).clear(3);
Ndef(\grain).clear(1);
Ndef.clear(4);

~buf.plot;

(
Ndef(\grain, {|amp=0.0, gplaypitch=1.0, grate=10, gdur=0.1, gamp=1.0, gpos=0.0, pitchlag=3.0, poslag=5.0, ratelag=3.0|
  var mix;
  var t_grain;
  var gpan;
  gpos = Lag.kr(gpos, poslag);
  gplaypitch = Lag.kr(gplaypitch, pitchlag);
  grate = Lag.kr(grate, ratelag);
  t_grain = Impulse.ar(grate);
  gpan = TRand.kr(-1.0, 1.0, t_grain);

  mix = TGrains.ar(2, t_grain, ~buf, gplaypitch, gpos, gdur, gpan, gamp);
  mix = Limiter.ar(mix * amp);
  Out.ar(0, FreeVerb.ar(mix, 0.9, 0.8, 0.5));
  mix;
}).play(out: 0, numChannels: 2);
);



Ndef(\rec).clear(0);
Ndef(\rec).clear(10);
Ndef(\grain).clear(10);
Ndef(\rec).play(out: 30, numChannels: 2);
(
~gpos = rrand(0.0, 10.0);
~gpitch = \c0.notemidi.midiratio;
//~gpitch = 2.0;
Ndef(\grain).set(\gpos, ~gpos, \gamp, 1.0, \gplaypitch, 1.0, \grate, 16, \gdur, 0.2, \amp, 0.5, \gpan, Ndef(\ppan, { SinOsc.ar(0.5) }));
);

~scope.style = 1;
~scope.zoom = 20;



