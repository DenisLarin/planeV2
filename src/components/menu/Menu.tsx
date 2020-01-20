import React from 'react';
import css from './menu.module.css';
import {IStation} from "../../model/Station";


interface IProps {
    stations: IStation[];
    addStation: (station: IStation) => void;
    addedStations: IStation[];
    cost: number;
    setDefault: () => void;
    setWithNew: () => void;
}


const Menu = (props: IProps) => {
    return (
        <div className={css.menu}>
            <h3 className={css.menu__header}>Меню</h3>
            <div className={css.menu__button_container}>
                {props.stations.map(item => {
                    const isDisabled = props.addedStations.filter(obj => item.name === obj.name);

                    isDisabled.length = 0;

                    return <button disabled={isDisabled.length > 0} onClick={() => props.addStation(item)}
                                   className={css.menu__button} key={item.name}>{item.name}</button>
                })}
            </div>
            <div className={css.menu__button_container}>
                <button onClick={props.setDefault} className={css.menu__button}>Пресет 1</button>
                <button onClick={props.setWithNew} className={css.menu__button}>Пресет 2</button>
            </div>

            <h3>Цена: {props.cost}</h3>
        </div>
    );
};

export default Menu;