import React from 'react';
import styles from './scrollBox.module.css'

const ScrollBox = ({children}) => {
    return (
        <div className={styles.scrollBox}>
            {children}
        </div>
    );
};

export default ScrollBox;