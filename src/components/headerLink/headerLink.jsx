import React from 'react';
import headerLink from "./headerLink.module.css"
import PropTypes from "prop-types";

const HeaderLink = (props) => {
    return (
        <a className={`${headerLink.link} pl-5 pr-5 pt-4 pb-4`}>
            {props.children}
        </a>
    );
};

HeaderLink.propTypes = {
    children: PropTypes.node.isRequired
};

export default HeaderLink;