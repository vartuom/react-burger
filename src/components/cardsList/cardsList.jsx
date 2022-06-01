import React from 'react';
import Card from "../card/card";
import cardListStyle from "./cardList.module.css"
import PropTypes from "prop-types";
import ingredientPropTypes from "../../utils/propTypesConfig";
import Modal from "../modal/modal";
import IngredientDetails from "../IngredientDetails/ingredientDetails";

//пробрасываем ссылку на заголовок внутрь компонента (для скрола)
const CardsList = React.forwardRef((props, ref) => {
    const { ingredients, title } = props;

    //состояние модального окна с описанием ингредиента
    const [isDetailsOpened, setIsDetailsOpened] =
            React.useState({
                isOpened: false,
                ingredient: null
            });

    //закрытие модального окна кликом оверлей
    const closeDetailsModal = () => {
        setIsDetailsOpened({...isDetailsOpened, isOpened: false});
    }

    //обработка клика на карточку ингредиента
    const openDetailsModal = (ingredient) => {
        setIsDetailsOpened({isOpened: true, ingredient: ingredient});
    }

    return (
        <div>
            <h2 className="text text_type_main-medium pt-10 pb-6" ref={ref}>{title}</h2>
            <ul className={`${cardListStyle.cardList} pl-4 pr-4`}>
                {ingredients.map(ingredient =>
                    <Card ingredient={ingredient} key={ingredient._id} action={openDetailsModal}/>
                )}
            </ul>
            {isDetailsOpened.isOpened &&
                <Modal handleCloseAction={closeDetailsModal}>
                    <IngredientDetails ingredient={isDetailsOpened.ingredient}/>
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