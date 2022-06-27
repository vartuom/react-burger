import React, {useEffect, useMemo} from 'react';
import Price from "../price/price";
import cardStyle from "./card.module.css"
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropTypes from "../../utils/propTypesConfig";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import {useSelector} from "react-redux";

//в action приходит колбэк обработки модального окна
const Card = ({ingredient, action}) => {

    //обработка перетаскивания
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { ingredient }
    })

    //следим за изменением списка ингредиентов в конструкторе
    const {bun, mains} = useSelector(store => ({
        bun: store.burgerConstructor.bun,
        mains: store.burgerConstructor.mains
    }))

    //вычисляем количество ингредиентов с текущим _id в конструкторе
    const calcCount = useMemo(() => {
        //разворачиваем содрежимое конструктора в общий массив
        const ingredients = [...mains, bun, bun];
        return ingredients.reduce((counter, slice) => {
            if (slice._id === ingredient._id) {
                counter++
            }
            return counter
        }, 0)
    }, [bun, mains])

    return (
        <li draggable ref={dragRef} className={cardStyle.card} onClick={() => action(ingredient)}>
            <Counter count={calcCount} size="default" />
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