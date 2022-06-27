import React, {useCallback, useMemo} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/burgerConstructor";
import {CLOSE_DETAILS_MODAL, post} from "../../services/actions/order";
import DragSource from "../dragSource/dragSource";

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    //следим за булкой и ингредиентами в конструкторе
    const {bun, mains} = useSelector(store => ({
        bun: store.burgerConstructor.bun,
        mains: store.burgerConstructor.mains
    }))

    //параметры модального окна с номером заказа
    const {isDetailsOpened, orderNumber} = useSelector(store => ({
        isDetailsOpened: store.order.isOpened,
        orderNumber: store.order.orderNumber
    }))

    //обработка перетаскиваемых объектов в контейнер
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({ingredient}) {
            dispatch({
                type: ADD_INGREDIENT,
                payload: ingredient
            })
        },
    });

    //закрытие модального окна кликом на оверлей
    const closeDetailsModal = useCallback(() => {
        dispatch({
            type: CLOSE_DETAILS_MODAL
        });
    }, [])

    //мемоизированное вычисление цены бургера
    const calcPrice = useMemo(() => {
        return mains.reduce((prevVal, slice) => {
            return prevVal + slice.price;
        }, 0) + (bun.price ? bun.price * 2 : 0);
    }, [bun, mains])

    //обработка нажатия кнопки "Оформить заказ"
    const postOrder = useCallback(() => {
        //ингредиенты в конструкторе + 2 булки
        dispatch(post([...mains, bun, bun]))
    }, [mains, bun])

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
        /*setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )*/
    }, [])

    return (
        <div ref={dropTarget}>
            <div className={burgerConstructorStyles.constructor}>
                <div className={`${burgerConstructorStyles.buns} pl-8 pt-1`}>
                    {bun.type && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <ul ref={dropTarget} className={burgerConstructorStyles.ingredientsList}>
                    {mains.map((slice, index) =>
                        <li key={index} >
                            <DragSource slice={slice} index={index} moveCard={moveCard}/>
                        </li>
                    )}
                </ul>
                <div className={`${burgerConstructorStyles.buns} pl-8`}>
                    {bun.type && <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <div className={`${burgerConstructorStyles.commit} pr-4 pt-6`}>
                    {/* Если calc = NaN (еще не вычислялось), то передаем 0 */}
                    <Price value={calcPrice ? calcPrice : 0} isLarge={true}/>
                    <Button type="primary" size="large" onClick={postOrder}>Оформить заказ</Button>
                </div>
                {isDetailsOpened &&
                    <Modal title="" handleCloseAction={closeDetailsModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>
                }
            </div>
        </div>
    );
};

export default BurgerConstructor;