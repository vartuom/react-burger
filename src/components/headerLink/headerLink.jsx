import React, {useCallback} from 'react';
import headerLink from "./headerLink.module.css"
import PropTypes from "prop-types";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";

const HeaderLink = ({children, to, match, caption}) => {

    const history = useHistory();
    const isLinkActive = useRouteMatch(match || to);

    console.log('match '+ match, ' to ' + to)

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
    children: PropTypes.node.isRequired
};

export default HeaderLink;