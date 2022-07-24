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
                <h2 className={`${styles.formTitle} text text_type_main-medium`}>Регистрация</h2>
                <fieldset className={styles.fieldset}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        value={''}
                        onChange={e => setValue(e.target.value)}
                        name={'nameInput'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
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
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        value={''}
                        onChange={e => setValue(e.target.value)}
                        icon={'ShowIcon'}
                        name={'passwordInput'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </fieldset>
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                <div className={`${styles.formTips} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы? Войти
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;