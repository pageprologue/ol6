import 'ol/ol.css';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

var parser = new WMTSCapabilities();

fetch('data/WMTSCapabilities.xml')
.then(function (response) {
    return response.text();
})
.then(function (text) {
    var result = parser.read(text);
    document.getElementById('log').innerText = JSON.stringify(result, null, 2);
});