// Unfortunately SuperCollider does not have access to the sockets layer
// of the OS :-/    ...so we need an intermediary program...

"osc_websock_interface.py".runInTerminal;

OSCdef(\status, {|msg| msg.postln}, "/browser/status");
OSCdef(\data, {|msg| msg.postln}, "/browser/data");




