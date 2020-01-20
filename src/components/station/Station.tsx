import React from 'react';
import {Polygon, Circle} from "react-yandex-maps";


interface IProps {
    name: string,
    range: number,
    blindSpot: number,
    cost: number,
    position: [number, number];
    getDragPosition: (center: [number,number])=>void;
    removeStation: ()=>void;
    color: string
}


const Station = (props: IProps) => {
    const arrayOfPoints = (center: [number, number], radius: number) => {
        let d2r = Math.PI / 180;
        let r2d = 180 / Math.PI;
        let earthRadius = 6377830.27;

        let points = 1000;

        // find the raidus in lat/lon
        var rlat = (radius / earthRadius) * r2d * 1.8;
        // var rlng = rlat / Math.cos(center[0] * d2r) /3;
        var rlng = (radius / earthRadius) * r2d * 0.99;


        var extp = new Array();
        var start = 0;
        var end = points + 1

        for (var i = start; i < end; i++) {
            var theta = Math.PI * (i / (points / 2));
            let ey = center[0] + (rlng * Math.cos(theta)); // center a + radius x * cos(theta)
            let ex = center[1] + (rlat * Math.sin(theta)); // center b + radius y * sin(theta)
            extp.push([ey, ex]);
        }
        return extp;
    };


    const dragend = (event: any) => {
        const pixelBounds = event.originalEvent.target.geometry.getBounds();
        const center = [pixelBounds[0][0] + (pixelBounds[1][0] - pixelBounds[0][0]) / 2, (pixelBounds[1][1] - pixelBounds[0][1]) / 2 + pixelBounds[0][1]];
        props.getDragPosition([center[0], center[1]]);
    };

    return (
        <>
            <Polygon
                geometry={[
                    arrayOfPoints(props.position, props.range * 1000),
                    arrayOfPoints(props.position, props.blindSpot * 1000),
                ]}
                options={{
                    fillColor: `${props.color}`,
                    strokeColor: '#0000FF',
                    opacity: 0.5,
                    strokeWidth: 5,
                    strokeStyle: 'shortdash',
                    draggable: true,
                    cursor: 'move',
                }}
                onDragend={(event: any) => dragend(event)}
                onClick={props.removeStation}
            />
        </>
    );
};

export default Station;