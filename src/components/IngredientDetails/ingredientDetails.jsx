import React, {useEffect, useState} from 'react';
import ingredientDetailsStyles from "./ingredientDetails.module.css"
import ingredientPropTypes from "../../utils/propTypesConfig";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import PlanetLoader from "../planetLoader/planetLoader";
import {fetchIngredient} from "../../store/ingredientSlice";

const IngredientDetails = () => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const {ingredient, isLoading, isFailed} = useSelector(store => ({
        ingredient: store.ingredient.data,
        isLoading: store.ingredient.isLoading,
        isFailed: store.ingredient.isFailed
    }))

    useEffect(() => {
        dispatch(fetchIngredient(id))
    }, [])

  /* useEffect(() => {
       setIngredient(ingredientsArr.find((item) => {
            return item._id === id;
        }) || 'err')
    }, [ingredientsArr])*/


    return isLoading ? <PlanetLoader/> : isFailed ? 'Ошибка' : (
        <div className={`${ingredientDetailsStyles.container} pb-15`}>
            <img className={ingredientDetailsStyles.preview} src={ingredient.image} alt=""/>
            <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
            <ul className={ingredientDetailsStyles.nutritionList}>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Калории, ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Белки, г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};

IngredientDetails.propTypes = {ingredient: ingredientPropTypes};

export default IngredientDetails;