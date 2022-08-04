import React from 'react';
import Card from "../card/card";
import cardListStyle from "./cardsList.module.css"
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/propTypesConfig";
import Modal from "../modal/modal";
import IngredientDetails from "../IngredientDetails/ingredientDetails";
import {useSelector} from "react-redux";

//получаем ссылку на заголовок (для скрола)
const CardsList = React.forwardRef((props, ref) => {
    const { ingredients, title, id } = props;

    //состояние модального окна с описанием ингредиента
    const {ingredient, isOpened} = useSelector(store => ({
        ingredient: store.ingredient.data,
        isOpened: store.ingredient.isOpened
    }))

    return (
        <div>
            <h2 className="text text_type_main-medium pt-10 pb-6" id={id}>{title}</h2>
            <ul className={`${cardListStyle.cardList} pl-4 pr-4`} ref={ref}>
                {ingredients.map(ingredient =>
                    <Card ingredient={ingredient} key={ingredient._id} />
                )}
            </ul>
            {isOpened &&
                <Modal title="Детали ингредиента" >
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            }
        </div>
    );
})

CardsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default CardsList;