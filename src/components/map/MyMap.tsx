import React, {useState} from 'react';
import {YMaps, Map, Placemark, GeoObject, RulerControl} from "react-yandex-maps";
import Menu from "../menu/Menu";
import {IStation} from "../../model/Station";
import Station from "../station/Station";


//alpha 56.23868891512036, 55.33530806249858
//grizly 56.26292907405072, 55.269390093749706
//grizly 55.54724281635937, 63.48716353124965

const MyMap = () => {
    const [defaultStations, setDefaultStations] = useState([
        {
            name: "alpha",
            range: 400,
            blindSpot: 150,
            cost: 100,
            color: "#00FF00"
        },
        {
            name: "romeo",
            range: 400,
            blindSpot: 200,
            cost: 80,
            color: "#ff2d3c"
        },
        {
            name: "home",
            range: 200,
            blindSpot: 100,
            cost: 50,
            color: "#094bff"
        },
        {
            name: "grizzly",
            range: 150,
            blindSpot: 0,
            cost: 40,
            color: "#ff00d8"
        }
        ,
        {
            name: "new",
            range: 300,
            blindSpot: 100,
            cost: 0,
            color: "#0e0e0e"
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
            const st = {...station};
            st.id = String(Math.random());
            temp.push(st);
            setAddedStations(temp);
            setCost(cost + st.cost)
        }
    };
    const setNewPosition = (item: IStation, center: [number, number]) => {
        const temp = [...addedStation];
        temp.map(tempItem => {
            if (item.id === tempItem.id) {
                tempItem.position = center;
                console.group("Координты");
                console.log(item);
                console.log(center);
                console.groupEnd();
            }
        });
        setAddedStations(temp);
    };


    const removeStation = (item: IStation) => {
        const temp = addedStation.filter(obj => {
            if (item.id === obj.id) {
                setCost(cost - obj.cost);
            } else return obj;
        });
        setAddedStations(temp);
    };

    const defaultPreset = () => {
        //alpha 56.23868891512036, 55.33530806249858
        //grizly 56.26292907405072, 55.269390093749706
        //grizly 55.54724281635937, 63.48716353124965

        const alpha = defaultStations[0];
        const romeo = defaultStations[1];
        const home = defaultStations[2];
        const grizzly = defaultStations[3];
        const temp: IStation[] = [];
        let cost = 0;

        //edit
        temp.push({...alpha});
        temp[0].position = [56.23868891512036, 55.33530806249858];
        temp[0].id = String("1");


        temp.push({...grizzly});
        temp[1].position = [56.26292907405072, 55.269390093749706];
        temp[1].id = String("2");

        temp.push({...grizzly});
        temp[2].position = [55.54724281635937, 63.48716353124965];
        temp[2].id = String("3");


        temp.forEach(item=>{
            cost+=item.cost;
        })

        setAddedStations(temp);
        setCost(cost);
    };

    const setWithNew = () => {
        const alpha = defaultStations[0];
        const romeo = defaultStations[1];
        const home = defaultStations[2];
        const grizzly = defaultStations[3];
        const newS = defaultStations[4];
        let cost = 0;


        const temp: IStation[] = [];


        //edit
        temp.push({...newS});
        temp[0].position = [56.23868891512036, 55.33530806249858];
        temp[0].id = String("1");

        temp.push({...grizzly});
        temp[1].position = [56.26292907405072, 55.269390093749706];
        temp[1].id = String("2");

        temp.push({...grizzly});
        temp[2].position = [55.54724281635937, 63.48716353124965];
        temp[2].id = String("3");

        temp.forEach(item=>{
            cost+=item.cost;
        });
        setCost(cost);


        setAddedStations(temp);
    }

    console.log(addedStation);
    return (
        <>
            <Menu setWithNew={setWithNew} cost={cost} stations={defaultStations} setDefault={defaultPreset} addStation={addStation}
                  addedStations={addedStation}/>
            <YMaps>
                <Map defaultState={{center: [mapCenterX, mapCenterY], zoom: 6}} height="100vh" width="100vw">
                    {addedStation.map(item => {
                        return <Station key={item.id}
                                        color={item.color}
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