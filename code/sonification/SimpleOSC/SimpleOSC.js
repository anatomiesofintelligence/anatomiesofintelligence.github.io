/*
SIMPLE OSC library

(C) 2019 Jonathan Reus, CC-SA

Allows bare-bones basic communication between the browser and desktop
software via websockets. There are two parts to the communication:
  1. this javascript library
  2. the websockets server (python) that runs on your desktop and converts the websockets messages into OSC

/* USAGE:


collection.entries = {}; // the Catalog contains a dictionary called entries
entry = collection.entries["poetic-rhetoric"]; // entries contains an object for each catalog entry
entry.text;
entry.image;
entry.tags; // is an array of arrays, each is one tag and its weight [tagname, tagweight]

var num_clusters = 5;
var measurement = measures.euclidean; // or another premade function, or one that is created on the fly

collection.cluster(num_clusters, measurement);

*/

// *** OSC class ***
// Constructor
var SimpleOSC = function(host="127.0.0.1", port=8080, postfunc) {
  this.host = host;
  this.port = port;
  this.ws = null;
  this.socketURL = 'ws://'+this.host+":"+this.port+"/interface";
  if(postfunc == null) {
    this.post = console.log;
  } else {
    this.post = postfunc;
  };

  this.post("Testing postfunc...");

  if(!("WebSocket" in window)) {
      alert("Your browser does not support web sockets");
  }
}

// *** INSTANCE METHODS ***
// Connect via websockets to python server
SimpleOSC.prototype.init = function () {
  var self = this;
  self.ws = new WebSocket(self.socketURL);
  self.post("Creating WebSocket connection to " + self.socketURL);

  self.ws.onopen = function() {
    self.post('Connection successful!')
    self.post('Protocol:' + self.ws.protocol);
    //conn.binaryType = 'arraybuffer';
    self.sendmsg("/browser/status", ["Hello from the browser", 57120, 42.24]);
  };

  self.ws.onmessage = function(evt) {
    var str = evt.data; // messages must be valid json
    var msg = JSON.parse(str);
    var it=1;

    // just iterate through the json message
    for (const key of Object.keys(msg)) {
      if(it==1) {
        self.post("received/\t" + key + ": " + msg[key]);
        it=2;
      } else {
        if((it == 2) && (key == "args")) {// iterate through args
          it=3;
          var argstr = "\t\t" + key + ": ";
          msg[key].forEach(function(arg,idx) {
            argstr = argstr + (idx+1) + ":" + arg.type + "'" + arg.value + "' ";
          });
          self.post(argstr);
        } else {
          self.post("\t\t" + key + ": " + msg[key]);
        }
      }
    }
    if(it==1) { self.post("received/\t" + "EMPTY") }
  };

  self.ws.onclose = function() {
    self.post("Connection closed...");
  };
};


SimpleOSC.prototype.sendmsg = function(addr, args) {
  var jsonmsg, argsmsg = [];
  args.forEach(function (item, index) {
    var osctype;
    switch(typeof item) {
      case "string":
        osctype = "s";
        break;
      case "number":
        if(Number.isInteger(item)) { osctype = "i" } { osctype = "f" };
        break;
      default:
        osctype = "b";
    }
    argsmsg.push({type: osctype, value: item})
  });
  jsonmsg = {address: addr, args: argsmsg};
  this.post("Sending: " + jsonmsg);
  this.ws.send(JSON.stringify(jsonmsg));
};
