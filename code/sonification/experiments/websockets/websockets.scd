// Unfortunately SuperCollider does not have access to the sockets layer
// of the OS :-/
OSCdef.trace(false);
OSCdef(\status, {|msg| msg.postln}, "/browser/status");
