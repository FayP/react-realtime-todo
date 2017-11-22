import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import Item from './Item';

class List extends PureComponent {
    render() {
        console.log(this.props.todos);
        return (<ul>
            <Item>A test item</Item>
            {this.props.todos && Object.keys(this.props.todos).map(key => {
                return <Item key={key} id={key}>{this.props.todos[key].text}</Item>
            })}
        </ul>);
    }
}

List.propsTypes = {
    todos: PropTypes.object,
    todoActions: PropTypes.object
}

const mapStateToProps = state => {
    console.log('list state', state)
    return {
        todos: state.manager.todos
    }
}

const mapDispatchToProps = dispatch => ({
    todoActions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);