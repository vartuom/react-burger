import React, {useEffect} from 'react';
import ingredientDetailsStyles from "./ingredientDetails.module.css"
import {useLocation} from "react-router-dom";
import PlanetLoader from "../planetLoader/planetLoader";
import {fetchIngredient, setIngredientModalClosed, setIngredientModalOpened} from "../../store/ingredientSlice";
import {useAppDispatch, useAppParams, useAppSelector} from "../../services/hooks";
import {IAppLocation} from "../../types/types";

const IngredientDetails = () => {

    const dispatch = useAppDispatch();
    //достаем id игредиента из параметра url "/ingredients/:id"
    const {id} = useAppParams();

    //забираем актуальные данные ингредиента с сервера
    useEffect(() => {
        dispatch(fetchIngredient(id))
    }, [dispatch, id])

    //проверяем где находится компонент с деталями....
    const location = useLocation() as IAppLocation;
    const background = location.state?.background;
    useEffect(() => {
        //...если компонент не в модальном окне, то не меняем стейт
        background && dispatch(setIngredientModalOpened())
        return () => {
            background && dispatch(setIngredientModalClosed())
        }
    }, [background, dispatch])

    //следим за стором, пока не вернется ингредиент показываем лоадер
    const {ingredient, isLoading, isFailed} = useAppSelector(store => ({
        ingredient: store.ingredient.data,
        isLoading: store.ingredient.isLoading,
        isFailed: store.ingredient.isFailed
    }))


    return isLoading ? <PlanetLoader/> : isFailed ? 'Ошибка' : (
        <div className={`${ingredientDetailsStyles.container} pb-15`}>
            <img className={ingredientDetailsStyles.preview} src={ingredient.image} alt=""/>
            <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
            <ul className={ingredientDetailsStyles.nutritionList}>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Калории, ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Белки, г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </li>
                <li className={ingredientDetailsStyles.nutritionItem}>
                    <p className="text text_type_main-small">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};


export default IngredientDetails;