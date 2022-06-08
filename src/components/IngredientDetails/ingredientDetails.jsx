import React from 'react';
import ingredientDetailsStyles from "./ingredientDetails.module.css"
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/propTypesConfig";

const IngredientDetails = ({ingredient}) => {
    return (
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

IngredientDetails.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired};

export default IngredientDetails;