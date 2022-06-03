import React from 'react';
import orderDetailsStyles from "./orderDetails.module.css"
import PropTypes from "prop-types";

const OrderDetails = ({orderNumber}) => {
    return (
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

OrderDetails.propTypes = {
    orderNumber: PropTypes.string.isRequired,
};

export default OrderDetails;