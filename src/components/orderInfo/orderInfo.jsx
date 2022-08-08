import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const OrderInfo = () => {

    //достаем id заказа из параметра url "/feed/:id"
    const {id} = useParams();

    //забираем заказы из стора
    const {orders} = useSelector(store => ({
        orders: store.feed.data,
    }));


    return (
        <div>

        </div>
    );
};

export default OrderInfo;