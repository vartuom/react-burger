import React, {useContext} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import ingredientPropTypes from "../../utils/propTypesConfig";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {ConstructorContext} from "../../services/constructorContext";

const BurgerConstructor = () => {

    const ingredients = useContext(ConstructorContext);

    //состояние модального окна с деталями заказа
    const [isDetailsOpened, setIsDetailsOpened] =
        React.useState({
            isOpened: false,
            orderNumber: null
        });

    //закрытие модального окна кликом оверлей
    const closeDetailsModal = () => {
        setIsDetailsOpened({...isDetailsOpened, isOpened: false});
    }

    //обработка клика на кнопку Оформить
    const openDetailsModal = (ingredient) => {
        setIsDetailsOpened({isOpened: true, ingredient: ingredient});
    }

    //отделяем булки от всего остального
    const burgerComponents = React.useMemo(() => {
        //кладем булки в отдельную переменную
        const buns = ingredients.find(function (ingredient) {
            return ingredient.type === "bun";
        });
        //убираем булки из массива ингридиентов
        const slices = ingredients.filter(function (ingredient) {
            return ingredient.type !== "bun";
        });
        return {buns, slices};
    }, [ingredients])

    return (
        <div className={burgerConstructorStyles.constructor}>
            <div className={`${burgerConstructorStyles.buns} pl-8 pt-1`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${burgerComponents.buns.name} (верх)`}
                    price={burgerComponents.buns.price}
                    thumbnail={burgerComponents.buns.image}
                />
            </div>
            <ul className={burgerConstructorStyles.ingredientsList}>
                {burgerComponents.slices.map((slice, index) =>
                    <li className={burgerConstructorStyles.ingredientsRow} key={index}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={slice.name}
                            price={slice.price}
                            thumbnail={slice.image}
                        />
                    </li>
                )}
            </ul>
            <div className={`${burgerConstructorStyles.buns} pl-8`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${burgerComponents.buns.name} (низ)`}
                    price={burgerComponents.buns.price}
                    thumbnail={burgerComponents.buns.image}
                />
            </div>
            <div className={`${burgerConstructorStyles.commit} pr-4 pt-6`}>
                <Price value={610} isLarge={true}/>
                <Button type="primary" size="large" onClick={openDetailsModal}>Оформить заказ</Button>
            </div>
            {isDetailsOpened.isOpened &&
                <Modal title="" handleCloseAction={closeDetailsModal}>
                    <OrderDetails orderNumber="034536"/>
                </Modal>
            }
        </div>
    );
};

BurgerConstructor.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired};

export default BurgerConstructor;