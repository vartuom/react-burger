import React from 'react';
import styles from "./feedList.module.css";
import OrderCard from "../orderCard/orderCard";

const FeedList = ({orders}) => {

    return (
        <section className={styles.feedWrapper}>
            <ul className={styles.list}>
                {orders.map(order =>
                    <li key={order.number}>
                        <OrderCard order={order}/>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default FeedList;