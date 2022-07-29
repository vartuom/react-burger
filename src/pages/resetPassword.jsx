import React from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link, useHistory} from "react-router-dom";
import {resetUsrPassword} from "../utils/api";

const Register = () => {

    const history = useHistory();

    const [passwordInputValue, setPasswordInputValue] = React.useState('')
    const passwordInputRef = React.useRef(null)

    const [codeInputValue, setCodeInputValue] = React.useState('')
    const codeInputRef = React.useRef(null)

    const onIconClick = () => {
        setTimeout(() => passwordInputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <section className={styles.formSection}>
            <form className={styles.form}>
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Восстановление пароля</h2>
                <fieldset className={styles.fieldset}>
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
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        value={codeInputValue}
                        onChange={e => setCodeInputValue(e.target.value)}
                        name={'nameInput'}
                        error={false}
                        ref={codeInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
                <Button type="primary" size="medium" onClick={(e) => {
                    e.preventDefault();
                    resetUsrPassword(passwordInputValue, codeInputValue)
                        .then(history.replace({ pathname: '/login' }))
                        .catch((err) => console.log(err));
                }}>
                    Сохранить
                </Button>
                <div className={`${styles.formTips} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль? <Link to={{pathname: '/login'}}>Войти</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;