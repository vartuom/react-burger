import React from 'react';
import HeaderLink from "../headerLink/headerLink";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerNavStyle from "./headerNav.module.css"
import {NavLink, useLocation, useRouteMatch} from "react-router-dom";

const HeaderNavList = () => {

    const isMainPageActive = useRouteMatch({
        path: ["/", "/ingredients/:id", "/order"],
        exact: true
    });
    const isListPageActive = useRouteMatch('/list');

    const location = useLocation();
    return (
        <nav className={headerNavStyle.nav}>
            <ul className={headerNavStyle.list}>
                <li>
                    <HeaderLink to={`/`} match={{
                        path: ["/", "/ingredients/:id", "/order"],
                        exact: true
                    }} caption={'Конструктор'}>
                        <BurgerIcon type={isMainPageActive ? 'primary' : 'secondary'}/>
                    </HeaderLink>
                </li>
                <li>
                    <HeaderLink to={`/list`} caption={'Лента заказов'}>
                        <ListIcon type={isListPageActive ? 'primary' : 'secondary'}/>
                    </HeaderLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavList;