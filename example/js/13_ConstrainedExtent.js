import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import ZoomSlider from 'ol/control/ZoomSlider';
import {defaults as defaultControls} from 'ol/control';

var view = new View({
  center: [328627.563458, 5921296.662223],
  zoom: 8,
  extent: [-572513.341856, 5211017.966314, 916327.095083, 6636950.728974],
  constrainOnlyCenter: true,
});

new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }) ],
  keyboardEventTarget: document,
  target: 'map',
  view: view,
  controls: defaultControls().extend([new ZoomSlider()]),
});