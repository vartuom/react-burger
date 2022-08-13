import React, {useMemo} from 'react';
import styles from './feedInfo.module.css'

const FeedInfo = ({orders, total, totalToday}) => {

    //достаем первые 15 готовых заказов...
    const readyOrders = useMemo(() => {
        return orders.filter((order) => {
            return order.status === 'done';
        }).slice(0, 30)
    }, [orders])

    //...тоже самое для не готовых
    const pendingOrders = useMemo(() => {
        return orders.filter((order) => {
            return order.status !== 'done';
        }).slice(0, 30)
    }, [orders])

    return (
        <div className={styles.feedInfo}>
            <div className={styles.ordersFlow}>
                <div>
                    <p className="text text_type_main-medium pb-6">Готовы:</p>
                    <ul className={styles.flowList}>
                        {readyOrders.map(order => {
                            return <li className="text text_type_digits-default text_color_success" key={order.number}>
                                {order.number}
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    <p className="text text_type_main-medium pb-6">В работе:</p>
                    <ul className={styles.flowList}>
                        {pendingOrders.map(order => {
                            return <li className="text text_type_digits-default" key={order.number}>
                                {order.number}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`text text_type_digits-large ${styles.glow}`}>{total}</p>
            </div>
            <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large ${styles.glow}`}>{totalToday}</p>
            </div>

        </div>
    );
};

export default FeedInfo;