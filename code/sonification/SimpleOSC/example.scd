// Unfortunately SuperCollider does not have access to the sockets layer
// of the OS :-/    ...so we need an intermediary program...

// Run SO_Server
"python %".format("SO_Server.py".resolveRelative).runInTerminal;


(
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\browser, {|msg|
  var freq = msg[1], mod = msg[2], dur = msg[3];

  {
    PMOsc.ar(freq, mod, 1.0, 8) * Env.perc(0.01, dur).ar(2);
  }.play;

}, "/browser");
);



