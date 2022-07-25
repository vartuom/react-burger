import React from 'react';
import HeaderLink from "../headerLink/headerLink";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerNavStyle from "./headerNav.module.css"
import {NavLink} from "react-router-dom";

const HeaderNavList = () => {
    return (
        <nav className={headerNavStyle.nav}>
            <ul className={headerNavStyle.list}>
                <li>
                    <HeaderLink>
                        <BurgerIcon type="primary" />
                        <NavLink
                            to={{ pathname: `/` }}
                            className={"text text_type_main-default text_color_inactive"}
                        >
                            Конструктор
                        </NavLink>
                    </HeaderLink>
                </li>
                <li>
                    <HeaderLink>
                        <ListIcon type="secondary" />
                        <NavLink
                            to={{ pathname: `/` }}
                            className={"text text_type_main-default text_color_inactive"}
                        >
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </NavLink>
                    </HeaderLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavList;