import React from 'react';
import styles from './feed.module.css'
import FeedList from "../components/feedList/feedList";

const Feed = () => {
    return (
        <section className={styles.main}>
            <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>Лента заказов</h1>
            <FeedList/>
            <div>123</div>
        </section>
    );
};

export default Feed;