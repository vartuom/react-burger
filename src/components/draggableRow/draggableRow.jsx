import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT} from "../../services/actions/burgerConstructor";
import {useDispatch} from "react-redux";
import draggableRowStyles from "./draggableRow.module.css";
import {useDrop, useDrag} from "react-dnd";
import {useRef} from "react";

const DraggableRow = ({slice, index, moveIngredient}) => {
    const dispatch = useDispatch();

    // компонент и дроп-айтем и драг-айтем одновременно
    const [{isHover}, dropRef] = useDrop({
        accept: 'constructor',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index

            //настройки под место срабатывания перетаскивания
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            //не таскаем самого себя
            if (dragIndex === hoverIndex) {
                return
            }

            //двигаем ингредиент
            moveIngredient(dragIndex, hoverIndex)

            //костыль из документации
            item.index = hoverIndex
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })

    const [{ isDragging }, dragRef] = useDrag({
        type: 'constructor',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    //const opacity = isHover ? 0 : 1

    const ref = useRef(null)
    //вроде как совмещает рефы? хз как это работает
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
                    dispatch({
                        type: REMOVE_INGREDIENT,
                        index: index
                    })
                }}
            />
        </div>
    );
};

export default DraggableRow;