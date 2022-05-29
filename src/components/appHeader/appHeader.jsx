import React from 'react';
import headerStyles from "../appHeader/appHeader.module.css"
import {ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavList from "../headerNavList/headerNavList";
import HeaderLink from "../headerLink/headerLink";

const AppHeader = () => {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.content}>
                <HeaderNavList />
                <Logo />
                <HeaderLink>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                </HeaderLink>
            </div>
        </header>
    );
};

export default AppHeader;