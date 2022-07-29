import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../store/ingredientsSlice";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgotPassword";
import ResetPassword from "../../pages/resetPassword";
import Main from "../../pages/main";
import Profile from "../../pages/profile";
import ProtectedRoute from "../protectedRoute/protectedRoute";


function App() {

    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.ingredients.ingredientsRequest)

    //загружаем ингредиенты с сервера при монтировании компонента
    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <div className={appStyles.app}>
            <BrowserRouter>
                <AppHeader/>
                <Switch>
                    <Route path="/" exact={true}>
                        {!isLoading && <Main/>}
                    </Route>
                    <Route path="/login" exact={true}>
                        <Login/>
                    </Route>
                    <Route path="/register" exact={true}>
                        <Register/>
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPassword/>
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPassword/>
                    </Route>
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
