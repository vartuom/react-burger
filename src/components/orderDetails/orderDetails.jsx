import React, {useEffect} from 'react';
import orderDetailsStyles from "./orderDetails.module.css"
import {useDispatch, useSelector} from "react-redux";
import PlanetLoader from "../planetLoader/planetLoader";
import {setOrderDetailsClosed, setOrderDetailsOpened} from "../../store/orderSlice";

const OrderDetails = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setOrderDetailsOpened());
        return () => {
            dispatch(setOrderDetailsClosed())
        }
    }, [dispatch])

    //следим за стором, пока не пришел номер заказа показываем лоадер
    const {isPending, isFailed, orderNumber} = useSelector(store => ({
        isPending: store.order.isPending,
        isFailed: store.order.isFailed,
        orderNumber: store.order.orderNumber,
    }))

    return isPending ? <PlanetLoader/> : isFailed ? 'Ошибка' : (
        <div className={orderDetailsStyles.container}>
            <h2 className="text text_type_digits-large pt-15">{orderNumber}</h2>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <div className={`${orderDetailsStyles.check} pt-15 pb-15`}></div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2 pb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;