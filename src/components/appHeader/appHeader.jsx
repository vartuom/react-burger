import React from 'react';
import headerStyles from "../appHeader/appHeader.module.css"
import {ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavList from "../headerNavList/headerNavList";
import HeaderLink from "../headerLink/headerLink";
import {NavLink, useLocation} from "react-router-dom";

const AppHeader = () => {

    const location = useLocation();

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.content}>
                <HeaderNavList />
                <Logo />
                <HeaderLink to={`/profile`} caption={'Личный кабинет'}>
                    <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'}/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default AppHeader;