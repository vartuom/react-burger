import React, {useCallback, useEffect} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import CardsList from "../cardsList/cardsList";
import {useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";

const BurgerIngredients = () => {

    //принимаем список всех ингредиентов
    const {ingredients} = useSelector(store => ({
        ingredients: store.ingredients.data
    }))

    //стейт закладок с ингредиентами
    const [currentTab, setCurrentTab] = React.useState('buns');

    //хуки для переключения табов при скроле, возвращают true когда объект в поле видимости
    const [bunsListRef, inViewBuns] = useInView({
        threshold: 0.5
    });
    const [mainsListRef, inViewMains] = useInView({
        threshold: 0.5
    });
    const [saucesListRef, inViewSauces] = useInView({
        threshold: 0.5
    });

    //переключение активного таба при скроле
    useEffect(()=> {
        if (inViewBuns) {
            setCurrentTab('buns')
        } else if (inViewMains) {
            setCurrentTab('mains')
        } else if (inViewSauces) {
            setCurrentTab('sauces')
        }
    }, [inViewBuns, inViewSauces, inViewMains])

    //обработка клика на таб
    const handleTabClick = useCallback((subTabId) => {
        document.getElementById(subTabId).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [])

    //сортируем ингредиенты по типам
    const sortedIngredients = React.useMemo(() => {
        const buns = [];
        const mains = [];
        const sauces = [];
        ingredients.forEach((ingredient) => {
            switch (ingredient.type) {
                case 'bun':
                    buns.push(ingredient);
                    break;
                case 'main':
                    mains.push(ingredient);
                    break
                case 'sauce':
                    sauces.push(ingredient);
                    break;
                default:
                    console.log(`Ошибка, неизвестный тип ингридиента ${ingredient.type}.`);
            }
        })
        return {buns, mains, sauces}
    }, [ingredients])


    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <div className={burgerIngredientsStyles.tabs}>
                <Tab value="buns" active={currentTab === 'buns'} onClick={() => handleTabClick('buns')}>
                    Булки
                </Tab>
                <Tab value="sauces" active={currentTab === 'sauces'} onClick={() => handleTabClick('sauces')}>
                    Соусы
                </Tab>
                <Tab value="mains" active={currentTab === 'mains'} onClick={() => handleTabClick('mains')}>
                    Начинки
                </Tab>
            </div>
            {/* пробрасываем рефы на табы внутрь списков */}
            <div className={burgerIngredientsStyles.list}>
                <CardsList ingredients={sortedIngredients.buns} title="Булки" id='buns' ref={bunsListRef}/>
                <CardsList ingredients={sortedIngredients.sauces} title="Соусы" id='sauces' ref={saucesListRef}/>
                <CardsList ingredients={sortedIngredients.mains} title="Начинка" id='mains' ref={mainsListRef}/>
            </div>
        </section>
    );
};

export default BurgerIngredients;
