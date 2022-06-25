import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {BurgerContext} from "../../services/burgerContext";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

    //загрузка данных с сервера
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(store => ({
        ingredients: store.ingredients.data,
        ingredientsRequest: store.ingredients.ingredientsRequest,
        ingredientsFailed: store.ingredients.ingredientsFailed
    }))

    const dispatch = useDispatch();

    useEffect(()=> {
        // Отправляем экшен-функцию
        dispatch(getIngredients())
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={`${appStyles.main} pt-1 pb-10`}>
                <h1 className={`${appStyles.title} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
                {!ingredientsRequest &&
                    <DndProvider backend={HTML5Backend}>
                        <BurgerContext.Provider value={ingredients}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </BurgerContext.Provider>
                    </DndProvider>
                }
            </main>
        </div>
    );
}

export default App;
