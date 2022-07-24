import React from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'

const Register = () => {

    const [value, setValue] = React.useState('value')
    const inputRef = React.useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <section className={styles.formSection}>
            <form className={styles.form}>
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Восстановление пароля</h2>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        value={''}
                        onChange={e => setValue(e.target.value)}
                        name={'emailInput'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
                <div className={`${styles.formTips} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль? Войти
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;