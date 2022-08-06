import React from 'react';
import {fetchLogOut} from "../../store/userSlice";
import styles from "./profileMenu.module.css"
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

const ProfileMenu = () => {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <ul className={styles.navList}>
            <li className={`${styles.navList_item} ${styles.fakeButton}
                        ${location.pathname === '/profile' ? 'text text_type_main-medium'
                : 'text text_type_main-medium text_color_inactive'}`} onClick={() => {
                history.push('/profile')
            }}>
                Профиль
            </li>
            <li className={`${styles.navList_item} ${styles.fakeButton}
                        ${location.pathname === '/profile/orders' ? 'text text_type_main-medium'
                : 'text text_type_main-medium text_color_inactive'}`} onClick={() => {
                history.push('/profile/orders')
            }}>
                История заказов
            </li>
            <li onClick={() => dispatch(fetchLogOut())}
                className={`${styles.navList_item} ${styles.fakeButton}
                        text text_type_main-medium text_color_inactive`}>
                Выход
            </li>
        </ul>
    );
};

export default ProfileMenu;