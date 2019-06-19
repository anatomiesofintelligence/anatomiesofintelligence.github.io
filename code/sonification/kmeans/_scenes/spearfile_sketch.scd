/*
Pseudo object prototype for reading exports from Spear

Spear Exports two types of plaintext data formats: FRAMES and PARTIALS

__FRAMES__ data is organized in sequential order of time steps (frames).
The first two lines state the data format and the format of each data point,
followed by the total number of partials, and then the total number of frames (e.g. event points). A FRAMES header looks like this:
-----
par-text-frame-format
point-type index frequency amplitude
partials-count 2
frame-count 89
frame-data
-----

And is followed by a series of newline separated time steps describing the state of all active partials in each time delta.
Each line has the format

TIMESTAMP NUM_PARTIALS Px Fpx Apx Py Fpy Apy Pz Fpz Apz ...

Where NUM_PARTIALS is the number of active partials in that frame
and each triplet Px Fpx Apx describes the frequency and amplitude of a given partial during the frame. Px, Py, Pz, etc.. are the indexes of each partial, which are unique per partial throughout the dataset

A more complete FRAME-formatted file export would look like this, this file describes two overlapping partials.

-----
par-text-frame-format
point-type index frequency amplitude
partials-count 2
frame-count 89
frame-data
0.010000 1 1 1770.019409 0.000000
0.020000 1 1 1806.640503 0.001256
0.030000 1 1 1831.054565 0.001373
0.040000 1 1 1867.675415 0.001538
0.050000 1 1 1892.089600 0.001661
0.060000 1 1 1928.710571 0.001793
0.070000 1 1 1953.124634 0.001911
0.080000 1 1 1989.745728 0.002078
0.090000 1 1 2014.159790 0.002180
0.100000 1 1 2038.573730 0.002288
0.110000 1 1 2062.987793 0.002421
0.120000 1 1 2087.401855 0.002560
0.130000 1 1 2111.815918 0.002584
0.140000 1 1 2136.229736 0.002736
0.150000 1 1 2160.644043 0.002850
0.160000 1 1 2185.058105 0.002938
0.170000 1 1 2209.471924 0.002818
0.180000 1 1 2221.679443 0.002591
0.190000 1 1 2258.300293 0.002468
0.200000 1 1 2282.713867 0.002446
0.210000 1 1 2307.127930 0.002400
0.220000 1 1 2319.335693 0.002374
0.230000 1 1 2343.749756 0.002337
0.240000 1 1 2380.370605 0.002296
0.250000 1 1 2416.991211 0.002294
0.260000 1 1 2429.198730 0.002199
0.270000 1 1 2429.198975 0.002306
0.280000 1 1 2441.405762 0.002426
0.290000 2 1 2441.406006 0.002664 0 4309.081055 0.001271
0.300000 2 1 2441.406006 0.002818 0 4296.874512 0.001410
0.310000 2 1 2429.199219 0.003080 0 4284.666992 0.001466
0.320000 2 1 2429.198975 0.003355 0 4260.253418 0.001556
0.330000 2 1 2429.198975 0.003613 0 4248.046387 0.001685
0.340000 2 1 2429.198975 0.003853 0 4223.632324 0.001784
0.350000 2 1 2425.130127 0.004140 0 4217.528809 0.001839
0.360000 2 1 2416.991943 0.004474 0 4199.218262 0.001800
0.370000 2 1 2410.888428 0.004821 0 4174.804199 0.001852
0.380000 2 1 2404.784912 0.005169 0 4162.597168 0.001939
0.390000 2 1 2396.646973 0.005639 0 4150.389648 0.002007
0.400000 2 1 2389.526123 0.006070 0 4138.183105 0.002117
0.410000 2 1 2383.422607 0.006462 0 4125.976074 0.002203
0.420000 2 1 2377.319092 0.006833 0 4101.562012 0.002242
0.430000 2 1 2371.215576 0.007181 0 4101.562012 0.002348
0.440000 2 1 2364.094971 0.007555 0 4083.251709 0.002492
0.450000 2 1 2355.956787 0.007957 0 4077.147949 0.002637
0.460000 2 1 2343.750000 0.008466 0 4064.940918 0.002712
0.470000 2 1 2335.611816 0.008748 0 4052.734131 0.002826
0.480000 2 1 2327.473877 0.009005 0 4040.527100 0.002929
0.490000 2 1 2319.335693 0.009237 0 4028.320068 0.003039
0.500000 2 1 2307.128906 0.009517 0 4028.319824 0.003060
0.510000 2 1 2294.921875 0.009629 0 4010.009277 0.003148
0.520000 2 1 2282.714844 0.009448 0 4003.905762 0.003244
0.530000 2 1 2270.507812 0.009422 0 3991.698975 0.003310
0.540000 2 1 2258.300781 0.009300 0 3979.491943 0.003464
0.550000 2 1 2246.093750 0.009109 0 3979.491699 0.003512
0.560000 2 1 2239.990234 0.008671 0 3967.284668 0.003485
0.570000 2 1 2221.679688 0.008230 0 3955.077881 0.003541
0.580000 2 1 2209.472656 0.008012 0 3942.870850 0.003411
0.590000 2 1 2203.369141 0.007823 0 3942.870605 0.003307
0.600000 2 1 2185.058838 0.007731 0 3930.663574 0.003290
0.610000 2 1 2172.851562 0.007714 0 3918.456787 0.003275
0.620000 2 1 2172.851318 0.007634 0 3906.249756 0.003212
0.630000 2 1 2154.541016 0.007632 0 3906.249756 0.003194
0.640000 2 1 2142.333984 0.007667 0 3894.042725 0.003215
0.650000 2 1 2130.126953 0.007670 0 3894.042480 0.003098
0.660000 2 1 2117.919922 0.007693 0 3881.835449 0.002997
0.670000 2 1 2111.816162 0.007495 0 3869.628662 0.002775
0.680000 2 1 2099.609375 0.007490 0 3869.628662 0.002701
0.690000 2 1 2087.402344 0.007422 0 3881.835693 0.002530
0.700000 2 1 2075.195068 0.007162 0 3894.042725 0.002404
0.710000 2 1 2062.988281 0.007077 0 3906.249756 0.002373
0.720000 2 1 2050.781006 0.006885 0 3918.457031 0.002448
0.730000 2 1 2038.574585 0.006654 0 3930.664062 0.002468
0.740000 2 1 2026.367554 0.006093 0 3942.871094 0.002514
0.750000 2 1 2014.160278 0.005700 0 3955.078125 0.002583
0.760000 2 1 2014.160034 0.005208 0 3979.491943 0.002681
0.770000 2 1 2001.953003 0.004790 0 3979.491943 0.002692
0.780000 2 1 1977.539185 0.004434 0 3991.698975 0.002711
0.790000 2 1 1977.538940 0.004212 0 4003.906006 0.002768
0.800000 2 1 1965.331909 0.004012 0 4016.113037 0.002711
0.810000 2 1 1953.124878 0.000000 0 4028.320068 0.002658
0.820000 1 0 4028.320312 0.002606
0.830000 1 0 4052.734131 0.002541
0.840000 1 0 4052.734375 0.002537
0.850000 1 0 4077.148438 0.002427
0.860000 1 0 4089.355225 0.002336
0.870000 1 0 4101.562500 0.002322
0.880000 1 0 4113.769531 0.002229
0.890000 1 0 4125.976562 0.002141
---




PARTIALS formatted data describes each partial sequentially in the format of a breakpoint-like sequence of datapoints each with timestamps.

Here is the same two partials described using the partials format.
The header is slightly different but still contains the number of partials.
Each partial begins with a line with 4 pieces of information:

IDX NUM_POINTS START_TIME END_TIME

followed by a single line with all the data points defining that partial, made up of TIME FREQUENCY AMPLITUDE triplets

---
par-text-partials-format
point-type time frequency amplitude
partials-count 2
partials-data
0 109 0.285000 0.900000
0.285000 4321.288574 0.000000 0.290000 4309.081543 0.001271 0.295000 4296.874512 0.001355 0.300000 4296.874512 0.001410 0.310000 4284.667480 0.001466 0.315000 4260.253418 0.001511 0.325000 4260.253418 0.001601 0.330000 4248.046387 0.001685 0.335000 4235.839355 0.001711 0.340000 4223.632324 0.001784 0.345000 4223.632324 0.001851 0.355000 4211.425293 0.001827 0.360000 4199.218262 0.001800 0.365000 4187.011230 0.001810 0.370000 4174.804199 0.001852 0.375000 4174.804199 0.001896 0.380000 4162.597168 0.001939 0.385000 4150.390137 0.001983 0.390000 4150.390137 0.002007 0.395000 4138.183105 0.002050 0.400000 4138.183105 0.002117 0.410000 4125.976074 0.002203 0.415000 4113.769043 0.002233 0.420000 4101.562012 0.002242 0.430000 4101.562012 0.002348 0.435000 4089.355225 0.002439 0.445000 4077.148193 0.002546 0.450000 4077.148193 0.002637 0.460000 4064.941162 0.002712 0.465000 4052.734131 0.002786 0.475000 4052.734131 0.002865 0.480000 4040.527100 0.002929 0.485000 4040.527100 0.002962 0.490000 4028.320068 0.003039 0.500000 4028.320068 0.003060 0.505000 4016.113037 0.003138 0.515000 4003.906006 0.003159 0.520000 4003.906006 0.003244 0.530000 3991.698975 0.003310 0.535000 3991.698975 0.003398 0.540000 3979.491943 0.003464 0.550000 3979.491943 0.003512 0.555000 3967.284912 0.003502 0.560000 3967.284912 0.003485 0.570000 3955.077881 0.003541 0.575000 3955.077881 0.003473 0.580000 3942.870850 0.003411 0.585000 3942.870850 0.003317 0.590000 3942.870850 0.003307 0.595000 3930.663818 0.003298 0.600000 3930.663818 0.003290 0.605000 3918.456787 0.003282 0.610000 3918.456787 0.003275 0.615000 3918.456787 0.003184 0.620000 3906.249756 0.003212 0.625000 3906.249756 0.003185 0.635000 3906.249756 0.003202 0.640000 3894.042725 0.003215 0.645000 3894.042725 0.003123 0.650000 3894.042725 0.003098 0.655000 3881.835693 0.003002 0.660000 3881.835693 0.002997 0.665000 3869.628662 0.002919 0.670000 3869.628662 0.002775 0.675000 3869.628662 0.002710 0.680000 3869.628662 0.002701 0.685000 3869.628662 0.002606 0.690000 3881.835693 0.002530 0.695000 3881.835693 0.002444 0.700000 3894.042725 0.002404 0.705000 3894.042725 0.002413 0.710000 3906.249756 0.002373 0.715000 3906.249756 0.002420 0.720000 3918.456787 0.002448 0.725000 3930.663818 0.002488 0.730000 3930.663818 0.002468 0.735000 3942.870850 0.002480 0.740000 3942.870850 0.002514 0.745000 3955.077881 0.002522 0.750000 3955.077881 0.002583 0.755000 3967.284912 0.002635 0.760000 3979.491943 0.002681 0.770000 3979.491943 0.002692 0.775000 3979.491943 0.002727 0.780000 3991.698975 0.002711 0.785000 3991.698975 0.002741 0.790000 4003.906006 0.002768 0.795000 4003.906006 0.002711 0.800000 4016.113037 0.002711 0.805000 4016.113037 0.002670 0.810000 4028.320068 0.002658 0.815000 4028.320068 0.002653 0.820000 4028.320068 0.002606 0.825000 4040.527100 0.002548 0.830000 4052.734131 0.002541 0.835000 4052.734131 0.002531 0.840000 4052.734131 0.002537 0.845000 4064.941162 0.002469 0.850000 4077.148193 0.002427 0.855000 4089.355225 0.002396 0.860000 4089.355225 0.002336 0.865000 4089.355225 0.002366 0.870000 4101.562012 0.002322 0.875000 4113.769043 0.002257 0.880000 4113.769043 0.002229 0.885000 4125.976074 0.002198 0.890000 4125.976074 0.002141 0.895000 4138.183105 0.002155 0.900000 4150.390137 0.000000
1 103 0.010000 0.810000
0.010000 1770.019409 0.000000 0.015000 1782.226440 0.001198 0.020000 1806.640503 0.001256 0.025000 1818.847534 0.001321 0.035000 1843.261597 0.001425 0.040000 1867.675659 0.001538 0.050000 1892.089722 0.001661 0.060000 1928.710815 0.001793 0.070000 1953.124878 0.001911 0.075000 1977.538940 0.002022 0.085000 2001.953003 0.002134 0.090000 2014.160034 0.002180 0.100000 2038.574097 0.002288 0.105000 2050.781006 0.002381 0.115000 2075.195068 0.002461 0.120000 2087.402100 0.002560 0.130000 2111.816162 0.002584 0.135000 2124.023193 0.002680 0.145000 2148.437256 0.002791 0.150000 2160.644287 0.002850 0.155000 2172.851318 0.002898 0.160000 2185.058350 0.002938 0.165000 2197.265381 0.002810 0.170000 2209.472412 0.002818 0.175000 2221.679443 0.002685 0.180000 2221.679443 0.002591 0.185000 2246.093506 0.002514 0.190000 2258.300537 0.002468 0.195000 2258.300537 0.002473 0.200000 2282.714600 0.002446 0.205000 2282.714600 0.002418 0.210000 2307.128662 0.002400 0.215000 2319.335693 0.002363 0.220000 2319.335693 0.002374 0.225000 2343.749756 0.002331 0.230000 2343.749756 0.002337 0.235000 2368.163818 0.002319 0.240000 2380.370850 0.002296 0.245000 2392.577881 0.002313 0.250000 2416.991943 0.002294 0.255000 2416.991943 0.002206 0.260000 2429.198975 0.002199 0.270000 2429.198975 0.002306 0.280000 2441.406006 0.002426 0.285000 2441.406006 0.002587 0.300000 2441.406006 0.002818 0.310000 2429.198975 0.003080 0.325000 2429.198975 0.003492 0.345000 2429.198975 0.003973 0.360000 2416.991943 0.004474 0.380000 2404.784912 0.005169 0.395000 2392.577881 0.005873 0.415000 2380.370850 0.006659 0.435000 2368.163818 0.007355 0.450000 2355.956787 0.007957 0.460000 2343.749756 0.008466 0.475000 2331.542725 0.008890 0.490000 2319.335693 0.009237 0.500000 2307.128662 0.009517 0.510000 2294.921631 0.009629 0.520000 2282.714600 0.009448 0.530000 2270.507568 0.009422 0.540000 2258.300537 0.009300 0.550000 2246.093506 0.009109 0.555000 2246.093506 0.008749 0.565000 2233.886475 0.008592 0.570000 2221.679443 0.008230 0.580000 2209.472412 0.008012 0.585000 2209.472412 0.007868 0.595000 2197.265381 0.007778 0.600000 2185.058350 0.007731 0.610000 2172.851318 0.007714 0.620000 2172.851318 0.007634 0.625000 2160.644287 0.007593 0.635000 2148.437256 0.007671 0.645000 2136.230225 0.007663 0.655000 2124.023193 0.007677 0.665000 2111.816162 0.007708 0.670000 2111.816162 0.007495 0.680000 2099.609131 0.007490 0.690000 2087.402100 0.007422 0.695000 2075.195068 0.007308 0.700000 2075.195068 0.007162 0.710000 2062.988037 0.007077 0.715000 2050.781006 0.006957 0.725000 2050.781006 0.006813 0.730000 2038.574097 0.006654 0.735000 2038.574097 0.006321 0.740000 2026.367065 0.006093 0.745000 2026.367065 0.005887 0.750000 2014.160034 0.005700 0.755000 2014.160034 0.005528 0.760000 2014.160034 0.005208 0.765000 2001.953003 0.005018 0.770000 2001.953003 0.004790 0.775000 1989.745972 0.004655 0.780000 1977.538940 0.004434 0.785000 1977.538940 0.004343 0.790000 1977.538940 0.004212 0.795000 1965.331909 0.004103 0.800000 1965.331909 0.004012 0.805000 1953.124878 0.003705 0.810000 1953.124878 0.000000
---


*/
( // Spearfile as Partials
s.options.memSize = 262144;

f = ();
f.partials = List.new;
f.filePath;
f.numPartials;

f.loadFilePath = {|e, path|
  if(File.exists(path)) {
    var line, range, file;
    var tmp;
    f.filePath = path;
    file = File.readAllString(path).split($\n);

    /* Parse header
      par-text-partials-format
      point-type time frequency amplitude
      partials-count 2
      partials-data
    */
    if(file.size < 6) { "NO PARTIALS DATA IN FILE".throw };
    if(file[0] != "par-text-partials-format") { "HEADER ERROR".throw };
    if(file[1] != "point-type time frequency amplitude") { "HEADER ERROR".throw };
    tmp = file[2].findRegexp("partials-count ([0-9]+)");
    if(tmp.shape != [2,2]) { "HEADER ERROR".throw };
    f.numPartials = tmp[1][1].asInt;
    if(file[3] != "partials-data") { "HEADER ERROR".throw };

    /* Parse partials
    ID NUM_POINTS T_START T_END
    T1 F1 A1 T2 F2 A2 T3 F3 A3 ...
    */
    f.partials = List.new;
    range = Array.series((file.size / 2) - 2, 4, 2);
    range.do {|idx|
      var partial = (), points;


      line = file[idx].split($ );
      partial.id = line[0].asInt;
      partial.numpoints = line[1].asInt;
      partial.t_start = line[2].asFloat;
      partial.t_end = line[3].asFloat;

      // [time, freq, amp]
      points = file[idx+1].split($ ).collect(_.asFloat).clump(3);
      partial.points = points;

      f.partials.add(partial); // add to list
    };

    "DONE: Read % partials".format(f.numPartials).warn;

  } {
    "FILE IS NOT VALID SPEAR PARTIALS FORMAT: %".format(path).error;
    ^nil;
  };
};

f.load = {|e|
  Dialog.openPanel({|path| f.loadFilePath(path); }, {"cancelled".postln});
};



);


// load a Spear file (partials format in plaintext)
f.load;
f.partials;

// How would a spear file play back...
// [time, freq, amp] triplets


/* SINGLE SYNTH METHOD
The below method puts all the partials in a single SynthDef
The problem here is that the SynthDef gets really big with all the huge
envelopes.

It only really works for a few partials before storing the synthdef as a
file. And with a lot of partials (think 3000, not uncommon for a rich
sound in Spear) ~ this could leave SC hanging.

An alternative to embedding these envelopes in the SynthDef is to load
the envelopes into buffers and play them as signals from there. This is significantly more efficient fo real-time re-synthesis!

See:
https://sc-users.bham.ac.narkive.com/PXG1ZPFm/warning-synthdef-too-big-for-sending
and:
https://sc-users.bham.ac.narkive.com/Dm1NKq93/synthdef-responder-too-big-for-sending
*/
( // Put all partials in a single synth, use envelop delays for timing

/* This will freeze SC as partials get into the thousands...
{
  var maxdur=6, sig;
  sig = f.partials.collect({|partial, idx|
    var freq, freqs = Array.newClear(partial.points.size);
    var amp, amps = Array.newClear(partial.points.size);
    partial.points.do {|point, idx|
      freqs[idx] = [point[0], point[1], 0];
      amps[idx] = [point[0], point[2], 0];
    };
    freq = Env.xyc(freqs).delay(partial.t_start).ar;
    amp = Env.xyc(amps).delay(partial.t_start).ar;
    SinOsc.ar(freq) * amp;
  }).sum;
  sig * Env.linen(0.01, maxdur, 0.01).ar(2);
}.play;
*/

// As a SynthDef. Use store rather than add.
// load writes the def to a file and tells the server to load it
// loading still takes quite a while when partial count is big..
// (385 took about 10s, 2930 about 5mintutes)
// note that load also DOES NOT put the SynthDef inside the SynthDescLib
// Note that playback is also an issue, with 385 partials I had 1545 UGENS
//    per synth instance (15% CPU).
//    With 2930 partials 11725 UGens (CPU @ 80%)! and needed to
//    increase the server's memory allocation
//    s.options.memSize = 524288;
SynthDef(\sound1, {|out=0, amp=1.0, pan=0, freqscale=1.0, freqshift=0, ampscale=1.0, dur=3, timescale=1.0|
  var maxdur=dur, sig;
  sig = f.partials.collect({|partial, idx|
    var freq, freqs = Array.newClear(partial.points.size);
    var amp, amps = Array.newClear(partial.points.size);
    partial.points.do {|point, idx|
      freqs[idx] = [point[0] * timescale, (point[1] * freqscale) + freqshift, 0];
      amps[idx] = [point[0] * timescale, (point[2] * ampscale).min(1.0), 0];
    };
    freq = Env.xyc(freqs).delay(partial.t_start).ar;
    amp = Env.xyc(amps).delay(partial.t_start).ar;
    SinOsc.ar(freq) * amp;
  }).sum;
  sig = sig * Env.linen(0.01, maxdur, 0.01).ar(2) * amp;
  Out.ar(out, Pan2.ar(sig, pan));
}).load();

);

// But then you can make the sound as much as you want.
Synth(\sound1, [\amp, 1.0, \pan, 0.7, \freqscale, 0.1, \ampscale, 10.0, \dur, 1]);

/*
TODO / I AM HERE:
This method uses SC lang to trigger the partials.
It's easier to manage the playback and muting of individual partials..
but it's also less accurate.

Probably the same efficiency improvement could be made (replace Envelopes with buffers)
*/
(
SynthDef(\partial1, {|amp=1.0, out=0, pan=0|
  Out.ar(out, Pan2.ar(SinOsc.ar(EnvGen.ar(\env_freq.ir(Env.linen(level: 440)), 1)) * EnvGen.ar(\env_amp.ir(Env.linen), 1, doneAction: 2), pan, amp));
}).add;
);

(
f.partialsynths = Array.newClear(f.numPartials);
f.clock = SystemClock;
f.partials.do {|partial, idx|
  var env_freq, env_amp;
  f.clock.sched(partial.t_start, {
    f.partialsynths[idx] = Synth(\partial1, [
      \env_freq, env_freq, \env_amp, env_amp ,
      \out, Project.outclean, \amp, 0.01, \pan, 0.0
    ]);
  });
};


sig = f.partials.collect({|partial, idx|
    var freq, freqs = Array.newClear(partial.points.size);
    var amp, amps = Array.newClear(partial.points.size);
    partial.points.do {|point, idx|
      freqs[idx] = [point[0] * timescale, (point[1] * freqscale) + freqshift, 0];
      amps[idx] = [point[0] * timescale, (point[2] * ampscale).min(1.0), 0];
    };
    freq = Env.xyc(freqs).delay(partial.t_start).ar;
    amp = Env.xyc(amps).delay(partial.t_start).ar;
    SinOsc.ar(freq) * amp;
  }).sum;

);



