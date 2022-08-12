import React, {useEffect} from 'react';
import styles from './profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";
import {wsActions} from "../store/feedSlice";
import {getCookie} from "../utils/storage";

const Orders = () => {

    const {isLoggedIn, isAuthPending} = useSelector(store => ({
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    const history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        } else {
            const token = getCookie('accessToken')
            dispatch(wsActions.wsConnectionInit(`wss://norma.nomoreparties.space/orders?token=${token}`))
            return () => {
                dispatch(wsActions.wsConnectionClose())
            }
        }
    }, [history, isLoggedIn, dispatch])


    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form}>
                <div>
                    <ProfileMenu/>
                    <p className={'text text_type_main-default text_color_inactive pt-20'}>
                        В этом разделе вы можете просмотреть свою историю заказов</p>
                </div>
                <fieldset className={styles.fieldset}>

                </fieldset>
            </form>
        </section>
    );
};

export default Orders;