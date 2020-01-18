import React, {useState} from 'react';
import {YMaps, Map, Placemark, GeoObject} from "react-yandex-maps";
import Station from "../station/Station";

const MyMap = () => {
    const defaultStations = useState([
        {
            name: "alpha",
            range: 400,
            blindSpot: 150,
            coast: 100
        },
        {
            name: "romeo",
            range: 400,
            blindSpot: 200,
            coast: 80
        },
        {
            name: "home",
            range: 200,
            blindSpot: 100,
            coast: 50
        },
        {
            name: "grizzly",
            range: 150,
            blindSpot: 0,
            coast: 40
        }
        ,
        {
            name: "new",
            range: 400,
            blindSpot: 150,
            coast: 0
        },
    ]);
    const [defaultTowns, setDefaultTowns] = useState<Array<Array<number>>>([
        [55.796289, 49.108795],
        [54.735147, 55.958727],
        [58.010450, 56.229434],
        [55.441004, 65.341118]
    ]);


    let maxX = -90;
    let minX = 90;
    let maxY = 0;
    let minY = 180;
    defaultTowns.map(town => {
        if (town[0] > maxX) {
            maxX = town[0]
        }
        if (town[0] < minX) {
            minX = town[0]
        }
        if (town[1] > maxY) {
            maxY = town[1]
        }
        if (town[1] < minY) {
            minY = town[1]
        }
    });
    const mapCenterX = (maxX + minX) / 2;
    const mapCenterY = (maxY + minY) / 2;


    const townLine = [];

    for (let i = 0; i < defaultTowns.length; i++) {
        for (let j = i; j< defaultTowns.length; j++){
            townLine.push(<GeoObject
                geometry={{
                    type: 'LineString',
                    coordinates: [
                        defaultTowns[i],
                        defaultTowns[j],
                    ],
                }}
                key={Math.random().toString()}
                options={{
                    geodesic: true,
                    strokeWidth: 5,
                    strokeColor: '#F008',
                }}
            />)
        }
    };


    return (
        <>
            <div>

            </div>
            <YMaps>
                <Map defaultState={{center: [mapCenterX, mapCenterY], zoom: 6}} height="100vh" width="100vw">
                    <Station name="alpha" range={400} blindSpot={150} coast={100} position={[mapCenterX, mapCenterY]}/>
                    {defaultTowns.map(item => {
                        return <Placemark key={Math.random().toString()} geometry={item}/>
                    })}
                    {townLine}
                </Map>
            </YMaps>
        </>

    );
};

export default MyMap;