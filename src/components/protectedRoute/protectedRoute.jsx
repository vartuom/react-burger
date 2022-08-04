import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ProtectedRoute({isAnonOnly = false, children, ...rest}) {

    // Если разрешен только неавторизованный доступ, а пользователь авторизован...
    const {isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.user.isLoggedIn
    }));

    if (isAnonOnly && isLoggedIn) {
        // ...то отправляем его на главную
        return <Redirect to="/"/>;
    }

    // Если все ок, то рендерим внутреннее содержимое.
    return <Route
        {...rest}
        // Получим текущий маршрут, с которого произойдёт переадресация
        // для неавторизованного пользователя
        render={({location}) =>
            isLoggedIn || isAnonOnly ? (
                children
            ) : (
                <Redirect
                    // Передадим в пропс to не строку, а объект.
                    to={{
                        // Маршрут, на который произойдёт переадресация
                        pathname: '/login',
                        // В from сохраним текущий маршрут
                        //The state object can be accessed via this.props.location.state in the redirected-to component.
                        state: {from: location}
                    }}
                />
            )
        }
    />;
}