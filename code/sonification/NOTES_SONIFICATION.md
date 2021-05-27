# Useful References & notes on Sonification of Algorithmic Processes in the browser

## Node.js resources
* [node.js terminal commands](https://blog.risingstack.com/terminal-guide-for-nodejs/)

## Websockets resources
* [basic introduction to Websockets](https://www.html5rocks.com/en/tutorials/websockets/basics/)
* [making a websocket server in python](https://www.toptal.com/tornado/simple-python-websocket-server)
* [python-osc for python3](https://pypi.org/project/python-osc/)
* [mixed content security problems with websockets](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content)
  * Connecting to localhost works fine on Chrome, but on Firefox not so much, see:
  * [firefox websocket security issue](https://github.com/SignalR/SignalR/issues/2276)
  * [allow ws:// from https:// sites](https://stackoverflow.com/questions/13627516/ie10-websocket-allowinsecurefromhttps)
  * The solution is: either use chrome, or set allowInsecureFromHttps to true in Firefox settings. Going to firefox's about:config and toggling network.websocket.allowInsecureFromHTTPS will get rid of the SecurityError. 

## OSC communication from the browser

* [osc.js by Colin Clark](https://github.com/colinbdclark/osc.js/) - works in browser or Node.js
* [interface.js by at CCRMA](https://ccrma.stanford.edu/~mborins/interface.js/)
  * [on github](https://github.com/Old-Stuff/node-socket-accelerometer-fun)
  * [interface.js livecoding in SC](https://vimeo.com/61315008)
* [a modern python3 osc module](https://github.com/attwad/python-osc)

## sonification in the browser
