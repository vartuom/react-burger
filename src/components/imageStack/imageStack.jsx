import React from 'react';
import styles from './imageStack.module.css'

const ImageStack = ({imagesArr}) => {

    //первые 5 элементов отрисовываем
    const renderedImages = imagesArr.slice(0, 5)
    //остальные закидываем в остаток
    const restImages = imagesArr.slice(5);

    return (
        <div className={styles.imageRow}>
            {restImages.length > 0 ?
                <div className={styles.restWrapper}>
                    <div className={`${styles.gradientBackground} ${styles.restImage}`}>
                        <span className={styles.imageBackground}>
                            <img src={restImages[0]}/>
                        </span>
                    </div>
                    <p className={`text ${styles.restNumber}`}>{`+${restImages.length}`}</p>
                </div> : ''}
            {
                renderedImages.reverse().map((imageUrl) => (
                    <div className={styles.gradientBackground}>
                        <span className={styles.imageBackground}>
                            <img src={imageUrl}/>
                        </span>
                    </div>)
                )
            }
        </div>
    );
};

export default ImageStack;