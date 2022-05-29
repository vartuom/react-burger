import React from 'react';
import Card from "../card/card";
import cardListStyle from "./cardList.module.css"

//пробрасываем ссылку на заголовок внутрь компонента (для скрола)
const CardsList = React.forwardRef((props, ref) => {
    const { ingredients, title } = props;
    return (
        <div>
            <h2 className="text text_type_main-medium pt-10 pb-6" ref={ref}>{title}</h2>
            <ul className={`${cardListStyle.cardList} pl-4 pr-4`}>
                {ingredients.map(ingredient =>
                    <Card ingredient={ingredient} key={ingredient._id}/>
                )}
            </ul>
        </div>
    );
})

export default CardsList;