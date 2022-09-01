import React from 'react';
import styles from './order.module.css'
import OrderInfo from "../components/orderInfo/orderInfo";
import {useDispatch, useSelector} from "react-redux";
import PlanetLoader from "../components/planetLoader/planetLoader";
import {useEffect} from "react";
import {wsActions} from "../store/feedSlice";
import {getCookie} from "../utils/storage";
import {wssFeedUrl, wssOrdersUrl} from "../utils/constants";

const Order = ({personal = false}) => {

    const dispatch = useDispatch();

    //устаналиваем соединение
    useEffect(() => {
        //если нужен заказ из персональной ленты, то отправляем токен
        if (personal) {
            const token = getCookie('accessToken')
            dispatch(wsActions.wsConnectionInit(`${wssOrdersUrl}?token=${token}`))
        } else {
            dispatch(wsActions.wsConnectionInit(wssFeedUrl))
        }

        return () => {
            dispatch(wsActions.wsConnectionClose())
        }
    }, [dispatch])

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