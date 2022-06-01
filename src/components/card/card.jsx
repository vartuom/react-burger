import React from 'react';
import Price from "../price/price";
import cardStyle from "./card.module.css"
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropTypes from "../../utils/propTypesConfig";
import PropTypes from "prop-types";

//в action приходит колбэк обработки модального окна
const Card = ({ingredient, action}) => {
    return (
        <li className={cardStyle.card} onClick={() => action(ingredient)}>
            <Counter count={1} size="default" />
            <img className="pl-4 pr-4" src={ingredient.image} alt=""/>
            <Price value={ingredient.price}/>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </li>
    );
};

Card.propTypes = {
    ingredient: ingredientPropTypes,
    action: PropTypes.func
};

export default Card;