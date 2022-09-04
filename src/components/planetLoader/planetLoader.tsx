import React from 'react';
import styles from './planetLoader.module.css'

const PlanetLoader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.content}>
                <div className={styles.planet}>
                    <div className={styles.ring}></div>
                    <div className={styles.coverRing}></div>
                    <div className={styles.spots}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <p className={'text text_color_inactive'}>Обработка...</p>
            </div>
        </div>
    );
};

export default PlanetLoader;