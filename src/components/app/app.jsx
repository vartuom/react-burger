import React from 'react';
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {

    const [ingredientsState, setIngredientsState] = React.useState({
        isLoaded: false,
        hasError: false,
        data: []
    });

    //загрузка данных с сервера
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: статус ${res.status}`);
                }
                const actualData = await res.json();
                if (!actualData.success) {
                    throw new Error(`Ошибка сервера}`);
                }
                setIngredientsState({...ingredientsState, isLoaded: true, data: actualData.data})
            } catch(err) {
                setIngredientsState({...ingredientsState, hasError: true})
            } finally {
                //
            }
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
                        <BurgerIngredients ingredients={ingredientsState.data}/>
                        <BurgerConstructor ingredients={ingredientsState.data}/>
                    </>
                }
            </main>
        </div>
    );
}

export default App;
