import {createSlice} from "@reduxjs/toolkit";

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: {},
        mains: []
    },
    reducers: {
        addIngredient(state, action) {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
            } else {
                state.mains.push(action.payload)
            }
        },
        removeIngredient(state, action) {
            //комбинируем слайсы до и после индекса элемента, который нужно удалить
            state.mains = [...state.mains.slice(0, action.payload), ...state.mains.slice(action.payload + 1)]
        },
        moveIngredient(state, action) {
            //копируем стейт в рабочий массив
            const updatedList = state.mains;
            //копируем захваченную карточку
            const dragCard = state.mains[action.payload.dragIndex];
            //удаляем карточку из копии стейта
            updatedList.splice(action.payload.dragIndex, 1);
            //вставляем карточку на позицию элемента над которым перетаскиваемая карточка
            updatedList.splice(action.payload.hoverIndex, 0, dragCard)
            //обновляем массив
            state.mains = updatedList
        }
    }
})

export const {addIngredient, removeIngredient, moveIngredient} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;