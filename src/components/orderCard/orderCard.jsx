import React from 'react';
import Price from "../price/price";
import styles from './orderCard.module.css'
import {useSelector} from "react-redux";
import {useMemo} from "react";
import ImageStack from "../imageStack/imageStack";

const OrderCard = ({order}) => {

    const {ingredients, name, number, createdAt} = order;

    const {ingredientsArr} = useSelector(store => ({
        ingredientsArr: store.ingredients.data
    }))

    const orderIngredientsArr = [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d4"
    ]

    //извлекаем из стора картинки имеющихся в заказе ингредиентов
    const memoImagesArr = useMemo(() => {
        //если стор еще пустой то возвращаем пустой массив
        if (ingredientsArr.length === 0) {
            return []
        }
        //для каждого id из заказа находим объект ингредиента в сторе, формируем отфильтрованный массив
        const filteredArr = ingredients.map((item) => {
            return ingredientsArr.find((ingredient) => {
                return item === ingredient._id;
            })
        })
        //вытаскиваем из отфильтрованного массива картинки ингредиентов
        //если нет элементов в отфильтрованом массиве, то возвращаем пустой массив
        return filteredArr.length > 0 ? filteredArr.map(item => item?.image) : []
    }, [ingredientsArr]);

    /*
        const memoizedImagesArr = useMemo(() => {
            const filteredArr = ingredientsArr.filter((item) => {
                return orderIngredientsArr.some((ingredient) => {
                    return ingredient === item._id;
                })
            })
            return filteredArr.map(item => item.image)
        }, [ingredientsArr]);
    */


    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
            </div>
            <p className="text text_type_main-medium">{name}</p>
            <div className={styles.info}>
                <ImageStack imagesArr={memoImagesArr}/>
                <Price value={480}/>
            </div>
        </div>
    );
};

export default OrderCard;