import React, {useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './orderInfo.module.css'
import IngredientIcon from "../ingredientIcon/ingredientIcon";
import Price from "../price/price";
import ScrollBox from "../scrollBox/scrollBox";

const OrderInfo = () => {

    //достаем id заказа из параметра url "/feed/:id"
    const {id} = useParams();

    //забираем заказы из стора
    const {orders, ingredientsStoreArr} = useSelector(store => ({
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
        const obj = thisOrder.ingredients.reduce((prevVal, item) => {
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
        const ingredientsIDs = Object.keys(reducedIngredientsList);
        //достаем все необходимые данные из стора
        const ingredientsDataArr = ingredientsIDs.map((item) => {
            return ingredientsStoreArr.find((ingredient) => {
                return item === ingredient._id;
            })
        })
        //используем свернутый массив reducedIngredientsList что бы добавить поле "количество" для каждого ингредиента
        return ingredientsDataArr.map(item => {
            return {...item, quantity: reducedIngredientsList[item._id]}
        });
    }, [reducedIngredientsList, ingredientsStoreArr])

    console.log(thisOrderIngredientsData);
    const totalPrice = useMemo(() => {
        return thisOrderIngredientsData.reduce((prevVal, ingredient) => {
            return prevVal + ingredient.price*ingredient.quantity
        }, 0)
    }, [thisOrderIngredientsData] );

    return (
        <div className={styles.container}>
            <p className="text text_type_digits-default pt-2">{`#${thisOrder.number}`}</p>
            <h2 className="text text_type_main-medium pb-2 pt-10">{thisOrder.name}</h2>
            {
                thisOrder.status === 'done' ? <p className="text text_type_main-default text_color_success">Выполнен</p>
                    : thisOrder.status === 'pending' ? <p className="text text_type_main-default">Готовится</p>
                    : <p className="text text_type_main-default">В очереди</p>
            }
            <p className="text text_type_main-medium pb-6 pt-15">Состав:</p>
            <ScrollBox>
                <ul className={styles.ingredientsList}>
                    {thisOrderIngredientsData.map((ingredient) => {
                        return <div className={styles.ingredientRow}>
                            <IngredientIcon src={ingredient.image}/>
                            <p className="text text_type_main-default">{ingredient.name}</p>
                            <div className={styles.priceColumn}>
                                <p className="text text_type_digits-default">{`${ingredient.quantity} x`}</p>
                                <Price value={ingredient.price}/>
                            </div>
                        </div>
                    })}
                </ul>
            </ScrollBox>
            <div className={`${styles.containerFooter} pt-10 pb-10`}>
                <p className="text text_type_main-default text_color_inactive">{thisOrder.createdAt}</p>
                <Price value={totalPrice}/>
            </div>
        </div>
    );
};

export default OrderInfo;