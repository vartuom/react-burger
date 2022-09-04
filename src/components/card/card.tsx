import React, {useMemo} from 'react';
import Price from "../price/price";
import cardStyle from "./card.module.css"
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../types/types";
import {useAppSelector} from "../../services/hooks";


//в action приходит колбэк обработки модального окна
const Card = (props: {ingredient: TIngredient}) => {
    const {ingredient} = props;

    //подключаем стейт, что бы потом в линке закинуть туда урл главной страницы
    // для рендера главной страницы под модальным окном
    const location = useLocation();

    //обработка перетаскивания
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {ingredient}
    })

    //следим за изменением списка ингредиентов в конструкторе
    const {bun, mains} = useAppSelector(store => ({
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
    }, [bun, mains, ingredient])

    return (
        <Link className={cardStyle.link} to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location}}}>
            <li draggable ref={dragRef} className={cardStyle.card}>
                <Counter count={calcCount} size="default"/>
                <img className="pl-4 pr-4" src={ingredient.image} alt=""/>
                <Price value={ingredient.price}/>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </li>
        </Link>
    );
};

export default Card;