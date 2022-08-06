import React from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link} from "react-router-dom";
import {fetchRegUser} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";
import PlanetLoader from "../components/planetLoader/planetLoader";

const Register = () => {

    const dispatch = useDispatch();

    const {isAuthPending} = useSelector(store => ({
        isAuthPending: store.user.isAuthPending
    }))

    const [nameInputValue, setNameInputValue] = React.useState('')
    const nameInputRef = React.useRef(null)

    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)

    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection} onSubmit={(e) => {
            e.preventDefault()
            dispatch(fetchRegUser({
                email: emailInputValue,
                password: passwordInputValue,
                username: nameInputValue
            }));
        }}>
            <form className={styles.form}>
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Регистрация</h2>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={nameInputValue}
                        onChange={e => setNameInputValue(e.target.value)}
                        name={'nameInput'}
                        error={false}
                        ref={nameInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
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
                    Зарегистрироваться
                </Button>
                <div className={`${styles.formTips} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? <Link to={{pathname: '/login'}}>Войти</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;