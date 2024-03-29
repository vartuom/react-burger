import React, {useEffect, useMemo} from 'react';
import {useLocation} from "react-router-dom";
import styles from './orderInfo.module.css'
import IngredientIcon from "../ingredientIcon/ingredientIcon";
import Price from "../price/price";
import ScrollBox from "../scrollBox/scrollBox";
import {wsActions} from "../../store/feedSlice";
import dayjs from "dayjs";
import {useAppSelector, useAppDispatch, useAppParams} from "../../services/hooks";
import {IAppLocation} from "../../types/types";

const OrderInfo = () => {

    const {setOrdersModalOpened, setOrdersModalClosed} = wsActions;

    //проверяем где находится компонент...
    const location = useLocation() as IAppLocation;
    const background = location.state?.background;
    const dispatch = useAppDispatch();

    useEffect(() => {
        //...если в модальном окне, то отправляем в стор событие открытия модалки
        if (background)
            dispatch(setOrdersModalOpened())
        return () => {
            if (background)
                dispatch(setOrdersModalClosed())
        }
    }, [dispatch, background, setOrdersModalOpened, setOrdersModalClosed])

    //достаем id заказа из параметра url "/:id"
    const {id} = useAppParams();

    //забираем заказы из стора
    const {orders, ingredientsStoreArr} = useAppSelector(store => ({
        orders: store.feed.data,
        ingredientsStoreArr: store.ingredients.data
    }));

    //находим содержимое нужного заказа
    const thisOrder = useMemo(() => {
        return orders.find((order) => {
            return order._id === id
        })
    }, [orders, id])

    //сворачиваем ингредиенты заказа в объект вида {id: количество, ...}
    const reducedIngredientsList = useMemo(() => {
        //дженерик позволяющий аккумулятору индексироваться по строкам
        const obj = thisOrder?.ingredients.reduce<Record<string, number>>((prevVal, item) => {
            if (!prevVal[item]) {
                // если ключа ещё нет в объекте, значит это первое повторение
                prevVal[item] = 1;
            } else {
                // иначе увеличим количество повторений на 1
                prevVal[item] += 1;
            }
            // и вернём изменённый объект
            return prevVal;
        }, {}) // Начальное значение — пустой объект.
        return obj
    }, [thisOrder])

    //собираем массив данных для рендеринга
    const thisOrderIngredientsData = useMemo(() => {
        //если стор еще пустой то возвращаем пустой массив
        if (!ingredientsStoreArr) {
            return []
        }
        //за основу берем ID из заказа
        const ingredientsIDs = Object.keys(reducedIngredientsList as Record<string, number>);
        //достаем все необходимые данные из стора
        const ingredientsDataArr = ingredientsIDs.map((item) => {
            return ingredientsStoreArr.find((ingredient) => {
                return item === ingredient._id;
            })
        })
        //используем свернутый массив reducedIngredientsList что бы добавить поле "количество" для каждого ингредиента
        return ingredientsDataArr.map(item => {
            if (reducedIngredientsList && item) {
                return {...item, quantity: reducedIngredientsList[item._id]}
            } else {
                return undefined
            }
        });
    }, [reducedIngredientsList, ingredientsStoreArr])

    const totalPrice = useMemo(() => {
        return thisOrderIngredientsData.reduce((prevVal, ingredient) => {
            if (ingredient) {
                return prevVal + ingredient.price * ingredient.quantity
            } else {
                return prevVal
            }
        }, 0)
    }, [thisOrderIngredientsData]);

    return (
        <div className={styles.container}>
            {
                !background
                    ?
                    <p className={`text text_type_digits-default pt-2 ${styles.orderNumber}`}>{`#${thisOrder?.number}`}</p>
                    : <p className="text text_type_digits-default pt-2">{`#${thisOrder?.number}`}</p>
            }
            <h2 className="text text_type_main-medium pb-2 pt-10">{thisOrder?.name}</h2>
            {
                thisOrder?.status === 'done' ?
                    <p className="text text_type_main-default text_color_success">Выполнен</p>
                    : thisOrder?.status === 'pending' ? <p className="text text_type_main-default">Готовится</p>
                        : <p className="text text_type_main-default">В очереди</p>
            }
            <p className="text text_type_main-medium pb-6 pt-15">Состав:</p>
            <ScrollBox>
                <ul className={styles.ingredientsList}>
                    {thisOrderIngredientsData.map((ingredient) => {
                        if (ingredient) {
                            return <li className={styles.ingredientRow} key={ingredient._id}>
                                <IngredientIcon src={ingredient.image}/>
                                <p className="text text_type_main-default">{ingredient.name}</p>
                                <div className={styles.priceColumn}>
                                    <p className="text text_type_digits-default">{`${ingredient.quantity} x`}</p>
                                    <Price value={ingredient.price}/>
                                </div>
                            </li>
                        } else {
                            return <></>
                        }
                    })}
                </ul>
            </ScrollBox>
            <div className={`${styles.containerFooter} pt-10 pb-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    {dayjs(thisOrder?.createdAt).locale('ru').format('DD MMM YYYY, HH:mm')}
                </p>
                <Price value={totalPrice}/>
            </div>
        </div>
    );
};

export default OrderInfo;