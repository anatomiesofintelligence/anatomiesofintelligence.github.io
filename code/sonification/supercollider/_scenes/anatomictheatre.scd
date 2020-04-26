/*
anatomies of intelligence
catalog reading 01
Jonathan Reus & Joana Chicau (c) 2018, CC-SA
*/

(
//s.options.outDevice = "Soundflower (64ch)";
s.options.numInputBusChannels = 10; s.options.numOutputBusChannels = 10;
s.options.memSize = 8192 * 2 * 2 * 2; s.options.blockSize = 64 * 2 * 2 * 2;
s.waitForBoot { };
);

(
Ndef('catalog', {arg master=0.8;
	var mic,s1,s2,s3,mix;
	mic = SoundIn.ar(0);
	s1 = [mic,mic];

	//s1 = mic + PitchShift.ar(mic, 0.2, 1.5, 0, 0, mul: 0.1);
	s2 = In.ar(20, 2);

	//mix = GVerb.ar(mix, 200, 0.5, 0.01, 0.5, 1, 1, 0.3, 0.2);
	//mix = Mix([s1,s2]);
	//mix = mix * master;
	//s1 = s1 + Pan2.ar(CombL.ar(s1, 2, 1, 0, mul: 0.5), 1) + Pan2.ar(CombL.ar(s1, 2, 1.5, 0, mul: 0.5), -1);
	//s1 = s1 * 0.4;
	s2 = GVerb.ar(s2.sum, 100, 3, 0.5, 0.5, 15);
	mix = Mix([s1,s2]);
	mix = Limiter.ar(LeakDC.ar(mix), 1, 0.001);
	//mix = Pan2.ar(mix, 0, 1.0);
	mix;
}).play(out: 0, numChannels: 2);
);


Ndef.clear;
s.meter

Scale.major.ratios.select({|item,i| i.even })
Scale.major.class
Scale.major.ratios
Scale.major.degrees
Scale.major.tuning.wrapAt(_)

x = Scale.major.degrees.collect(Scale.major.tuning.wrapAt(_)).midiratio;

Scale.major.size
Scale.major.pitchesPerOctave
Scale.major.stepsPerOctave
Scale.major.degreeToFreq(4, 60.midicps, 4);
Scale.major.degreeToRatio(5, 0);


// 12 octaves worth of ratios > midpoint?
y = Array.fill(Scale.major.stepsPerOctave * 6, {arg i;
	Scale.major.degreeToRatio(i, 0);
});

// split at the 3rd octave?
m = 8*3;

z = y[..m];
l = y[(m+1)..];

z = (z.ratiomidi.round - 12).midiratio
l = (l.ratiomidi.round - 12).midiratio

z = z.collect {arg item;
	item / z[m];
};

l = l.collect {arg item;
	item / l[0];
};

(z * 440).cpsmidi
(l * 440).cpsmidi

(z * 440).cpsmidi.round
(l * 440).cpsmidi.round



(
Pdef('pat', Pbind(*[
	instrument: 'pip',
	//degree: Pseq([0,2,6,-2].stutter(12),inf),
	degree: Pseq([2,0,6,0].stutter(12),inf),
	octave: 1,
	root: "Db3".notemidi,
	dur: 0.1,
	delta: Pseq(((Array.series(100, 0, 0.035).sin + 1) / 10).pyramid(4), inf),
	amp: Ndef('amp', { Line.ar(0.1, 0.0, 30) }),
	amp: 1.0,
	ratioscale: Pwhite(3.1, 4.9),
	pan: 0,
	out: 20
]
)).play(quant: 1);
);

TempoClock.tempo = 200/60;

Pdef.clear;
Ndef.clear(10);
x
buffer.sine

y = ;





Pseq




(
SynthDef('pip', {arg out=20, freq=200, dur=0.1, amp=0.4, pan=0.0, ratioscale=2;
	var sig,env;
	//freq = ["Db5","Cb5"].choose.notecps;
	sig = LFTri.ar(freq);
	sig = sig + Splay.ar(PitchShift.ar(sig, 0.2, Scale.major.ratios * ratioscale)).sum;
	sig = (sig*10).tanh * 0.1;
	env = EnvGen.ar(Env.perc(0.001), timeScale: dur, doneAction: 2);
	sig = sig * env;
	//sig = Pan2.ar(sig, pan, amp);
	Out.ar(out, sig * amp);
}).add;
);


