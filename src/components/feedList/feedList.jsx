import React from 'react';
import styles from "./feedList.module.css";
import OrderCard from "../orderCard/orderCard";
import ScrollBox from "../scrollBox/scrollBox";

const FeedList = ({orders}) => {

    return (
        <section className={styles.feedWrapper}>
            <ScrollBox>
                <ul className={styles.list}>
                    {orders.map(order =>
                        <li key={order.number}>
                            <OrderCard order={order}/>
                        </li>
                    )}
                </ul>
            </ScrollBox>
        </section>
    );
};

export default FeedList;