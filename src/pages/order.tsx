import React from 'react';
import styles from './order.module.css'
import OrderInfo from "../components/orderInfo/orderInfo";
import PlanetLoader from "../components/planetLoader/planetLoader";
import {useEffect} from "react";
import {wsActions} from "../store/feedSlice";
import {getCookie} from "../utils/storage";
import {wssFeedUrl, wssOrdersUrl} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../services/hooks";

const Order = ({personal = false}) => {

    const dispatch = useAppDispatch();

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
    }, [dispatch, personal])

    //ждем готовности стора прежде чем рисовать компонент с информацией
    const {isIngredientsLoading, isIngredientsFailed, orders, isOrdersFailed} = useAppSelector(store => ({
        isIngredientsLoading: store.ingredients.ingredientsRequest,
        isIngredientsFailed: store.ingredients.ingredientsFailed,
        orders: store.feed.data,
        isOrdersFailed: store.ingredients.ingredientsFailed
    }))
    const isError = isOrdersFailed || isIngredientsFailed;
    const isReady = !isIngredientsLoading && orders.length > 0;

    return isError ? <span>'Ошибка при получении данных с сервера'</span> : !isReady ? <PlanetLoader/> :(
        <div className={styles.wrapper}>
            <OrderInfo/>
        </div>
    );
};

export default Order;