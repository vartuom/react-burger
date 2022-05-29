import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import ingredientPropTypes from "../../utils/propTypesConfig";
import PropTypes from "prop-types";

const BurgerConstructor = ({ingredients}) => {

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
                <Price value="610" isLarge={true}/>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {ingredients: PropTypes.arrayOf(ingredientPropTypes)};

export default BurgerConstructor;