import React from 'react';
import headerStyles from "../appHeader/appHeader.module.css"
import {ProfileIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavList from "../headerNavList/headerNavList";
import HeaderLink from "../headerLink/headerLink";
import {useRouteMatch} from "react-router-dom";
import {useAppSelector} from "../../services/hooks";

const AppHeader = () => {

    const isProfilePageActive = useRouteMatch('/profile');

    //добавляем имя пользователя к линку на профиль
    const {userName} = useAppSelector(store => ({
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