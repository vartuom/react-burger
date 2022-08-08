import React from 'react';
import styles from './feed.module.css'
import FeedList from "../components/feedList/feedList";
import FeedInfo from "../components/feedInfo/feedInfo";
import {useSelector} from "react-redux";

const Feed = () => {

    const {orders, total, totalToday} = useSelector(store => ({
        orders: store.feed.data,
        total: store.feed.total,
        totalToday: store.feed.totalToday
    }));

    return (
        <section className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>Лента заказов</h1>
            <FeedList orders={orders}/>
            <FeedInfo orders={orders} total={total} totalToday={totalToday}/>
        </section>
    );
};

export default Feed;