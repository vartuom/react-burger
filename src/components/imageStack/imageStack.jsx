import React from 'react';
import styles from './imageStack.module.css'
import IngredientIcon from "../ingredientIcon/ingredientIcon";

const ImageStack = ({imagesArr}) => {

    //первые 5 элементов отрисовываем
    const renderedImages = imagesArr.slice(0, 5)
    //остальные закидываем в остаток
    const restImages = imagesArr.slice(5);

    return (
        <ul className={styles.imageRow}>
            {restImages.length > 0 ?
                <li className={styles.restWrapper}>
                    <div className={`${styles.restImage} ${styles.stackedImage}`}>
                        <IngredientIcon src={restImages[0].url}/>
                    </div>
                    <p className={`text ${styles.restNumber}`}>{`+${restImages.length}`}</p>
                </li> : ''}
            {
                renderedImages.reverse().map((image) => (
                    <li className={styles.stackedImage} key={image.id}>
                        <IngredientIcon src={image.url}/>
                    </li>)
                )
            }
        </ul>
    );
};

export default ImageStack;