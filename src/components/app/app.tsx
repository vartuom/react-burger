import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import {useEffect} from "react";
import {fetchIngredients} from "../../store/ingredientsSlice";
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgotPassword";
import ResetPassword from "../../pages/resetPassword";
import Main from "../../pages/main";
import Profile from "../../pages/profile";
import ProtectedRoute from "../protectedRoute/protectedRoute";
import {fetchGetUserData} from "../../store/userSlice";
import PlanetLoader from "../planetLoader/planetLoader";
import Modal from "../modal/modal";
import IngredientDetails from "../IngredientDetails/ingredientDetails";
import Ingredient from "../../pages/ingredient";
import OrderDetails from "../orderDetails/orderDetails";
import Orders from "../../pages/orders";
import {getCookie} from "../../utils/storage";
import {useCallback} from "react";
import Feed from "../../pages/feed";
import OrderInfo from "../orderInfo/orderInfo";
import Order from "../../pages/order";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {IAppLocation} from "../../types/types";
import {Location} from "history";

function App() {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(store => store.ingredients.ingredientsRequest);
    const location = useLocation() as IAppLocation;
    const history = useHistory();
    //достаем из стейта адрес главной страницы "/" для ее рендера под модальным окном
    //адрес закидывается в стейт в компоненте Card
    const background = location.state?.background;

    //пытаемся авторизовать пользователя при наличии токенов
    useEffect(() => {
        if (getCookie('accessToken') || localStorage.getItem('refreshToken'))
            dispatch(fetchGetUserData())
    }, [dispatch])

    //загружаем ингредиенты с сервера при монтировании компонента
    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    const onClose = useCallback(
        () => {
            history.goBack();
        },
        [history],
    );

    /*
    Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов.
    Если хоть одно состояние true или не null, то какой-то попап открыт, значит, навешивать нужно обработчик.
    Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
    И не забываем удалять обработчик в clean up функции через return
    А также массив зависимостей c isOpen, чтобы отслеживать изменение этого показателя открытости.
    Как только он становится true, то навешивается обработчик, когда в false, тогда удаляется обработчик.
    */
    const {isModalOpened} = useAppSelector(store => ({
        isModalOpened: store.ingredient.isOpened || store.order.isOpened || store.feed.isOpened
    }))

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <Switch location={(background || location) as Location}>
                <Route path="/" exact={true}>
                    {isLoading ? <PlanetLoader/> : <Main/>}
                </Route>
                <Route path="/login" exact={true}>
                    <Login/>
                </Route>
                <ProtectedRoute path="/register" exact isAnonOnly={true}>
                    <Register/>
                </ProtectedRoute>
                <ProtectedRoute path="/forgot-password" exact isAnonOnly={true}>
                    <ForgotPassword/>
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password" exact isAnonOnly={true}>
                    <ResetPassword/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile" exact={true}>
                    <Profile/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}>
                    <Orders/>
                </ProtectedRoute>
                <ProtectedRoute path="/orders" exact={true}>
                    <Orders/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders/:id" exact={true}>
                    <Order personal={true}/>
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <Ingredient/>
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <Order/>
                </Route>
                <Route path="/feed" exact={true}>
                    <Feed/>
                </Route>
            </Switch>
            {background && (
                <>
                    <ProtectedRoute path="/profile/orders/:id">
                        <Modal title={''} onClose={onClose} isModalOpened={isModalOpened}>
                            <OrderInfo/>
                        </Modal>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id">
                        <Modal title={'Детали ингредиента'} onClose={onClose} isModalOpened={isModalOpened}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                    <Route path="/feed/:id">
                        <Modal title={''} onClose={onClose} isModalOpened={isModalOpened}>
                            <OrderInfo/>
                        </Modal>
                    </Route>
                    <Route path="/order">
                        <Modal title={''} onClose={onClose} isModalOpened={isModalOpened}>
                            <OrderDetails/>
                        </Modal>
                    </Route>
                </>
            )}
        </div>
    );
}

export default App;
