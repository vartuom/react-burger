import React from 'react';
import styles from "./feedList.module.css";
import OrderCard from "../orderCard/orderCard";

const FeedList = () => {
    return (
        <section className={styles.feedWrapper}>
            <div className={styles.list}>
                <OrderCard/>
            </div>
        </section>
    );
};

export default FeedList;