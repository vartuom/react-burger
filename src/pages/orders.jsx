import React, {useEffect} from 'react';
import styles from './profile.module.css'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";

const Orders = () => {

    const {isLoggedIn, isAuthPending} = useSelector(store => ({
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        }
    }, [history, isLoggedIn])


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