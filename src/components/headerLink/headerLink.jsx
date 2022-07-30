import React, {useCallback} from 'react';
import headerLink from "./headerLink.module.css"
import PropTypes from "prop-types";
import {useHistory, useLocation} from "react-router-dom";

const HeaderLink = ({children, to, caption}) => {

    const history = useHistory();
    const location = useLocation();

    const onClick = useCallback(() => {
        history.replace({pathname: to});
    }, [history, to])

    return (
        <div onClick={onClick} className={`${headerLink.link} pl-5 pr-5 pt-4 pb-4`}>
            {children}
            <p className={location.pathname === to ? 'text text_type_main-default text_color_primary'
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