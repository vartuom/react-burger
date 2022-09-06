import React, {ForwardedRef, LegacyRef} from 'react';
import Card from "../card/card";
import cardListStyle from "./cardsList.module.css"
import {TIngredient} from "../../types/types";

interface ICardListProps {
    ingredients: Array<TIngredient>,
    title: string,
    id: string
}

//получаем ссылку на заголовок (для скрола)
const CardsList = React.forwardRef((props: ICardListProps, ref: LegacyRef<HTMLUListElement>) => {
    const { ingredients, title, id } = props;
    return (
        <div>
            <h2 className="text text_type_main-medium pt-10 pb-6" id={id}>{title}</h2>
            <ul className={`${cardListStyle.cardList} pl-4 pr-4`} ref={ref}>
                {ingredients.map(ingredient =>
                    <Card ingredient={ingredient} key={ingredient._id} />
                )}
            </ul>
        </div>
    );
})


export default CardsList;