import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";
import {BurgerContext} from "../../services/burgerContext";

function App() {

    const [ingredientsState, setIngredientsState] = React.useState({
        //"isLoaded: false" не дает зарендерится до получения данных компонентам, использующим данные с сервера
        isLoaded: false,
        hasError: false,
        data: []
    });

    //загрузка данных с сервера
    React.useEffect(() => {
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
    }, [])

    return (
        <div className={appStyles.app}>
            <AppHeader/>
            <main className={`${appStyles.main} pt-1 pb-10`}>
                <h1 className={`${appStyles.title} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
                {ingredientsState.isLoaded &&
                    <>
                        <BurgerContext.Provider value={ingredientsState.data}>
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
