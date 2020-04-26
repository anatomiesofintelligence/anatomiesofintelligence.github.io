/* -------------------------
Experiments in paresthesia, asmr, sound-body response

https://www.medicalnewstoday.com/articles/251489
https://psychcentral.com/news/2012/10/11/why-we-cringe-at-unpleasant-sounds/45935.html
https://en.wikipedia.org/wiki/Frisson
https://www.bustle.com/p/how-does-asmr-work-this-is-why-it-makes-you-feel-weird-according-to-science-8444738
https://www.humorthatworks.com/database/10-frisson-inducing-songs-and-the-definition-of-frisson/

All Neon Like: https://youtu.be/ilSJvY928-Y

Inaudible Whispers: https://www.youtube.com/watch?v=CzIw48qqF58


----------------------- */


(
Project.startup(s, scenes: false, slimGlobal: 100, rootPath: "..".resolveRelative, onBoot: {
	"Hello".postln;
});
);

(// preload samples
~annoying = Smpl.loadGroupAndGetNames(\annoying, s);


);
Smpl.gui;

( // TODO: maybe make this the default audio chain created by Project
if(~mix_g.isNil) { ~mix_g = Group.new(s, \addToTail) };
if(~syn_g.isNil) { ~syn_g = Group.new(s, \addToHead) };
if(~clean.isNil) { ~clean = Bus.audio(s, 2) };
if(~rev.isNil) { ~rev = Bus.audio(s, 2) };
if(~low.isNil) { ~low = Bus.audio(s, 2) };
if(~hi.isNil) { ~hi = Bus.audio(s, 2) };
Ndef(\mix, {|vmix=0.5|
	var s1, s2, s3, s4, mix;
	var t1, t2;
	var inclean, inrev, inlow, inhi;
	inclean = In.ar(~clean, 2);
	inrev = In.ar(~rev, 2);
	inlow = In.ar(~low, 2);
	inhi = In.ar(~hi, 2);
	s1=inclean;
	s2=inrev;
	s3=inlow;
	s4=inhi;
	//t2 = Amplitude.ar(s2, 0.001, 0.01);
	//s2 = (s2*10).tanh * t2;
	t1 = JPverb.ar(s2, 10, 0.9, 4, 0.3, 0.9, 0.5, 1.0, 1.0, 0.3, 400.0, 2000.0).madd(vmix) + s2.madd(1-vmix);
	s2 = Pan2.ar(t1.sum, SinOsc.ar(LFNoise2.ar(0.2).range(0.01, 1)).range(-0.8, 0.8)) + s2;
	s2 = BPeakEQ.ar(s2, 4000, 0.2, 12);
	s4 = BPeakEQ.ar(s4, 3500, 1.0, 6);
	mix=s1+s2+s3+s4;
	mix=LeakDC.ar(Limiter.ar(mix, 1.0, 0.001));
	mix * \master.ar(1.0);
}).play(out: 0, group: ~mix_g, addAction: \addToTail);
Ndef(\mix).set(\master, 1.0, \vmix, 0.5);
);


Smpl.gui;
Smpl.gui;
Smpl.at("nails-on-chalkboard-01")
Smpl.at("glass-scraping-st")
Smpl.at("chair-friction")
(type: 'smpl', amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', amp: 0.6, start: 0, end: 83651, smpl: "amorphous_mass_lp", loops: 1, out: ~rev).play;

(type: 'smpl', amp: 0.6, start: 0, end: 8365, smpl: "chair-friction", loops: 1, out: ~hi).play;

(type: 'smpl', amp: 0.6, start: 0, end: 836511, smpl: "glass-scraping-st", loops: 1, out: ~rev).play;


b = Smpl.at("glass-scraping-st").asMonoBuffer(s);
b = Smpl.at("squeak-01").asMonoBuffer(s);
b = Smpl.at("chair-friction").asMonoBuffer(s);
b = Smpl.buf("nails-on-chalkboard-03");
b = Smpl.buf("viscera_fluid01");
b = Smpl.buf("viscera_fruit01");
b = Smpl.at("viscera_fruit02").asMonoBuffer(s);
Ndef(\gran).set(\buf, b);


// Granulator
(
Ndef(\gran).set(\buf, b);
Ndef(\gran, {|buf|
	var sig, gpos, env, t_env, gdur=0.5, gpitch=1.0;
	gpos = MouseX.kr(0, 1, lag: 1);
	t_env = Changed.kr(gpos, 0.001);
	gpitch = MouseY.kr(0.25, 4, -2, 0.1);
	env = EnvGen.ar(Env.linen(0.1, 1.0, 0.1), t_env);
	sig = BufGrain.ar(GaussTrig.ar(SinOsc.ar(0.5).range(20,50), 0.5), gdur, buf, gpitch, gpos, 2);
	sig = Pan2.ar(sig, MouseY.kr(-1, 1));
	sig = sig * env;
	sig;
}).play(out: ~rev, numChannels: 2, group: ~syn_g, addAction: \addToHead);

);


Ndef(\gran).clear(1);
s.record;
s.stopRecording;

(
Ndef(\whispers, {
	var sig;
	sig = Dust.ar(100);
	sig * 0.2;
}).play(out: ~clean, numChannels: 2, group: ~syn_g, addAction: \addToHead);
);
Ndef(\whispers).clear;



