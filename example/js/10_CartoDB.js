import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {CartoDB, OSM} from 'ol/source';

var mapConfig = {
  'layers': [
    {
      'type': 'cartodb',
      'options': {
        'cartocss_version': '2.1.1',
        'cartocss': '#layer { polygon-fill: #F00; }',
        'sql': 'select * from european_countries_e where area > 0',
      },
    } ],
};

var cartoDBSource = new CartoDB({
  account: 'documentation',
  config: mapConfig,
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new TileLayer({
      source: cartoDBSource,
    }) ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function setArea(n) {
  mapConfig.layers[0].options.sql =
    'select * from european_countries_e where area > ' + n;
  cartoDBSource.setConfig(mapConfig);
}

document.getElementById('country-area').addEventListener('change', function () {
  setArea(this.value);
});