import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {BurgerContext} from "../../services/burgerContext";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";

function App() {

    //загрузка данных с сервера
    const {ingredients, ingredientsRequest, ingredientsFailed, isLoaded} = useSelector(store => ({
        ingredients: store.ingredients.data,
        ingredientsRequest: store.ingredients.ingredientsRequest,
        ingredientsFailed: store.ingredients.ingredientsFailed,
        isLoaded: store.ingredients.isLoaded
    }))

    const dispatch = useDispatch();

    useEffect(()=> {
        // Отправляем экшен-функцию
        dispatch(getIngredients())
    }, [])



/*    React.useEffect(() => {
        const fetchData = () => {
            fetch(`${baseUrl}/ingredients`)
                .then(checkResponse)
                .then((actualData) => {
                    setIngredientsState({...ingredientsState, isLoaded: true, data: actualData.data})
                })
                .catch((err) => {
                    console.log(`При получении данных произошла ошибка => ${err}`);
                    setIngredientsState({...ingredientsState, hasError: true})
                })
        }
        fetchData()
    }, [])*/

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={`${appStyles.main} pt-1 pb-10`}>
                <h1 className={`${appStyles.title} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
                {isLoaded &&
                    <>
                        <BurgerContext.Provider value={ingredients}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </BurgerContext.Provider>
                    </>
                }
            </main>
        </div>
    );
}

export default App;
