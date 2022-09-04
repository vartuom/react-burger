import React from 'react';
import styles from "./feedList.module.css";
import OrderCard from "../orderCard/orderCard";
import ScrollBox from "../scrollBox/scrollBox";
import {TOrder} from "../../types/types";

interface IFeedListProps {
    orders: Array<TOrder>,
    linksTo: string;
    showStatus?: boolean
}

const FeedList = (props: IFeedListProps) => {
    const {orders, linksTo, showStatus} = props;
    return (
        <section className={styles.feedWrapper}>
            <ScrollBox>
                <ul className={styles.list}>
                    {orders.map(order =>
                        <li key={order.number}>
                            <OrderCard order={order} linkTo={linksTo} showStatus={showStatus}/>
                        </li>
                    )}
                </ul>
            </ScrollBox>
        </section>
    );
};

export default FeedList;