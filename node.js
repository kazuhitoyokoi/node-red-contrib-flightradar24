// Used the code on https://github.com/UnclePhil/node-red-contrib-fr24tube/blob/815d0d138970d4e76768b8cb53bfb8c091e4e4ae/node.js#L1
const radar = (...args) => import('flightradar24-client').then(({ fetchFromRadar }) => fetchFromRadar(...args));

module.exports = function (RED) {
    function Flightradar24Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            var lat, lon;
            if (config.latType === 'num') {
                lat = Number(config.lat);
            } else {
                lat = Number(RED.util.getMessageProperty(msg, config.lat));
            }
            if (config.lonType === 'num') {
                lon = Number(config.lon);
            } else {
                lon = Number(RED.util.getMessageProperty(msg, config.lon));
            }

            var radius = 100000;
            radar(lat + 1, lon - 1, lat - 1, lon + 1).then(function (data) {
                data.forEach(function (flight) {
                    var m = RED.util.cloneMessage(msg);
                    m.payload = flight;
                    m.payload.lat = flight.latitude;
                    delete m.payload.latitude;
                    m.payload.lon = flight.longitude;
                    delete m.payload.longitude;
                    m.payload.name = flight.callsign || flight.registration || flight.modeSCode;
                    m.payload.icon = "plane";
                    m.payload.iconColor = "#F9DF39";
                    m.payload.layer = "FlightRadar24";
                    node.send(m);
                });
            }).catch(function (error) {
                node.error(error, msg);
            });
        });
    }
    RED.nodes.registerType("flightradar24", Flightradar24Node);
};
