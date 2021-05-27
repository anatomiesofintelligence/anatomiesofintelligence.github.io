/* -------------------------
Experiments in paresthesia, asmr, sound-body response, grima

https://www.medicalnewstoday.com/articles/251489
https://psychcentral.com/news/2012/10/11/why-we-cringe-at-unpleasant-sounds/45935.html
https://en.wikipedia.org/wiki/Frisson
https://www.bustle.com/p/how-does-asmr-work-this-is-why-it-makes-you-feel-weird-according-to-science-8444738
https://www.humorthatworks.com/database/10-frisson-inducing-songs-and-the-definition-of-frisson/

All Neon Like: https://youtu.be/ilSJvY928-Y

Inaudible Whispers: https://www.youtube.com/watch?v=CzIw48qqF58


----------------------- */


(
Project.startup(s, scenes: true, slimGlobal: 100, rootPath: "..".resolveRelative, onBoot: {
	"Hello".postln;
});
);

(// preload samples
~annoying = Smpl.loadGroupAndGetNames(\annoying, s);
~popup = Smpl.loadGroupAndGetNames(\popup, s);
~features = Smpl.loadGroupAndGetNames(\features, s);
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
	var t1, t2, verbtime;
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
	verbtime = 10;
	verbtime = Line.ar(1, 15, 20);
	t1 = JPverb.ar(s2, verbtime, 0.9, 5, 0.1, 0.9, 0.5, 1.0, 0.5, 0.3, 400.0, 2000.0).madd(vmix) + s2.madd(1-vmix);

	// crazy verb panning
	s2 = Pan2.ar(t1.sum, SinOsc.ar(LFNoise2.ar(0.2).range(0.01, 1)).range(-0.8, 0.8)) + s2;
	//s2 = Pan2.ar(t1.sum, SinOsc.ar(0.01).range(-0.5, 0.5)) + s2;

	s2 = BPeakEQ.ar(s2, 4000, 0.2, 12);
	s4 = BPeakEQ.ar(s4, 3500, 1.0, 6);
	mix=s1+s2+s3+s4;
	mix=LeakDC.ar(Limiter.ar(mix, 1.0, 0.001));
	mix * \master.ar(1.0);
}).play(out: 0, group: ~mix_g, addAction: \addToTail);
Ndef(\mix).set(\master, 1.0, \vmix, 0.5);
);


Smpl.gui;
Smpl.at("nails-on-chalkboard-01")
Smpl.at("glass-scraping-st")
Smpl.at("chair-friction")
(type: 'smpl', amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', dur: 1.0, amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', dur: 0.5, freq: \a5.f, amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', dur: 0.5, freq: \e5.f, amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', dur: 0.5, freq: \g5.f, amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;

(type: 'smpl', amp: 0.6, start: 0, freq: \f2.f, dur: 0.5, end: 83651, smpl: "amorphous_mass_lp", loops: 1, out: ~rev).play;

(type: 'smpl', amp: 0.6, start: 0, end: 8365, smpl: "chair-friction", loops: 1, out: ~hi).play;

(type: 'smpl', amp: 0.6, start: 0, end: 836511, smpl: "glass-scraping-st", loops: 1, out: ~rev).play;

c = Smpl.buf(~features[0]);

// Spatial Sounds
(type: 'smpl', dur: 0.5, amp: 0.7, start: 0, end: 291442, smpl: "LCAMEmerge", loops: 1, out: ~rev).play;
(type: 'smpl', amp: 0.6, start: 0, end: 83651, smpl: "amorphous_mass_lp", loops: 1, out: ~rev).play;





s.record;
s.stopRecording;

c = Smpl.buf(~features[0]);
c = Smpl.buf(~features[6]);
c = Smpl.buf(~popup[1]);

// Simple Sampler
(
Ndef(\smpler, {
	var sig, buf, startpos, endpos, playhead;
	var startframe, endframe;
	buf = c;
	startpos = 0.0;
	endpos = 1.0;
	startframe = BufFrames.kr(buf) * startpos;
	endframe = BufFrames.kr(buf) * endpos;
	playhead = Phasor.ar(1, BufRateScale.kr(buf), startframe, endframe, startframe);
	sig = BufRd.ar(2, buf, playhead, 1);
	sig = BHiPass4.ar(sig, MouseX.kr(80, 5000), MouseX.kr(2, 0.7));
	sig = Pan2.ar(sig.sum, MouseY.kr(-1,1));
	sig * 0.4;
}).play(out: ~rev, numChannels: 2, group: ~syn_g, addAction: \addToTail);

);

Ndef(\smpler).clear(10);


b = Smpl.at(~features[0]).asMonoBuffer(s);
b = Smpl.at("glass-scraping-st").asMonoBuffer(s);
b = Smpl.at("squeak-01").asMonoBuffer(s);
b = Smpl.at("chair-friction").asMonoBuffer(s);
b = Smpl.buf("nails-on-chalkboard-03");
b = Smpl.buf("viscera_fluid01");
b = Smpl.buf("viscera_fruit01");
b = Smpl.at("viscera_fruit02").asMonoBuffer(s);
b = Smpl.at("amorphous_mass_lp").asMonoBuffer(s);
b = Smpl.at("LCAMEmerge").asMonoBuffer(s);

Ndef(\gran).set(\buf, b);


Ndef(\gran).clear(10);

s.record;
s.stopRecording;


// Granulator
(
Ndef(\gran).set(\buf, b);
Ndef(\gran, {|buf|
	var sig, gpos, env, t_env, gdur=0.5, gpitch=1.0;
	gpos = MouseX.kr(0, 1, lag: 1);
	t_env = Changed.kr(gpos, 0.001);
	gpitch = MouseY.kr(0.1, 1.0, -2, 0.1);
	env = EnvGen.ar(Env.linen(0.01, 2.0, 0.3), t_env);
	sig = BufGrain.ar(GaussTrig.ar(SinOsc.ar(0.5).range(20,50), 0.5), gdur, buf, gpitch, gpos, 2);
	sig = Pan2.ar(sig, MouseY.kr(-1, 1));
	sig = sig * env;
	sig * 0.5;
}).play(out: ~rev, numChannels: 2, group: ~syn_g, addAction: \addToHead);

);


Ndef(\gran).clear(1);
s.record;
s.stopRecording;

(
Ndef(\whispers, {
	var sig, fx1, fx2;
	sig = Dust.ar(1000);
	fx1 = BLowPass4.ar(sig, SinOsc.ar(0.01).range(40, 60), 0.4);
	fx2 = BBandPass.ar(WhiteNoise.ar * Pulse.ar(5), SinOsc.ar(0.02).range(12000, 14000), 0.5);
	sig = (fx1*1) + (fx2 * 0);
	sig = sig * Line.ar(0, 10, 1);
	sig * 1.0;
}).play(out: ~rev, numChannels: 2, group: ~syn_g, addAction: \addToHead);
);
Ndef(\whispers).clear(20);



