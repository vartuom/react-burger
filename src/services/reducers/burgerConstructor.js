import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT} from "../actions/burgerConstructor";

const initialState = {
    bun: {},
    mains: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                mains: [...state.mains, action.payload]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                //комбинируем слайсы до и после индекса элемента, который нужно удалить
                mains: [...state.mains.slice(0, action.index), ...state.mains.slice(action.index + 1)]

            }
        }
        case MOVE_INGREDIENT: {
            //копируем стейт
            const updatedMains = state.mains;
            //получаем по индексам перетаскиваемый элемент и элемент, на который падает ховер
            const dragItem = state.mains[action.dragIndex]
            const hoverItem = state.mains[action.hoverIndex]
            //меняем элементы местами
            updatedMains[action.dragIndex] = hoverItem
            updatedMains[action.hoverIndex] = dragItem
            return {
                ...state,
                mains: updatedMains
            }
        }
        default: {
            return state
        }
    }
}



/*moveCard = (dragIndex, hoverIndex) => {
    // list of cards
    let newcards = this.state.cards;

    // dragCard is card we are dragging
    let dragCard = newcards[dragIndex];

   // removing this dragCard from array
    newcards.splice(dragIndex, 1);

     // insert dragCard at hover position
    newcards.splice(hoverIndex, 0, dragCard);

    // update State
    this.setState({
      cards: newcards
    });
  };
}*/
/*//копируем стейт
const newList = state.mains;
//копируем захваченную карточку
const dragCard = state.mains[action.dragIndex];
//удаляем карточку из копии стейта
//newList.splice(action.dragIndex, 1);
//вставляем карточку на позицию элемента над которым перетаскиваемая карточка
newList.splice(action.hoverIndex, 0, dragCard)*/

//копируем захваченную карточку
//удаляем карточку из копии стейта
//newList.splice(action.dragIndex, 1);
//вставляем карточку на позицию элемента над которым перетаскиваемая карточка