import React from 'react';
import styles from './main.module.css'
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const Main = () => {
    return (
        <main className={`${styles.main} pt-1 pb-10`}>
            <h1 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>Соберите
                бургер</h1>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
        </main>
    );
};

export default Main;