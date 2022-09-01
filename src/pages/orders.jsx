import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";
import {wsActions} from "../store/feedSlice";
import {getCookie} from "../utils/storage";
import FeedList from "../components/feedList/feedList";
import styles from './orders.module.css'
import {wssOrdersUrl} from "../utils/constants";

const Orders = () => {

    const {isLoggedIn, isAuthPending} = useSelector(store => ({
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    const history = useHistory();
    const dispatch = useDispatch();
    const {orders} = useSelector(store => ({
        orders: store.feed.data,
    }));

    //если пользователь авторизован, устаналиваем соединение с сервером и заполняем хранилище
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        } else {
            const token = getCookie('accessToken')
            dispatch(wsActions.wsConnectionInit(`${wssOrdersUrl}?token=${token}`))
            return () => {
                dispatch(wsActions.wsConnectionClose())
            }
        }
    }, [history, isLoggedIn, dispatch])


    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={'pt-20'}>
                    <ProfileMenu/>
                    <p className={'text text_type_main-default text_color_inactive pt-20'}>
                        В этом разделе вы можете просмотреть свою историю заказов</p>
                </div>
                <FeedList orders={orders} showStatus={true} linksTo={'/profile/orders'}></FeedList>
            </div>
        </section>
    );
};

export default Orders;