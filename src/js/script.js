var attr_osm = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
attr_overpass = 'POI via <a href="https://www.overpass-api.de">Overpass API</a>';
var osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: [attr_osm, attr_overpass].join(', ')
});

var southWest = L.latLng(49.2391208, 0.0878906);
var northEast = L.latLng(51.8900539, 6.3500977);
var mapBox = L.latLngBounds(southWest, northEast);

var map;

map = new L.Map("map", {
    zoom: 9,
    center: [50.6146, 3.0652],
    layers: [osm],
    maxBounds: mapBox,
    minZoom: 9
});

L.Routing.control({
    waypoints: [
        L.latLng(50.433, 2.8279),
        L.latLng(50.633333, 3.066667)
    ],
    routeWhileDragging: true,
    router: L.Routing.graphHopper('1d460f42-2220-4fcf-8eff-454cac1ae99f', {
        urlParameters: {
            vehicle: 'bike',
            locale: 'fr',
        }
    }),
    geocoder: L.Control.Geocoder.nominatim(),
    suggest: L.Control.Geocoder.nominatim()
}).addTo(map);
