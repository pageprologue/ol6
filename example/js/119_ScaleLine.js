import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {ScaleLine, defaults as defaultControls} from 'ol/control';

var unitsSelect = document.getElementById('units');
var typeSelect = document.getElementById('type');
var stepsSelect = document.getElementById('steps');
var scaleTextCheckbox = document.getElementById('showScaleText');
var showScaleTextDiv = document.getElementById('showScaleTextDiv');

var scaleType = 'scaleline';
var scaleBarSteps = 4;
var scaleBarText = true;
var control;

function scaleControl() {
  if (scaleType === 'scaleline') {
    control = new ScaleLine({
      units: unitsSelect.value,
    });
    return control;
  }
  control = new ScaleLine({
    units: unitsSelect.value,
    bar: true,
    steps: scaleBarSteps,
    text: scaleBarText,
    minWidth: 140,
  });
  return control;
}
var map = new Map({
  controls: defaultControls().extend([scaleControl()]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }) ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function onChange() {
  control.setUnits(unitsSelect.value);
}
function onChangeType() {
  scaleType = typeSelect.value;
  if (typeSelect.value === 'scalebar') {
    stepsSelect.style.display = 'inline';
    showScaleTextDiv.style.display = 'inline';
    map.removeControl(control);
    map.addControl(scaleControl());
  } else {
    stepsSelect.style.display = 'none';
    showScaleTextDiv.style.display = 'none';
    map.removeControl(control);
    map.addControl(scaleControl());
  }
}
function onChangeSteps() {
  scaleBarSteps = parseInt(stepsSelect.value, 10);
  map.removeControl(control);
  map.addControl(scaleControl());
}
function onChangeScaleText() {
  scaleBarText = scaleTextCheckbox.checked;
  map.removeControl(control);
  map.addControl(scaleControl());
}
unitsSelect.addEventListener('change', onChange);
typeSelect.addEventListener('change', onChangeType);
stepsSelect.addEventListener('change', onChangeSteps);
scaleTextCheckbox.addEventListener('change', onChangeScaleText);