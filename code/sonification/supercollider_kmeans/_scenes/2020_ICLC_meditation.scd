/******************************
NOTE: RUN 2020_TRANSMEDIALE FIRST AS BASIS
THIS FILE INCLUDES CODE MODIFICATION TO SHIFT THE ALGOIRTHMIC PROCESS INTO A MEDITATIVE STATE

*******************************/

(
~slib = [
  "viscera_crunch01", "viscera_crunch02", "viscera_crunch03",
  "viscera_fluid01","viscera_fruit01", "viscera_fruit02",
  "viscera_hits01","viscera_various01",
];

   // Livesample, Bufs
  if(~buf.notNil) { ~buf.free };
  ~buf = Buffer.alloc(s, s.sampleRate * 10, 1);

);


/*-------------
     ,\
    # (_
      _)\##
  ###/((_
       ))\####
     _((
####/  )\
     ,;;`;,
    (_______)
      \===/
      /===\
     /=aat=\
---------------*/
s.scope;

(
Ndef(\sawsweep, {
  var sig;
  sig = Saw.ar(\a4.f * Scale.major.ratios).sum * SinOsc.ar(10) * Line.ar(0.0, 1.0);
  sig = Pan2.ar(sig, SinOsc.ar(0.5)) * 0.01 * SinOsc.ar(0.01).range(0.0, 1.0);
}).play(out: 0, numChannels: 2);
);
Ndef(\sawsweep).clear(10);




Smpl.buf(~slib[1]);
~slib[1];
Ndef(\g1).clear(1);
~slib.size;
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
  //Out.ar(Project.outverb, sig);
  sig;
}).play(out: Project.outverb, numChannels: 2);
);

Ndef(\g2).clear(1);
Ndef(\sawsweep).clear(10);
Project.meter

~scope.style=0;
~scope.style=1;
~scope.style=2;
~scope.xZoom = 1.0;
~scope.yZoom = 10.0;
Ndef(\g2).set(\pos, 0.2, \amp, 1.0, \gamp, 1.0);
Ndef(\g2).set(\pos, 4.2, \amp, 1.0, \gamp, 0.7, \co, 12000, \gpan, -1.0);
Ndef(\g2).set(\pos, 0.5, \amp, 1.0, \gamp, 0.3, \co, 12000, \gpan, 1.0);
Ndef(\g2).set(\gdur, 0.1, \pos, rrand(0.0, ~sbuf.duration), \amp, 1.0, \gamp, 0.4, \co, 12000, \gpan, 0.0, \poslag, 5);
Ndef(\g2).set(\pos, Ndef(\pos1, { LFNoise1.kr(0.2).range(0.0, 4.0) }), \amp, 0.4, \gamp, 0.5, \gdur, Ndef(\gdur, { LFNoise1.kr(5).range(0.01, 0.2) }), \dens, 100, \out, Project.outverb);
Ndef(\g2).set(\rq, 0.3, \co, Ndef(\co, { LFNoise2.ar(10).range(80, 10000) }));
Ndef(\g2).set(\dens, 0.4, \amp, 0.2, \gdur, 2.0, \prate, Ndef(\playpitch, { Saw.ar(0.1).range(-0.5, -0.2) }), \gpan, 0.0);
Ndef(\g2).set(\dens, 2, \amp, 0.5, \gdur, 0.3, \prate, -0.3, \gpan, 0.0);
Ndef(\g2).set(\pos, \amp, 0.2, Ndef(\pos, { SinOsc.ar(SinOsc.ar(0.4).range(0.05, 1.0)).range(0.0,4.0) } ), \prate, Ndef(\prate, { LFNoise0.ar(12).range(-0.4, 0.2) }) );
Ndef(\g2).set(\gdur, 0.08, \amp, 0.6, \dens, 100, \gpan, Ndef(\gpan, { LFNoise1.ar(10).range(-1,1) }), \prate, -0.5);
Ndef(\g2).set(\pre, 3.0, \co, 12700, \rq, 2, \pos, 0.2, \dens, 20, \dur, 0.2, \gamp, 1.0);
Ndef(\g2).clear(10);

Ndef(\g2).clear;

/***********************************************
OSC Responders

                .aadddbbbbaa,       ,adddbbbbaaa.
             .ad"           "\bbmdd/"           "ba.
          .,d"                 `"'                 "b,.
       .,ad"                                         "ba,.
    .,amd"  __..,,,aaaaaadddddddMbbbbbbbaaaaaaa,,,..__  "bma,.
,am8888ca8"""""''                                ``""""8ac88888ma,
"""""]8a.                                               .a8["""""
      "8ba.                                           .ad8"'
        `"8bma,.                                .,amd88"'
            `"""88bmm==Normand===Veilleux==mmd88"""'
                    `""""""""""""""""""""""'


************************************************/
// OSC RESPONDERS
//OSCdef(\status, {|msg| msg.postln}, "/browser/status");
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
  "\n>>> INITIALIZE CENTROID % <<< to VECTOR %".format(msg[1], msg[2]).postln;
  (instrument: \thud, freq: \d5.f, amp: 0.7, dur: 0.5, dt: 0.4, atk: 0.01, rel: 0.5, decay: 0.1, out: Project.outverb).play;
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
  (instrument: \thud, freq: \d4.f, amp: 0.8, dur: 0.1, atk: 0.01, rel: 0.05, decay: 0.1, out: Project.outverb).play;
}, "/kmeans/iteration");


// distance calculation between entry and centroid
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nThe measure of entry % to centroid C% is %\n Δ • Δ           (%: %)".format(eidx, cidx, dist.round(0.001), eidx, eid).postln;
  // If distance is very small, or 0, modhz will be 0 and this instrument will be silent.
  (instrument: \fm01, freq: \g3.f * dist.asFloat, modhz: 100 * dist, amp: 1.0, atk: 0.01, rel: 0.1, dur: 0.01, pan: 0.0, out: Project.outverb).play;
}, "/kmeans/distance");


/*** change in best fit cluster for entry
/addr entry-idx entry-id cluster-idx normalized-distance */
OSCdef(\updateclosest, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nReconsider ENTRY % >> distance is % to category %\n⋱ ⋱ ⋱         (%: %)".format(eidx, dist, cidx, eidx, eid).postln;
  (instrument: \pm, freq: eidx * 12, idx: 2.5, phase: msg[4], spread: 0.1, amp: 0.8, dur: 0.7 * dist, pan: 0.0, ratio: 2.5, co1: 2000, co2: 900, rq:0.2, out: Project.outverb).play;
}, "/kmeans/updateClosestCentroid");

// final cluster assignment for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  //msg.postln;
  var eidx = msg[1], eid = msg[2];
  var cidx = msg[3], dist = msg[4];
  "\nENTRY % will be placed in CATEGORY % \n⊙ ⊙ ⊙ ⊙ ⊙              (%: %)".format(eidx, cidx, eidx, eid).postln;
  (instrument: \rezpad, freq: [\fs5.f, \fs6.f, \a4.f].wrapAt(cidx), amp: 3.0, dur: [0.01, 0.03, 0.06, 0.1].wrapAt(cidx), phase: 2.5, modhz: 2.1, out: Project.outverb).play;
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
  (instrument: \thud, freq: \d3.f, amp: 0.8, dur: 0.3, out: Project.outbass).play;
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



