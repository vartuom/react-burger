import React from 'react';
import HeaderLink from "../headerLink/headerLink";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerNavStyle from "./headerNav.module.css"
import {NavLink, useLocation} from "react-router-dom";

const HeaderNavList = () => {

    const location = useLocation();
    return (
        <nav className={headerNavStyle.nav}>
            <ul className={headerNavStyle.list}>
                <li>
                    <HeaderLink to={`/`} caption={'Конструктор'}>
                        <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                    </HeaderLink>
                </li>
                <li>
                    <HeaderLink to={`/login`} caption={'Лента заказов'}>
                        <ListIcon type={location.pathname === '/list' ? 'primary' : 'secondary'}/>
                    </HeaderLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavList;