import React from 'react';
import styles from './Header.module.css'; 

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                TaskApp
            </div>
        </header>
    );
}

export default Header;
