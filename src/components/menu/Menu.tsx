import React from 'react';
import css from './menu.module.css';
import {IStation} from "../../model/Station";


interface IProps {
    stations: IStation[];
    addStation: (station: IStation)=>void;
    addedStations: IStation[];
    cost: number;
}


const Menu = (props: IProps) => {
    return (
        <div className={css.menu}>
            <h3 className={css.menu__header}>Меню</h3>
            <div className={css.menu__button_container}>
                {props.stations.map(item=>{
                    const isDisabled = props.addedStations.filter(obj => item.name === obj.name);
                    return <button disabled={isDisabled.length > 0} onClick={()=>props.addStation(item)} className={css.menu__button} key={item.name}>{item.name}</button>
                })}
            </div>
            <h3>Цена: {props.cost}</h3>
        </div>
    );
};

export default Menu;