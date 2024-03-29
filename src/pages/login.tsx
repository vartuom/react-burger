import React, {useEffect} from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link, useHistory, useLocation} from "react-router-dom";
import {fetchLogIn} from "../store/userSlice";
import PlanetLoader from "../components/planetLoader/planetLoader";
import {useAppDispatch, useAppSelector} from "../services/hooks";
import {IAppLocation} from "../types/types";

const Login = () => {

    const dispatch = useAppDispatch();
    const location = useLocation() as IAppLocation;
    const history = useHistory();

    //пока не пройдет проверка авторизации показываем лоадер
    const {isAuthPending} = useAppSelector(store => ({
        isAuthPending: store.user.isAuthPending
    }))

    //возвращаем авторизованых пользователей назад с роута
    const {isLoggedIn} = useAppSelector(store => ({
        isLoggedIn: store.user.isLoggedIn
    }))
    useEffect(() => {
        if (isLoggedIn) {
            // Если объект state не является undefined, вернём пользователя назад.
            history.replace({pathname: location.state?.from.pathname || '/'})
        }
    }, [history, location, isLoggedIn]);

    //стейты и рефы для работы инпутов
    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)
    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault()
                dispatch(fetchLogIn({
                    email: emailInputValue,
                    password: passwordInputValue,
                }));
            }}>
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Вход</h2>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        value={emailInputValue}
                        onChange={e => setEmailInputValue(e.target.value)}
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
                        icon={'ShowIcon'}
                        name={'passwordInput'}
                        error={false}
                        ref={passwordInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
                <Button type="primary" size="medium">
                    Войти
                </Button>
                <div className={`${styles.formTips} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь? <Link to={{pathname: '/register'}}>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pt-4">
                        Забыли пароль? <Link to={{pathname: '/forgot-password'}}>Восстановить пароль</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Login;