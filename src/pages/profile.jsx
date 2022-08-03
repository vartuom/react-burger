import React, {useCallback, useEffect} from 'react';
import styles from './profile.module.css'
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchPathUserData} from "../store/userSlice";
import {useHistory, useLocation} from "react-router-dom";
import PlanetLoader from "../components/planetLoader/planetLoader";
import ProfileMenu from "../components/profileMenu/profileMenu";

const Profile = () => {

    const {userName, userEmail, isLoggedIn, isAuthPending} = useSelector(store => ({
        userName: store.user.user.name,
        userEmail: store.user.user.email,
        isLoggedIn: store.user.isLoggedIn,
        isAuthPending: store.user.isAuthPending
    }))

    useEffect(() => {
        setNameInputValue(userName)
        setEmailInputValue(userEmail)
    }, [userName, userEmail])

    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn) {
            history.replace({pathname: '/login'})
        }
    }, [isLoggedIn])

    const dispatch = useDispatch();
    const location = useLocation();

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

    const resetInputValues = useCallback(() => {
        setNameInputValue(userName)
        setEmailInputValue(userEmail)
        setPasswordInputValue('')
    }, [userName, userEmail])

    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                dispatch(fetchPathUserData({
                    email: emailInputValue,
                    password: passwordInputValue,
                    name: nameInputValue
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
                    <div className={styles.buttonsWrapper}>
                        <Button type="secondary" size="medium" onClick={resetInputValues}>Отмена</Button>
                        <Button type="primary" size="medium">Сохранить</Button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default Profile;