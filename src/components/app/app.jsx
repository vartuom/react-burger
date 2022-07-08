import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {

    const dispatch = useDispatch();

    //загружаем ингредиенты с сервера при монтировании компонента
    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={`${appStyles.main} pt-1 pb-10`}>
                <h1 className={`${appStyles.title} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
                {
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                }
            </main>
        </div>
    );
}

export default App;
