import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT} from "../../services/actions/burgerConstructor";
import {useDispatch} from "react-redux";
import burgerConstructorStyles from "../burgerConstructor/burgerConstructor.module.css";
import {useDrop, useDrag} from "react-dnd";
import {useRef} from "react";

const DragSource = ({slice, index, moveCard}) => {
    const dispatch = useDispatch();

    // useDrop - the list item is also a drop area
    const [{isHover}, dropRef] = useDrop({
        accept: 'constructor',
        hover: (item, monitor) => {
            const dragIndex = item.index
            debugger
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            //if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            //if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            if (dragIndex === hoverIndex) {
                return
            }

            moveCard(dragIndex, hoverIndex)
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

    const opacity = isDragging ? 1 : 1

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <div ref={dragDropRef} className={burgerConstructorStyles.ingredientsRow} style={{opacity: opacity}}>
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

export default DragSource;