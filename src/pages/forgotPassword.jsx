import React from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link} from "react-router-dom";

const Register = () => {

    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)

    return (
        <section className={styles.formSection}>
            <form className={styles.form}>
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Восстановление пароля</h2>
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
                </fieldset>
                <Button type="primary" size="medium">
                    Восстановить
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