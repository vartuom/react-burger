import React, {useCallback, useMemo} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../price/price";
import Modal from "../modal/modal";
import OrderDetails from "../orderDetails/orderDetails";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import DraggableRow from "../draggableRow/draggableRow";
import { v4 as uuidv4 } from 'uuid';
import {addIngredient, moveIngredient} from "../../store/burgerConstructorSlice";
import {fetchOrder} from "../../store/orderSlice";
import {closeDetailsModal} from "../../store/orderSlice";

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
            //добавляем уникальный идентифкатор (uuid) для объекта ингредиента в конструкторе
            dispatch(addIngredient({...ingredient, uuid: uuidv4()}))
        },
    });

    //закрытие модального окна кликом на оверлей
    const closeModal = useCallback(() => {
        dispatch(closeDetailsModal());
    }, [dispatch])

    //мемоизированное вычисление цены бургера
    const calcPrice = useMemo(() => {
        return mains.reduce((prevVal, slice) => {
            return prevVal + slice.price;
        }, 0)
            //добавляем цену булок, если они есть в конструкторе
            + (bun.price ? bun.price * 2 : 0);
    }, [bun, mains])

    //обработка нажатия кнопки "Оформить заказ"
    const postOrder = useCallback(() => {
        //если в конструкторе нет булок или ингредиентов то не отправляем заказ
        if (bun.price && mains.length > 0)
            dispatch(fetchOrder([...mains, bun, bun]))
    }, [mains, bun, dispatch])

    //DnD сортировка перетаскиванием
    const moveRow = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredient({
            dragIndex: dragIndex,
            hoverIndex: hoverIndex}))
    }, [dispatch])

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
                        <li key={slice.uuid} >
                            <DraggableRow slice={slice} index={index} moveIngredient={moveRow}/>
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
                    <Modal title="" handleCloseAction={closeModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>
                }
            </div>
        </div>
    );
};

export default BurgerConstructor;