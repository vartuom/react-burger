import React, {useEffect} from 'react';
import styles from './profile.module.css'
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchGetUserData} from "../store/userSlice";
import {useDispatch} from "react-redux";

const Profile = () => {

    const dispatch = useDispatch;

    const [nameInputValue, setNameInputValue] = React.useState('')
    const nameInputRef = React.useRef(null)

    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)

    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    const onIconClick = () => {
        setTimeout(() => passwordInputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    /*useEffect(() => {
        dispatch(fetchGetUserData())
    }, [dispatch])*/

    return (
        <section className={styles.formSection}>
            <form className={styles.form}>
                <div>
                    <ul className={styles.navList}>
                        <li className={`${styles.navList_item} text text_type_main-medium text_color_inactive`}>Профиль</li>
                        <li className={`${styles.navList_item} text text_type_main-medium text_color_inactive`}>История заказов</li>
                        <li className={`${styles.navList_item} text text_type_main-medium text_color_inactive`}>Выход</li>
                    </ul>
                    <p className={'text text_type_main-default text_color_inactive pt-20'}>В этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={nameInputValue}
                        onChange={e => setNameInputValue(e.target.value)}
                        icon={'EditIcon'}
                        name={'nameInput'}
                        error={false}
                        ref={nameInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        value={emailInputValue}
                        onChange={e => setEmailInputValue(e.target.value)}
                        icon={'EditIcon'}
                        name={'emailInput'}
                        error={false}
                        ref={emailInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        value={passwordInputValue}
                        onChange={e => setPasswordInputValue(e.target.value)}
                        icon={'EditIcon'}
                        name={'passwordInput'}
                        error={false}
                        ref={passwordInputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
            </form>
        </section>
    );
};

export default Profile;