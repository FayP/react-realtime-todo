import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import { List } from 'material-ui/List';

import Item from './TodoItem';

const { dataToJS } = helpers;

class TodoList extends PureComponent {
    render() {
        return (<List className="App-todolist">
            {this.props.todos && Object.keys(this.props.todos).map(key => {
                return <Item key={key} id={key} text={this.props.todos[key].text} />
            })}
        </List>);
    }
}

TodoList.propsTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedList = firebase([
    '/todos'
])(TodoList)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedList);