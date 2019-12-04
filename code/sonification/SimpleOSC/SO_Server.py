# A simple python websocket server for communication with the SimpleOSC.js library.
# using tornado, a socket server module for python
# translates OSC messages packaged in JSON and sent over websockets into plain old OSC

import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.template
import json
from pythonosc import udp_client
import argparse

# A clunky JSON to OSC mapping is done here
# for more sophisticated OSC see Colin Clark's osc.js library
#  https://github.com/colinbdclark/osc.js/
class WSHandler(tornado.websocket.WebSocketHandler):
    osc_client = None
    server_out = ["127.0.0.1", 57120]
    allowed_origins = ["http://localhost", "http://localhost:4000", "http://127.0.0.1", "http://127.0.0.1:4000", "null", "file://"];
    echo = False

    def check_origin(self, origin):
        if origin in WSHandler.allowed_origins:
            print("MSG ALLOWED, from origin", origin)
            return 1
        else:
            print("MSG DENIED, from origin", origin)
            return 0

    def open(self):
        print('Connection opened...')
        if WSHandler.osc_client is None:
            WSHandler.osc_client = udp_client.SimpleUDPClient(WSHandler.server_out[0], WSHandler.server_out[1])
            print('created UDP/OSC connection to', WSHandler.server_out)

        osc_client = WSHandler.osc_client
        print('sending test message...')
        osc_client.send_message("/browser/status", "testing")

        # OSC-like format
        # JSON: {address: oscaddr, args: [{type:type, value:val},...]}
        self.write_message(
            {"address": "/server/status",
            "args": [
                {
                    "type": "s",
                    "value": "SimpleOSC Server says hello! Handshakes..."
                }
            ]})
        osc_client.send_message("/browser/status", "Connection to Browser Successful")
        print("Sent message /browser/status")

    def on_message(self, message):
        parsed = json.loads(message)
        address = parsed['address'];
        args = parsed['args'];
        echoargsmsg = [{"type": "s", "value": address}]
        oscargs = []
        for item in args:
            echoargsmsg.append(item)
            val = item['value']
            if type(val) == list:
                val = ','.join(str(x) for x in val)
            oscargs.append(val)


        if WSHandler.echo:
            echo = {"address": "/server/echo", "args": echoargsmsg}
            self.write_message(json.dumps(echo))

        print('received:', parsed)
        print('args are: ', type(parsed['args']))
        WSHandler.osc_client.send_message(address, oscargs)


    def on_close(self):
        print( 'connection closed...')



def make_app():
    return tornado.web.Application([
        (r"/interface", WSHandler)
    ])

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-ip", default="127.0.0.1", help="The server to send OSC to")
    parser.add_argument("-port", type=int, default=57120, help="The port to send OSC to")
    parser.add_argument("-origin", default="https://anatomiesofintelligence.github.io", help="Allowed client URL")
    parser.add_argument("-echo", type=bool, default=False, help="Enable server echo")
    clargs = parser.parse_args()
    WSHandler.server_out = [clargs.ip, clargs.port]
    WSHandler.allowed_origins.append(clargs.origin)
    WSHandler.echo = clargs.echo;

    app = make_app();
    app.listen(8080)
    print("Listening for websockets messages on port 8080.... ");
    print("Sending OSC to ", WSHandler.server_out);
    tornado.ioloop.IOLoop.instance().start()
