import React, {useEffect} from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link, useHistory, Redirect, useLocation} from "react-router-dom";
import {fetchLogIn} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import PlanetLoader from "../components/planetLoader/planetLoader";

const Login = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const {isAuthPending} = useSelector(store => ({
        isAuthPending: store.user.isAuthPending
    }))

    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)

    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    const {isLoggedIn, user} = useSelector(store => ({
        isLoggedIn: store.user.isLoggedIn,
        user: store.user.user
    }))

    /*if (isLoggedIn) {
        console.log(location);
        return (
            <Redirect
                // Если объект state не является undefined, вернём пользователя назад.
                to={ location.state?.from || '/' }
            />
        );
    }*/

    useEffect(() => {
        if (isLoggedIn) {
            console.log(location);
            // Если объект state не является undefined, вернём пользователя назад.
            history.replace({ pathname: location.state?.from.pathname || '/' })
        }
    }, [isLoggedIn]);

    const onIconClick = () => {
        setTimeout(() => passwordInputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form}>
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
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
                <Button type="primary" size="medium"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(fetchLogIn({
                                email: emailInputValue,
                                password: passwordInputValue,
                            }));
                        }}>
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