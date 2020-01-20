import React, {useState} from 'react';
import {YMaps, Map, Placemark, GeoObject, RulerControl} from "react-yandex-maps";
import Menu from "../menu/Menu";
import {IStation} from "../../model/Station";
import Station from "../station/Station";

const MyMap = () => {
    const [defaultStations, setDefaultStations] = useState([
        {
            name: "alpha",
            range: 400,
            blindSpot: 150,
            cost: 100
        },
        {
            name: "romeo",
            range: 400,
            blindSpot: 200,
            cost: 80
        },
        {
            name: "home",
            range: 200,
            blindSpot: 100,
            cost: 50
        },
        {
            name: "grizzly",
            range: 150,
            blindSpot: 0,
            cost: 40
        }
        ,
        {
            name: "new",
            range: 400,
            blindSpot: 150,
            cost: 0
        },
    ]);
    const [defaultTowns, setDefaultTowns] = useState<Array<Array<number>>>([
        [55.796289, 49.108795],
        [54.735147, 55.958727],
        [58.010450, 56.229434],
        [55.441004, 65.341118]
    ]);
    const [addedStation, setAddedStations] = useState<IStation[]>([]);
    const [cost, setCost] = useState<number>(0);


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
        for (let j = i; j < defaultTowns.length; j++) {
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
    }

    const addStation = (station: IStation) => {
        if (station.name === 'new') {
            const cost = prompt("cost of new station");
            station.cost = Number(cost);
        }
        if (station.name) {
            const temp = [...addedStation];
            temp.push(station);
            setAddedStations(temp);
            setCost(cost + station.cost)
        }
    };
    const setNewPosition = (item: IStation, center: [number, number]) => {
        const temp = [...addedStation];
        temp.map(tempItem => {
            if (item.name === tempItem.name) {
                tempItem.position = center;
            }
        });
        setAddedStations(temp);
    };


    const removeStation = (item: IStation) => {
        const temp = addedStation.filter(obj=>{
            if (item.name === obj.name){
                setCost(cost - obj.cost);
            }
            else return obj;
        });
        setAddedStations(temp);
    };

    return (
        <>
            <Menu cost={cost} stations={defaultStations} addStation={addStation} addedStations={addedStation}/>
            <YMaps>
                <Map defaultState={{center: [mapCenterX, mapCenterY], zoom: 6}} height="100vh" width="100vw">
                    {addedStation.map(item => {
                        return <Station key={item.name}
                                        getDragPosition={(center: [number, number]) => setNewPosition(item, center)}
                                        name={item.name} range={item.range}
                                        blindSpot={item.blindSpot} cost={item.cost}
                                        position={item.position?.length! > 0 ? [item.position![0], item.position![1]] : [mapCenterX, mapCenterY]}
                                        removeStation={() => removeStation(item)}/>
                    })};
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