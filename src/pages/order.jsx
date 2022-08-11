import React from 'react';
import styles from './order.module.css'
import OrderInfo from "../components/orderInfo/orderInfo";
import {useSelector} from "react-redux";
import PlanetLoader from "../components/planetLoader/planetLoader";

const Order = () => {

    //ждем готовности стора прежде чем рисовать компонент с информацией
    const {isIngredientsLoading, isIngredientsFailed, orders, isOrdersFailed} = useSelector(store => ({
        isIngredientsLoading: store.ingredients.ingredientsRequest,
        isIngredientsFailed: store.ingredients.ingredientsFailed,
        orders: store.feed.data,
        isOrdersFailed: store.ingredients.ingredientsFailed
    }))
    const isError = isOrdersFailed || isIngredientsFailed;
    const isReady = !isIngredientsLoading && orders.length > 0;

    return isError ? 'Ошибка при получении данных с сервера' : !isReady ? <PlanetLoader/> :(
        <div className={styles.wrapper}>
            <OrderInfo/>
        </div>
    );
};

export default Order;