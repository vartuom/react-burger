import React from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './pages.module.css'
import {Link, useHistory} from "react-router-dom";
import {requestPasswordReset} from "../utils/api";
import PlanetLoader from "../components/planetLoader/planetLoader";
import {useAppSelector} from "../services/hooks";

const Register = () => {

    //стейт и реф для работы компонента инпута
    const [emailInputValue, setEmailInputValue] = React.useState('')
    const emailInputRef = React.useRef(null)

    const history = useHistory();

    //пока не пройдет проверка авторизации показываем лоадер
    const {isAuthPending} = useAppSelector(store => ({
        isAuthPending: store.user.isAuthPending
    }))

    //если все ОК, то закидываем в стейт локации "isForgotPageVisited: true"
    // что бы разрешить переход на восстановление пароля
    return isAuthPending ? <PlanetLoader/> : (
        <section className={styles.formSection}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                emailInputValue && requestPasswordReset(emailInputValue)
                    .then(history.push({pathname: '/reset-password', state: {isForgotPageVisited: true}}) as undefined)
                    .catch((err) => console.log(err));
            }}>
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