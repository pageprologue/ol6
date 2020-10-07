import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';

var projection = getProjection('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(14);
var matrixIds = new Array(14);
for (var z = 0; z < 14; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      opacity: 0.7,
    }),
    new TileLayer({
      opacity: 0.7,
      source: new WMTS({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/' +
          'services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',
        url:
          'https://services.arcgisonline.com/arcgis/rest/' +
          'services/Demographics/USA_Population_Density/MapServer/WMTS/',
        layer: '0',
        matrixSet: 'EPSG:3857',
        format: 'image/png',
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: 'default',
        wrapX: true,
      }),
    }) ],
  target: 'map',
  view: new View({
    center: [-11158582, 4813697],
    zoom: 4,
  }),
});