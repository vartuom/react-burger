import React, {useContext} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/api";
import {BurgerContext} from "../../services/burgerContext";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT} from "../../services/actions/burgerConstructor";

const BurgerConstructor = () => {

    //
    const {buns, mains} = useSelector(store => ({
        buns: store.burgerConstructor.buns,
        mains: store.burgerConstructor.mains
    }))

    const dispatch = useDispatch();

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({ingredient}) {
            //onDropHandler(itemId);
            dispatch({
                type: ADD_INGREDIENT,
                payload: ingredient
            })
        },
    });

    //до реализации логики сборки бургера в контексте лежат все возможные ингредиенты по 1 штуке
    const ingredients = useContext(BurgerContext);

    //состояние модального окна с деталями заказа
    const [isDetailsOpened, setIsDetailsOpened] =
        React.useState({
            isOpened: false,
            orderNumber: null
        });

    //закрытие модального окна кликом на оверлей
    const closeDetailsModal = () => {
        setIsDetailsOpened({...isDetailsOpened, isOpened: false});
    }

    //генерация случайного набора ингредиентов - затычка на время до реализции перетаскивания
    const randIngredients = (arr) => {
        return arr.filter(el => {
            return (Math.random() > 0.5)
        })
    }

    //сборка бургера
    const burgerComponents = React.useMemo(() => {
        //кладем булки в отдельную переменную
        const buns = ingredients.find(function (ingredient) {
            return ingredient.type === "bun";
        });
        //убираем все булки и случайные ингредиенты из массива ингредиентов
        const slices = randIngredients(ingredients.filter(function (ingredient) {
            return ingredient.type !== "bun";
        }));
        //собираем бургер обратно
        const fakeBurger = slices.concat(buns);
        //сумма стоимости всех ингредиентов + двух булок
        const totalPrice = fakeBurger.reduce((prevVal, slice) => {
            return prevVal + slice.price;
        }, 0);
        return {buns, slices, fakeBurger, totalPrice};
    }, [ingredients])

    //обработка нажатия кнопки "Оформить заказ"
    const postOrder = () => {
        fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //раскладываем бургер на компоненты и выбираем id компонентов
                    ingredients: burgerComponents.fakeBurger.map((component) => component._id)
                })
            }
        )
            .then(checkResponse)
            .then((actualData) => {
                //если все ОК открываем модальное окно и передаем номер заказа в стейт
                setIsDetailsOpened({isOpened: true, orderNumber: actualData.order.number})
            })
            .catch((err) => console.log(`При получении данных произошла ошибка => ${err}`))
    }

    return (
        <div ref={dropTarget}>
            <div className={burgerConstructorStyles.constructor}>
                <div className={`${burgerConstructorStyles.buns} pl-8 pt-1`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${buns.name} (верх)`}
                        price={buns.price}
                        thumbnail={buns.image}
                    />
                </div>
                <ul ref={dropTarget} className={burgerConstructorStyles.ingredientsList}>
                    {mains.map((slice, index) =>
                        <li className={burgerConstructorStyles.ingredientsRow} key={index}>
                            <DragIcon type="primary"/>
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
                        text={`${buns.name} (низ)`}
                        price={buns.price}
                        thumbnail={buns.image}
                    />
                </div>
                <div className={`${burgerConstructorStyles.commit} pr-4 pt-6`}>
                    <Price value={burgerComponents.totalPrice} isLarge={true}/>
                    <Button type="primary" size="large" onClick={postOrder}>Оформить заказ</Button>
                </div>
                {isDetailsOpened.isOpened &&
                    <Modal title="" handleCloseAction={closeDetailsModal}>
                        <OrderDetails orderNumber={isDetailsOpened.orderNumber}/>
                    </Modal>
                }
            </div>
        </div>
    );
};

export default BurgerConstructor;