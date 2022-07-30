import React, {useEffect} from 'react';
import headerStyles from "../appHeader/appHeader.module.css"
import {ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavList from "../headerNavList/headerNavList";
import HeaderLink from "../headerLink/headerLink";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import store from "../../store";

const AppHeader = () => {

    const location = useLocation();
    const {userName} = useSelector(store => ({
        userName: store.user.user.name
    }))

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.content}>
                <HeaderNavList />
                <Logo />
                <HeaderLink to={`/profile`} caption={`Личный кабинет ${userName ? `(${userName})` : ''}`}>
                    <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'}/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default AppHeader;