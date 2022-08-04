import React from 'react';
import headerStyles from "../appHeader/appHeader.module.css"
import {ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavList from "../headerNavList/headerNavList";
import HeaderLink from "../headerLink/headerLink";
import {useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";

const AppHeader = () => {

    const isProfilePageActive = useRouteMatch('/profile');

    //добавляем имя пользователя к линку на профиль
    const {userName} = useSelector(store => ({
        userName: store.user.user.name
    }))

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.content}>
                <HeaderNavList />
                <Logo />
                <HeaderLink to={`/profile`} caption={`Личный кабинет ${userName ? `(${userName})` : ''}`}>
                    <ProfileIcon type={isProfilePageActive ? 'primary' : 'secondary'}/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default AppHeader;