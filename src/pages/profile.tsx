import React, {useCallback, useEffect, useState} from 'react';
import styles from './profile.module.css'
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchPatchUserData} from "../store/userSlice";
import {useHistory} from "react-router-dom";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";
import {useAppDispatch, useAppSelector} from "../services/hooks";

const Profile = () => {

    const {userName, userEmail, isLoggedIn, isAuthPending} = useAppSelector(store => ({
        userName: store.user.user.name,
        userEmail: store.user.user.email,
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    //возвращаем авторизованых пользователей
    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        }
    }, [history, isLoggedIn])

    //подставляем в инпуты данные пользователя из стора
    useEffect(() => {
        setNameInputValue(userName)
        setEmailInputValue(userEmail)
        setChanged(false);
    }, [userName, userEmail])

    //рефы и стейты для работы инпутов
    const [nameInputValue, setNameInputValue] = React.useState('')
    const nameInputRef = React.useRef(null)
    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)
    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    //управляем отображением кнопок редактирования профиля
    const [isChanged, setChanged] = useState(false);
    useEffect(() => {
        if(userName === nameInputValue && userEmail === emailInputValue && passwordInputValue === '') {
            setChanged(false);
        } else {
            setChanged(true)
        }
    }, [nameInputValue, emailInputValue, userName, userEmail, passwordInputValue])

    const dispatch = useAppDispatch();

    //при клике на "Отмена" возвращаем в инпуты данные из стора
    const resetInputValues = useCallback(() => {
        setNameInputValue(userName)
        setEmailInputValue(userEmail)
        setPasswordInputValue('')
    }, [userName, userEmail])

    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                dispatch(fetchPatchUserData({
                    email: emailInputValue,
                    password: passwordInputValue,
                    username: nameInputValue
                }))
            }}>
                <div>
                    <ProfileMenu/>
                    <p className={'text text_type_main-default text_color_inactive pt-20'}>В этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={nameInputValue}
                        onChange={e => {
                            setNameInputValue(e.target.value);
                        }}
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
                        onChange={e => {
                            setEmailInputValue(e.target.value);
                        }}
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
                        onChange={e => {
                            setPasswordInputValue(e.target.value);
                        }}
                        icon={'EditIcon'}
                        name={'passwordInput'}
                        error={false}
                        ref={passwordInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    {isChanged && <div className={styles.buttonsWrapper}>
                        <Button type="secondary" size="medium" onClick={resetInputValues}>Отмена</Button>
                        <Button type="primary" size="medium">Сохранить</Button>
                    </div>}
                </fieldset>
            </form>
        </section>
    );
};

export default Profile;