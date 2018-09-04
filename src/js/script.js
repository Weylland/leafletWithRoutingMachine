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

var control = L.Routing.control({
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
    geocoder: L.Control.Geocoder.bing('AtwDxrwRVqkTV73gq13SdD0qo7DQFYGRQT-WR0pPb0JS_eVLkKq2okV_MR2qLRlz'),
    suggest: L.Control.Geocoder.bing('AtwDxrwRVqkTV73gq13SdD0qo7DQFYGRQT-WR0pPb0JS_eVLkKq2okV_MR2qLRlz')
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Départ', container),
        destBtn = createButton('Arrivée', container);

    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });
    
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
});


