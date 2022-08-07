import React from 'react';
import styles from "./feedList.module.css";
import OrderCard from "../orderCard/orderCard";
import {useSelector} from "react-redux";

const FeedList = () => {

    const {orders} = useSelector(store => ({
        orders: store.feed.data
    }));

    return (
        <section className={styles.feedWrapper}>
            <div className={styles.list}>
                {orders.map(order => <OrderCard order={order}/>)}
            </div>
        </section>
    );
};

export default FeedList;