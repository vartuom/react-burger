import React, {useCallback, useEffect} from 'react';
import styles from './profile.module.css'
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchPathUserData} from "../store/userSlice";
import {useHistory, useLocation} from "react-router-dom";
import {fetchLogOut} from "../store/userSlice";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";

const Orders = () => {

    const {userName, userEmail, isLoggedIn, isAuthPending} = useSelector(store => ({
        userName: store.user.user.name,
        userEmail: store.user.user.email,
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        }
    }, [isLoggedIn])


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