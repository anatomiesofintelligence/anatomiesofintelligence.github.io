/******************************
NOTE: RUN 2020_TRANSMEDIALE FIRST AS BASIS
THIS FILE INCLUDES CODE MODIFICATION TO SHIFT THE ALGOIRTHMIC PROCESS INTO A MEDITATIVE STATE

*******************************/

(
Project.startup(s, false, true, false, 200, 20, true, rootpath: "..".resolveRelative, onBoot: {
  "ANATOMIES OF INTELLIGENCE".postln;
  ~scope = s.scope(2,0);
  ~scope.view.bounds_(Rect(400, 800, 1200, 1200));
  ~scope.view.front;
  ~scope.size = 1200;
  ~scope.xZoom = 4.0;
  ~scope.yZoom = 4.0;
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

Project.reaperSim;


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



Ndef(\fx30).clear(1);
Ndef(\fx32).clear(1);


(
Ndef(\sweep, {|amp=0.01|
  var sig, freq;
  amp = Lag.kr(amp, 10.0);
  freq = [\f0.kr(\cs4.f, 0.5),\f1.kr(\b4.f, 0.5),\f2.kr(\a6.f, 0.5)];
  sig = Saw.ar(freq * Scale.major.ratios).sum * SinOsc.ar(10) * Line.ar(0.0, 1.0);
  sig = sig.tanh;
  sig = Pan2.ar(sig, SinOsc.ar(0.1)) * amp * SinOsc.ar(0.01, mul: 10.0, add: -5.0).clip(-1.0, 1.0).range(0.0, 1.0).clip(-1,1);
  Out.ar(32, sig.sum * 0.4);
  sig;
}).play(out: 30, numChannels: 2);
);
Ndef(\sweep).clear(1);
Ndef(\sweep).clear(100);

Ndef(\sweep).set(\amp, 0.01);
// Grains

Smpl.buf(~slib[1]);
~slib[1];
Ndef(\g1).clear(1);
~slib.size;
(
~sbuf1 = Smpl.buf(~slib[2]);
~sbuf1 = Smpl.buf(~slib[1]);
~sbuf1 = Smpl.buf(~slib[0]);
~sbuf1 = Smpl.buf(~slib[3]);
~sbuf1 = Smpl.buf(~slib[4]);
~sbuf1.duration;

Ndef(\g1, {|amp=0.5,pre=0.9,co=18000,rq=1,pos_var=0.01, g_prate=1.0|
  var g_dens = \dens.kr(20, 0.5);
  var g_dur = \gdur.kr(0.1, 1.0);
  var g_pan = \gpan.kr(0.0, 1.0);
  var g_amp = \gamp.kr(0.2, 1.0);
  var buf = ~sbuf1;
  var t_gtrig = (Dust.ar(g_dens) > 0);
  var bufpos, sig, bufdur = BufDur.kr(buf);
  pos_var = pos_var * bufdur;
  g_prate = Lag.kr(g_prate, 1.0);
  bufpos = (\pos.kr(0.0, 0.1) + LFNoise1.ar(20).range(-1.0 * pos_var, pos_var)).clip(0.0, bufdur) * bufdur;
  bufpos = Lag.ar(bufpos, \poslag.kr(1.0, 0.5));
  sig = TGrains.ar(2, t_gtrig, buf, g_prate, bufpos, g_dur, g_pan, g_amp);
  sig = (sig * pre).tanh;
  sig = BLowPass4.ar(sig, co, rq);
  //sig = sig * Line.ar(0.0, 1.0, 10);
  sig = Limiter.ar(sig * amp);
  Out.ar(32,sig.sum);
  sig;
}).play(out: 0, numChannels: 2);
);

Ndef(\g1).clear(1);
Ndef(\g1).clear(100);
Ndef(\sweep).clear(10);
Project.meter

~scope.style=0;
~scope.style=1;
~scope.style=2;
~scope.xZoom = 1.0;
~scope.yZoom = 10.0;

Ndef(\g1).set(\gdur, Ndef(\gdur_var, { LFNoise1.kr(20).range(0.01, 2.0) }), \dens, 2, \pos, 0.5, \pos_var, 0.8, \amp, 1.0, \gamp, 0.3, \co, 12000, \gpan, Ndef(\gpan_pan, { SinOsc.ar(0.1) }));


Ndef(\g1).set(\pos, 0.2, \amp, 1.0, \gamp, 1.0);
Ndef(\g1).set(\pos, 4.2, \amp, 1.0, \gamp, 0.7, \co, 12000, \gpan, -1.0);
Ndef(\g1).set(\pos, 0.5, \amp, 1.0, \gamp, 0.3, \co, 12000, \gpan, 1.0);


Ndef(\g1).set(\gdur, 0.1, \pos, rrand(0.0, ~sbuf1.duration), \amp, 1.0, \gamp, 0.4, \co, 12000, \gpan, 0.0, \poslag, 5);
Ndef(\g1).set(\pos, Ndef(\pos1, { LFNoise1.kr(0.2).range(0.0, 4.0) }), \amp, 0.4, \gamp, 0.5, \gdur, Ndef(\gdur, { LFNoise1.kr(5).range(0.01, 0.2) }), \dens, 100, \out, Project.outverb);
Ndef(\g1).set(\rq, 0.3, \co, Ndef(\co, { LFNoise2.ar(10).range(80, 10000) }));
Ndef(\g1).set(\dens, 0.4, \amp, 0.2, \gdur, 2.0, \prate, Ndef(\playpitch, { Saw.ar(0.1).range(-0.5, -0.2) }), \gpan, 0.0);
Ndef(\g1).set(\dens, 2, \amp, 0.5, \gdur, 0.3, \prate, -0.3, \gpan, 0.0);
Ndef(\g1).set(\pos, \amp, 0.2, Ndef(\pos, { SinOsc.ar(SinOsc.ar(0.4).range(0.05, 1.0)).range(0.0,4.0) } ), \g_prate, Ndef(\prate, { LFNoise0.ar(12).range(-0.4, 0.2) }) );
Ndef(\g1).set(\gdur, 0.08, \amp, 0.6, \dens, 100, \gpan, Ndef(\gpan, { LFNoise1.ar(10).range(-1,1) }), \prate, -0.5);
Ndef(\g1).set(\pre, 3.0, \co, 12700, \rq, 2, \pos, 0.2, \dens, 20, \dur, 0.2, \gamp, 1.0);
Ndef(\g1).clear(10);
Ndef(\g1).clear;

(
Ndef(\measure, {|amp=0.1,pre=0.9,co=18000,rq=1,f1=300,f2=400,depth1=20,pan=0.0,dur=1.0|
  var sig, t_changed, env;
  t_changed = Changed.kr(f1);
  f1 = Lag.kr(f1, 2.0);
  f2 = Lag.kr(f2, 2.0);
  env = EnvGen.ar(Env.perc(0.01, dur, 1.0, -2.0), t_changed, 1.0, 0.0, 1.0, doneAction: 0);
  amp = Lag.kr(amp, 1.0);
  sig = SinOsc.ar(f1 + Saw.ar(f2).range(-1.0 * depth1, depth1));
  sig = BLowPass4.ar(sig, co, rq);
  sig = Pan2.ar(sig, pan);
  sig = sig.tanh * env;
  sig = Limiter.ar(sig * amp);
  Out.ar(32, sig);
  sig;
}).play(out: Project.outverb, numChannels: 2);
);


( // General Processing
Ndef(\fx30, {
  var insig, mix;
  insig = In.ar(30, 2);
  mix = FreeVerb.ar(insig, 0.8, 0.2, 0.2);
  Limiter.ar(mix, 1.0, 0.001) * 1.0;
}).play(out: 0, numChannels: 2);
Ndef(\fx32, {
  var insig, mix;
  insig = In.ar(32, 1);
  mix = GVerb.ar(insig, 30, 3, 0.2, 0.3, 30, 0.5, 0.2, 0.8);
  Limiter.ar(mix, 1.0, 0.001) * 0.1;
}).play(out: 0, numChannels: 2);
);

Ndef(\fx30).clear(1);
Ndef(\fx32).clear(1);



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
  var cidx = msg[1], f_vec;
  f_vec = msg[2].asString.split($,);
  "\n>>> INITIALIZE CENTROID % <<< to VECTOR %".format(cidx, f_vec).postln;
  (instrument: \thud, freq: \d4.f, amp: 0.4, dur: 2.0, dt: 0.4, atk: 1.0, rel: 0.1, decay: 1.0, out: Project.outverb).play;
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
    Ndef(\g1).set(\pos, 0.2, \pos_var, 0.3, \dens, 0.4, \amp, 1.0, \gdur, 2.0, \g_prate, Ndef(\playpitch, { Saw.ar(0.1).range(-0.8, -0.2) }), \gpan, 0.0);

  };

}, "/kmeans/iteration");


// distance calculation between entry and centroid
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\distance, {|msg|
  //msg.postln;
  var pan = 0.0;
  var eidx = msg[1].asInt, eid = msg[2];
  var cidx = msg[3].asInt, dist = msg[4].asFloat;
  var f0,f1,f2,amp;
  var tune = [\a4, \d4, \e4, \a4, \gs4, \c5, \a5, \b6].stutter(2);
  "\nThe measure of entry % to centroid C% is %\n Δ • Δ           (%: %)".format(eidx, cidx, dist.round(0.001), eidx, eid).postln;
  // If distance is very small, or 0, modhz will be 0 and this instrument will be silent.
  f0 = tune.wrapAt(eidx).f;
  f1 = tune.wrapAt(cidx).f;
  amp = dist.linlin(0.0, 20.0, 0.001, 1.0).clip(0.001, 0.01);
  Ndef(\sweep).set(\f0, f0, \f1, f1, \f2, \a6.f, \amp, amp);
  Ndef(\measure).set(\amp, 0.1, \co, (dist * 1000) + 100, \rq, 0.1, \f1, 20 * eidx, \f2, 3.3 * cidx, \depth1, 30, \pan, Ndef(\dist_pan, { LFNoise2.ar(20).range(-1.0, 1.0) }), \dur, 3.0);
}, "/kmeans/distance");


/*** change in best fit cluster for entry
/addr entry-idx entry-id cluster-idx normalized-distance */
OSCdef(\updateclosest, {|msg|
  var eidx = msg[1].asInt, eid = msg[2];
  var cidx = msg[3].asInt, dist = msg[4];
  var pan = 0.0;
  "\nReconsider ENTRY % >> distance is % to category %\n⋱ ⋱ ⋱         (%: %)".format(eidx, dist, cidx, eidx, eid).postln;
  dist = dist.asFloat;
  pan = Ndef(\recalc_pan, { SinOsc.ar(0.7) });
  Ndef(\g1).set(\gdur, 1.0, \pos, ~sbuf1.duration / dist.clip(1.3,20.0), \prate, Ndef(\dsweep, { XLine.ar(2.0, 0.5, 0.5) }), \amp, 2.0, \gamp, 1.0, \co, (1000 * cidx) + 60, \gpan, pan, \pos_lag, 4.0, \rq, 0.5, \dens, 0.1, \pos_var, 0.2);
}, "/kmeans/updateClosestCentroid");

// final cluster assignment for entry
// addr entry-idx entry-id cluster-idx normalized-distance
OSCdef(\assigncluster, {|msg|
  //msg.postln;
  var eidx = msg[1].asInt, eid = msg[2];
  var cidx = msg[3].asInt;
  var dur;
  "\nENTRY % will be placed in CATEGORY % \n⊙ ⊙ ⊙ ⊙ ⊙              (%: %)".format(eidx, cidx, eidx, eid).postln;
  dur = [1,1,1,1].wrapAt(cidx);
  (instrument: \rezpad, freq: [\f3.f, \f4.f, \a3.f].wrapAt(cidx), amp: 0.0, dur: [1, 1, 1, 1.0].wrapAt(cidx), \atk: 1.0, phase: 1.5, modhz: 0.4, out: Project.outverb).play;
}, "/kmeans/assignCluster");


// recalculated centroids for new cluster assignments
// addr status(new/keep) cluster-idx centroid-features
OSCdef(\recalccentroid, {|msg|
  var cidx, f_vec, pan, pos;
  msg[3] = msg[3].asString.split($,);
  "Parsing feature vector %".format(msg[3]).postln;
  f_vec = msg[3].collect {|it| if(it.isNil.or {it.asInt == -1}) { 0.0 } { it.asString.asFloat } };
  cidx = msg[2].asInt;
  if(msg[1] == 'new') {
    "Recalculating ⊙ CENTER ⊙ of cluster ⊙ % ⊙ as vector %".format(msg[2], f_vec).postln;
  } {
    "The ⊙ CENTER ⊙ of cluster % remains unchanged %".format(msg[2], msg[3]).postln;
  };
  pan = Ndef(\recalc_pan, { SinOsc.ar(0.3) });
  pos = ~sbuf1.duration / (cidx + 1);
  Ndef(\g1).set(\gdur, 1.0, \pos, pos, \amp, 2.0, \gamp, 1.0, \co, (300 * f_vec[0]) + 1360, \gpan, pan, \pos_lag, 4.0, \rq, 0.5, \dens, 0.2, \pos_var, 0.1);
}, "/kmeans/recalculateCentroid");

);




