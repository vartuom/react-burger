import React from 'react';
import styles from './ingredientIcon.module.css'

const IngredientIcon = ({src}) => {
    return (
        <div className={styles.gradientBackground}>
            <span className={styles.imageBackground}>
                <img src={src}/>
            </span>
        </div>
    );
};

export default IngredientIcon;