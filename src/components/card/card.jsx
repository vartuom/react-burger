import React from 'react';
import Price from "../price/price";
import cardStyle from "./card.module.css"
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ingredient}) => {
    return (
        <li className={cardStyle.card}>
            <Counter count={1} size="default" />
            <img className="pl-4 pr-4" src={ingredient.image}/>
            <Price value={ingredient.price}/>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </li>
    );
};

export default Card;