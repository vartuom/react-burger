import React from 'react';
import styles from './imageStack.module.css'

const ImageStack = ({imagesArr}) => {

    //первые 5 элементов отрисовываем
    const renderedImages = imagesArr.slice(0, 5)
    //остальные закидываем в остаток
    const restImages = imagesArr.slice(5);

    return (
        <ul className={styles.imageRow}>
            {restImages.length > 0 ?
                <li className={styles.restWrapper}>
                    <div className={`${styles.gradientBackground} ${styles.restImage}`}>
                        <span className={styles.imageBackground}>
                            <img src={restImages[0].url}/>
                        </span>
                    </div>
                    <p className={`text ${styles.restNumber}`}>{`+${restImages.length}`}</p>
                </li> : ''}
            {
                renderedImages.reverse().map((image) => (
                    <li className={styles.gradientBackground} key={image.id}>
                        <span className={styles.imageBackground}>
                            <img src={image.url}/>
                        </span>
                    </li>)
                )
            }
        </ul>
    );
};

export default ImageStack;