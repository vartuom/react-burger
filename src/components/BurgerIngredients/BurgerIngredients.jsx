import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import CardsList from "../cardsList/cardsList";

const BurgerIngredients = (props) => {
    const [currentTab, setCurrentTab] = React.useState('one');
    const [ingredients, setIngredients] = React.useState(props.ingredients);

    //указатели на заголовки списков ингредиентов
    const bunsListRef = React.useRef(null);
    const mainsListRef = React.useRef(null);
    const saucesListRef = React.useRef(null);

    //обработка нажатия на закладки
    React.useEffect(() => {
        switch (currentTab) {
            case 'buns':
                //скрол до заголовка
                bunsListRef.current.scrollIntoView({behavior: "smooth", block: "start"});
                break;
            case 'mains':
                mainsListRef.current.scrollIntoView({behavior: "smooth", block: "start"});
                break;
            case 'sauces':
                saucesListRef.current.scrollIntoView({behavior: "smooth", block: "start"});
                break;
            default:
        }
    }, [currentTab])

    //сортируем ингридиенты по типам
    const sortedIngredients = React.useMemo(() => {
        let buns = [];
        let mains = [];
        let sauces = [];
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
            <div>
                <div style={{ display: 'flex'}}>
                    <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTab}>
                        Булки
                    </Tab>
                    <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTab}>
                        Соусы
                    </Tab>
                    <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTab}>
                        Начинки
                    </Tab>
                </div>
            </div>
            <div className={burgerIngredientsStyles.list}>
                <CardsList ingredients={sortedIngredients.buns} title="Булки" ref={bunsListRef}/>
                <CardsList ingredients={sortedIngredients.sauces} title="Соусы" ref={saucesListRef}/>
                <CardsList ingredients={sortedIngredients.mains} title="Начинка" ref={mainsListRef}/>
            </div>
        </section>
    );
};

export default BurgerIngredients;