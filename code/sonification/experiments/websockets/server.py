# A simple python websocket server
# using tornado, a socket server module for python

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

    def check_origin(self, origin):
        allowed = ["http://localhost", "http://127.0.0.1", "https://anatomiesofintelligence.github.io", "null", "file://"];
        if origin in allowed:
            print("MSG ALLOWED, from origin", origin)
            return 1
        else:
            print("MSG DENIED, from origin", origin)
            return 0

    def open(self):
        print('connection opened...')
        if WSHandler.osc_client is None:
            WSHandler.osc_client = udp_client.SimpleUDPClient(WSHandler.server_out[0], WSHandler.server_out[1])
            print('created UDP connection to', WSHandler.server_out)
        osc_client = WSHandler.osc_client

        # OSC-like format
        # JSON: {address: oscaddr, args: [{type:type, value:val},...]}
        self.write_message(
            {"address": "/server/status",
            "args": [
                {
                    "type": "s",
                    "value": "Hello from server. Handshakes!"
                }
            ]})
        osc_client.send_message("/browser/status", "Connection to Browser Successful")

    def on_message(self, message):
        parsed = json.loads(message)
        address = parsed['address'];
        args = parsed['args'];
        echoargsmsg = [{"type": "s", "value": address}]
        oscargs = []
        for item in args:
            echoargsmsg.append(item)
            oscargs.append(item['value'])

        echo = {"address": "/server/echo", "args": echoargsmsg}
        self.write_message(json.dumps(echo))
        print('received:', parsed)
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
    clargs = parser.parse_args()
    WSHandler.server_out = [clargs.ip, clargs.port]

    app = make_app();
    app.listen(8080)
    print("Listening for websockets messages on port 8080.... ");
    tornado.ioloop.IOLoop.instance().start()
