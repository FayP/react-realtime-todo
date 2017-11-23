import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import Item from './Item';

const { dataToJS } = helpers;

class List extends PureComponent {
    render() {
        return (<ul>
            {this.props.todos && Object.keys(this.props.todos).map(key => {
                return <Item key={key} id={key}>{this.props.todos[key].text}</Item>
            })}
        </ul>);
    }
}

List.propsTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedList = firebase([
    '/todos'
])(List)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedList);