node-red-contrib-flightradar24
=====================

Node-RED node to retrieve plane locations from flightradar24 service.

Install
-------
Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-flightradar24

Example
-------
You can plot plane locations on map using [node-red-contrib-web-worldmap](https://flows.nodered.org/node/node-red-contrib-web-worldmap).

![tokyo.gif](tokyo.gif)

Example flow

![flow.png](flow.png)

```
[{"id":"76a1b73b.183d68","type":"inject","z":"ca1e6975.d266c8","name":"","topic":"","payload":"","payloadType":"date","repeat":"1","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":100,"wires":[["16c80c68.7ba644"]]},{"id":"16c80c68.7ba644","type":"flightradar24","z":"ca1e6975.d266c8","lat":"51","latType":"num","lon":"-1.45","lonType":"num","name":"","x":130,"y":180,"wires":[["65d40db8.a06334","47e16a92.ac3384"]]},{"id":"65d40db8.a06334","type":"debug","z":"ca1e6975.d266c8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":310,"y":140,"wires":[]},{"id":"47e16a92.ac3384","type":"worldmap","z":"ca1e6975.d266c8","name":"","lat":"","lon":"","zoom":"","layer":"","cluster":"","maxage":"","usermenu":"show","layers":"show","panit":"false","x":310,"y":220,"wires":[]}]
```
