import React from 'react';
import Price from "../price/price";
import styles from './orderCard.module.css'
import {useSelector} from "react-redux";
import {useMemo} from "react";
import ImageStack from "../imageStack/imageStack";
import {v4 as uuidv4} from 'uuid';
import {Link, useLocation} from "react-router-dom";
import dayjs from "dayjs";
import 'dayjs/locale/ru'
import {TOrder} from "../../types/types";
import {useAppSelector} from "../../services/hooks";

interface IOrderCardProps {
    order: TOrder,
    showStatus?: boolean,
    linkTo: string
}

const OrderCard = (props: IOrderCardProps) => {

    const {order, showStatus, linkTo} = props;
    const location = useLocation();

    const {ingredients, name, number, createdAt} = order;

    const {ingredientsArr} = useAppSelector(store => ({
        ingredientsArr: store.ingredients.data
    }))

    //для каждого id ингредиента из заказа находим объект ингредиента в сторе,
    // формируем массив с данными об ингредиентах
    const filteredArr = useMemo(() => {
        //если стор еще пустой то возвращаем пустой массив
        if (!ingredientsArr) {
            return []
        }
        const filteredArr = ingredients.map((item) => {
            return ingredientsArr.find((ingredient) => {
                return item === ingredient._id;
            })
        })
        //добавляем каждому ингредиенту свой id
        return filteredArr.map(item => {
            return {...item, uuid: uuidv4()}
        })
    }, [ingredientsArr])

    //считаем цену бургера
    const memoPrice = useMemo(() => {
        return filteredArr.length > 0 ? filteredArr.reduce((prevVal, item) => item.price ? prevVal + item.price : prevVal, 0) : 0
    }, [filteredArr]);

    //извлекаем из стора картинки имеющихся в заказе ингредиентов
    const memoImagesArr = useMemo(() => {
        //вытаскиваем из отфильтрованного массива картинки ингредиентов
        //если нет элементов в отфильтрованом массиве, то возвращаем пустой массив
        return filteredArr.length > 0 ? filteredArr.map(item => {
            return {url: item.image as string, id: item.uuid as string}
        }) : []
    }, [filteredArr]);

    return (
        <Link className={styles.link}
              to={{pathname: `${linkTo}/${order._id}`, state: {background: location}}}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        {dayjs(createdAt).locale('ru').format('DD MMM YYYY, HH:mm')}
                    </p>
                </div>
                <p className="text text_type_main-medium">{name}</p>
                {
                    showStatus && (order.status === 'done' ? <p className="text text_type_main-default text_color_success">Выполнен</p>
                        : order.status === 'pending' ? <p className="text text_type_main-default">Готовится</p>
                            : <p className="text text_type_main-default">В очереди</p>)
                }
                <div className={styles.info}>
                    <ImageStack imagesArr={memoImagesArr}/>
                    <Price value={memoPrice ? memoPrice : 0}/>
                </div>
            </div>
        </Link>
    );
};

export default OrderCard;