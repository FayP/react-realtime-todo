import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import Item from './Item';

class List extends PureComponent {
    render() {
        return (<ul>
            <Item>A test item</Item>
            {this.props.todos && this.props.todos.map((todo, i) => {
                return <Item key={i}>{todo.text}</Item>
            })}
        </ul>);
    }
}

List.propsTypes = {
    todos: PropTypes.array,
    todoActions: PropTypes.object
}

const mapStateToProps = state => ({
        todos: state.todos
    })

const mapDispatchToProps = dispatch => ({
    todoActions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);