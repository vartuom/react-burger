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
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword/>
                    </Route>
                    <Route path="/reset-password">
                        <ResetPassword/>
                    </Route>
                    <Route path="/">
                        {!isLoading && <Main/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
