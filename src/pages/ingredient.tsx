import React from 'react';
import styles from './ingredient.module.css'
import IngredientDetails from "../components/IngredientDetails/ingredientDetails";

const Ingredient = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={'text text_type_main-large pt-30'}>Детали ингредиента</h2>
            <IngredientDetails/>
        </div>
    );
};

export default Ingredient;