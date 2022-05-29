import React from 'react';
import HeaderLink from "../headerLink/headerLink";
import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerNavStyle from "./headerNav.module.css"

const HeaderNavList = () => {
    return (
        <nav className={headerNavStyle.nav}>
            <ul className={headerNavStyle.list}>
                <li>
                    <HeaderLink>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
                    </HeaderLink>
                </li>
                <li>
                    <HeaderLink>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                    </HeaderLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavList;