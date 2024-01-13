const radar = (...args) => import('flightradar24-client').then(({ fetchFromRadar }) => fetchFromRadar(...args));
const geolib = require('geolib');

module.exports = function (RED) {
    function Flightradar24Node(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        function handle(msg) {
            var lat, lon, rad;
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
            if (config.radType === 'num') {
                rad = Number(config.rad);
            } else {
                rad = Number(RED.util.getMessageProperty(msg, config.rad));
            }
            var bounds = geolib.getBoundsOfDistance({ latitude: lat, longitude: lon }, rad * 1000);
            radar(bounds[1].latitude, bounds[0].longitude, bounds[0].latitude, bounds[1].longitude).then(function (data) {
                data.forEach(function (flight) {
                    var m = RED.util.cloneMessage(msg || {});
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
        };

        node.on('input', handle);
        if (config.interval) {
            setInterval(handle, 1000);
        }
    }
    RED.nodes.registerType("flightradar24", Flightradar24Node);
};
