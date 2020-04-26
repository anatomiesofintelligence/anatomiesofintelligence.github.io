/*
Sound Gestures
*/
Smpl.gui
// Two ways to play...
Smpl.localSamples;
x = Smpl.splay("bajko-horror-surgery")
x.free;

e = Smpl.at("bajko-horror-surgery").event.play;
e.free;

Smpl.at("bajko-horror-surgery").buffer;
b = Smpl.buf("man_slush1");

// Granular Synthesis Gestures


// TODO: would be nice if I could open up a gui to play with this sample
// Smpl.at("bajko-horror-surgery").gui;

(
Ndef(\gran1, {|amp=0.5,pre=1.0|
  var g_dens = \dens.kr(20, 0.5);
  var g_prate = \prate.kr(1.0, 0.0);
  var g_dur = \gdur.kr(0.1, 1);
  var g_pan = \gpan.kr(0.0, 1.0);
  var g_amp = \gamp.kr(0.2, 1.0);
  var buf = b;
  var t_gtrig = (Dust.ar(g_dens) > 0);
  var bufpos, sig;
  bufpos = \pos.kr(0.0, \poslag.kr(1.0, 0.0)) * BufDur.kr(buf); // in s
  sig = TGrains.ar(2, t_gtrig, buf, g_prate, bufpos, g_dur, g_pan, g_amp);
  sig = (sig * pre).tanh;
  Limiter.ar(sig * amp);
}).play(out: Project.outclean, numChannels: 2);
);

Syn.gui

Ndef.clear;
Ndef(\gran1).clear(10);
Project.meter(s);

Ndef(\gran1).set(\pos, 0.2, \amp, 1.0, \gamp, 0.7);

Ndef(\gran1).set(\pos, Ndef(\pos, { SinOsc.ar(SinOsc.ar(0.2).range(0.1, 0.5)).range(0,1) } ), \prate, Ndef(\prate, { LFNoise0.ar(5.6).range(-1.0, 1.0) }) );

Ndef(\gran1).set(\gdur, 0.08, \dens, 100, \gpan, Ndef(\pan, { LFNoise1.ar(10).range(-1,1) }));

Ndef(\gran1).set(\pre, 1.0);

Ndef(\gran1).clear(10);


Ndef.clear(10);

// Additive Synthesis
