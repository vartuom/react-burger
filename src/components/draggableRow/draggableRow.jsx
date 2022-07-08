import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT} from "../../services/actions/burgerConstructor";
import {useDispatch} from "react-redux";
import draggableRowStyles from "./draggableRow.module.css";
import {useDrop, useDrag} from "react-dnd";
import {useRef} from "react";
import {removeIngredient} from "../../store/burgerConstructorSlice";

const DraggableRow = ({slice, index, moveIngredient}) => {
    const dispatch = useDispatch();

    // компонент и дроп-айтем и драг-айтем одновременно
    const [, dropRef] = useDrop({
        accept: 'constructor',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index

            //настройки под место срабатывания перетаскивания
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
            // если тащим вниз, то ждем момента пока перетаскиваемый элемент
            // окажется ниже середины лежащего под ним
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            //если тащим вверх
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            //не таскаем самого себя
            if (dragIndex === hoverIndex) {
                return
            }

            //двигаем ингредиент
            moveIngredient(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, dragRef] = useDrag({
        type: 'constructor',
        item: { index },
        //используем статус перетаскивания для переключения opacity
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <div ref={dragDropRef} className={draggableRowStyles.row} style={{opacity: opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={slice.name}
                price={slice.price}
                thumbnail={slice.image}
                handleClose={() => {
                    // удаляем элемент по его индексу в массиве
                    dispatch(removeIngredient({index}))
                }}
            />
        </div>
    );
};

export default DraggableRow;