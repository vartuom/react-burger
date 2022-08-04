import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../store/ingredientsSlice";
import {Switch, Route, useLocation} from 'react-router-dom';
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


function App() {

    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.ingredients.ingredientsRequest);
    const location = useLocation();
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

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <Switch location={background || location}>
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
                <ProtectedRoute path="/profile/orders">
                    <Orders/>
                </ProtectedRoute>
                <ProtectedRoute path="/orders">
                    <Orders/>
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <Ingredient/>
                </Route>)
            </Switch>
            {background && (
                <>
                    <Route path="/ingredients/:id">
                        <Modal title={'Детали ингредиента'} backRedirect={background.pathname}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                    <Route path="/order">
                        <Modal title={''} backRedirect={background.pathname}>
                            <OrderDetails/>
                        </Modal>
                    </Route>
                </>
            )}
        </div>
    );
}

export default App;
