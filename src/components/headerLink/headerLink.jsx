import React, {useCallback} from 'react';
import headerLink from "./headerLink.module.css"
import PropTypes from "prop-types";
import {useHistory, useRouteMatch} from "react-router-dom";

const HeaderLink = ({children, to, match, caption}) => {

    const history = useHistory();
    //если не передан объект с опциями для расширенного сравнения, просто матчим ссылку для линка
    //объект match вида {
    //         path: ["/", "/ingredients/:id", "/order"],
    //         exact: true
    //     }
    // нужен для того, что не дать главной странице "/" матчиться по любым линкам
    const isLinkActive = useRouteMatch(match || to);

    const onClick = useCallback(() => {
        history.push({pathname: to});
    }, [history, to])

    return (
        <div onClick={onClick} className={`${headerLink.link} pl-5 pr-5 pt-4 pb-4`}>
            {children}
            <p className={isLinkActive ? 'text text_type_main-default text_color_primary'
                    : 'text text_type_main-default text_color_inactive'}>
                {caption}
            </p>
        </div>
    );
};

HeaderLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    match: PropTypes.object,
    caption: PropTypes.string.isRequired
};

export default HeaderLink;