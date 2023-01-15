import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf';
import './Map.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function Map () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFraW0xOTkyIiwiYSI6ImNrNTJpYzAzeTA4d2kzaHFuMmg1NW83bTIifQ.p4FUmxPOHEpoi_-0N6Y7pA';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(10.7600);
    const [lat, setLat] = useState(34.7398);
    const [zoom, setZoom] = useState(10);

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for regions',
        trackProximity: true
    });
    
    var draw = new MapboxDraw({
        displayControlsDefault: true,
        controls: {
        polygon: true,
        trash: true
        },
        // defaultMode: 'draw_polygon'
        });

    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        var datasetId = "cirqs92m00hu8fgm8piqgihok";
        var geoJsonFeatures;

        const source = {
            "type": "FeatureCollection",
            "features": []
        };

        map.current.addControl(draw, 'top-left');
        map.current.addControl(geocoder);

        function updateArea(e) {
            const data = draw.getAll();
            const answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                const area = turf.area(data);
                const rounded_area = Math.round(area * 100) / 100;
                answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        }

        // function setFeatureId(){
        //     return getData(datasetId);
        // }

        function getData(datasetId) {
            const $ = require( "jquery" );
            $.ajax({
            url : 'https://evening-sierra-80988.herokuapp.com/dataset?datasetId=' + datasetId,
            type : 'GET',
            dataType: 'json'
            })
            .done(function(oldData){
                geoJsonFeatures = oldData;
                source.setData(geoJsonFeatures);
                return geoJsonFeatures;
            });
        }

        function uploadFeatures(){
            const drawnData = draw.getAll();
            for(let i = 0; i < drawnData.features.length; i++){

                var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
                // xmlhttp.open("POST", 'https://evening-sierra-80988.herokuapp.com/dataset');
                xmlhttp.open("POST", 'http://127.0.0.1:80/company/records');
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify({"feature":drawnData.features[i], "datasetId": "cirqs92m00hu8fgm8piqgihok"}));

                xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200 && i === drawnData.features.length) {
                    alert('upload successful!');

                    getData(datasetId);
                } else if (xmlhttp.readyState === 4 && xmlhttp.status !== 200){
                    alert('looks like something went wrong');
                }
            };
            }
        }

        map.current.on('draw.create', updateArea);
        map.current.on('draw.delete', updateArea);
        map.current.on('draw.update', updateArea);

        map.current.on('load', function() {
           
            // map.addSource('my-dataset', source);

            document.getElementById('export').onclick = function(e) {
                // Extract GeoJson from featureGroup
                var data = draw.getAll();

                if (data.features.length > 0) {
                    // Stringify the GeoJson
                    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

                    // Create export
                    document.getElementById('export').setAttribute('href', 'data:' + convertedData);
                    document.getElementById('export').setAttribute('download','data.geojson');    
                } else {
                    alert("Wouldn't you like to draw some data?");
                }
                
            }
            document.getElementById('updateDataset').onclick = function(e) {
                e.preventDefault();
                uploadFeatures();
            }

            getData(datasetId);


        });
        
    })

        return(
            <div>
            <div ref={mapContainer} className="map-container" />
            <div className="calculation-box">
                <p>Click the map to draw a polygon.</p>
                <div id='calculated-area'/>
            </div> 
                <a href='#' id='export'></a>
                <a href="#" id='updateDataset'></a>   
            </div>
        )

}
export default Map;