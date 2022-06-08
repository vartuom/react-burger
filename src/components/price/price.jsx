import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import priceStyle from "./price.module.css";
import PropTypes from "prop-types";

const Price = (props) => {
    return (
        <div className={priceStyle.price}>
            {props.isLarge ? (<p className="text text_type_digits-medium mr-2">{props.value}</p>)
                : (<p className="text text_type_digits-default mr-2">{props.value}</p>)}
            <CurrencyIcon type="primary" />
        </div>
    );
};

Price.propTypes = {
    value: PropTypes.number.isRequired,
    isLarge: PropTypes.bool
};

export default Price;