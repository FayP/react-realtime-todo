import React from 'react';
import PropTypes from 'prop-types';

const Item = props => (
    <li>{props.children}</li>
);

Item.propTypes = {
    value: PropTypes.string
}

export default Item;

