import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {DragRotateAndZoom, defaults as defaultInteractions} from 'ol/interaction';
import {OverviewMap, defaults as defaultControls} from 'ol/Control';

var rotateWithView = document.getElementById('rotateWithView');

var key = 'My Key';
var overviewMapControl = new OverviewMap({
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [
        new TileLayer({
            source: new OSM({
                'url':'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + key,
            })
        })
    ],
    collapseLabel: '\u00BB',
    label: '\u00AB',
    collapsed: false
})

rotateWithView.addEventListener('change', function() {
    overviewMapControl.setRotateWithView(this.checked);
});

var map = new Map({
    controls: defaultControls().extend([overviewMapControl]),
    interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    target: 'map',
    view: new View({
        center: [500000, 6000000],
        zoom: 7
    })
})