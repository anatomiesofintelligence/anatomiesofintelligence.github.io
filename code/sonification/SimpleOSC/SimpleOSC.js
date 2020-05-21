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
var SimpleOSC = function(host="127.0.0.1", port=8080, postFunc) {
  this.host = host;
  this.port = port;
  this.ws = null;
  this.socketURL = 'ws://'+this.host+":"+this.port+"/interface";
  if(postFunc == null) {
    this.post = console.log;
  } else {
    this.post = postfunc;
  }
  this.post("Testing postfunc...");
  if(!("WebSocket" in window)) {
      alert("Your browser does not support web sockets");
  }
}

// *** INSTANCE METHODS ***
// Connect via websockets to python server
SimpleOSC.prototype.init = function (onConnectFunc) {
  var self = this;

  if(onConnectFunc == null) {
    self.onConnect = function() { self.sendmsg("/browser/status", ["Hello from the browser", 57120, 42.24]) };
  } else {
    self.onConnect = onConnectFunc;
  }

  self.post("Note: if you receive a SecurityError in Firefox you must set 'allowInsecureFromHttps' to true in Firefox settings");
  self.ws = new WebSocket(self.socketURL);
  self.post("Creating WebSocket connection to " + self.socketURL);

  self.ws.onopen = function() {
    self.post('Connection successful!')
    self.post('Protocol:' + self.ws.protocol);
    //conn.binaryType = 'arraybuffer';
    self.onConnect();
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


SimpleOSC.prototype.sendmsg = function(addr, args, verbose=false) {
  var jsonmsg, argsmsg = [];
  if((this.ws != null) && (this.ws.readyState == 1)) { // websocket is connected
  args.forEach(function (item, index) {
    var osctype;
    switch(typeof item) {
      case "string":
        osctype = "s";
        break;
      case "number":
        if(Number.isInteger(item)) { osctype = "i" } else { osctype = "f" };
        break;
      case "object":
        if(item.constructor === "Array") { osctype = "a" } else { osctype="o" };
      default:
        osctype = "b";
    }
    argsmsg.push({type: osctype, value: item})
  });
  jsonmsg = {address: addr, args: argsmsg};
  if(verbose) {
    var str = "Sent OSC Msg to: " + jsonmsg.address;
    var helperfunc = function(args) {
      var first, res = "";
      if(args.length == 0) { return res };
      if((typeof args[0] === "object") && (args[0].constructor === Object)) {
          res = res + "\n\t" + args[0].type + "/" + args[0].value;
          res = res + helperfunc(args.slice(1));
      }
      return res;
    }
    str = str + helperfunc(jsonmsg.args);
    this.post(str);
  }
  this.ws.send(JSON.stringify(jsonmsg));
} else {
  // if websocket is not open, simply ignore message
  if(verbose) {
    this.post("Websocket is not connected, readyState: " + this.ws.readyState);
  }
}
};
