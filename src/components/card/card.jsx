import React from 'react';
import Price from "../price/price";
import cardStyle from "./card.module.css"
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

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

Card.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
    }),
};

export default Card;