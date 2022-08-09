import React, {useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

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
        if (!orders)
            return
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

    const thisOrderIngredientsData = useMemo(() => {
        //если стор еще пустой то возвращаем пустой массив
        if (!ingredientsStoreArr) {
            return []
        }
        //используем массив из ID ингредиентов в бургере без повторений...
        const ingredientsIDs = Object.keys(reducedIngredientsList);

        //...что бы достать все неоходимые данные ингредиентов
        const ingredientsDataArr = ingredientsIDs.map((item) => {
            return ingredientsStoreArr.find((ingredient) => {
                return item === ingredient._id;
            })
        })
        //используем свернутый массив reducedIngredientsList что бы добавить поле "количеств" для каждого ингредиента
        return ingredientsDataArr.map(item => {
            return {...item, quantity: reducedIngredientsList[item._id]}
        });
    }, [reducedIngredientsList, ingredientsStoreArr])

    return (
        <div>

        </div>
    );
};

export default OrderInfo;