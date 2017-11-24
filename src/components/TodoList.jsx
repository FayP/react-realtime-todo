import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import { List } from 'material-ui/List';

import Item from './TodoItem';

const { dataToJS, isLoaded, isEmpty } = helpers;

/**
 * @public
 * Test if the archived state of a given id is true.
 * 
 * @param {Object} archived 
 * @param {String} id
 * @return {Bool} 
 */
const isArchived = (archived, id) => !!archived && !!archived[id] && !!archived[id].archived;

/**
 * @public
 * Test if the completed state of a given id is true.
 * 
 * @param {Object} completed 
 * @param {String} id 
 * @return {Bool}
 */
const isCompleted = (completed, id) => !!completed && !!completed[id] && !!completed[id].completed; 

const shouldBeDisplayed = (archived, completed, id, selectedView) => {
    if(isArchived(archived, id)){
        return false;
    }

    if(selectedView === 'all'){
        return true;
    }

    if(isCompleted(completed, id) && selectedView === 'completed'){
        return true;
    }

    if(!isCompleted(completed, id) && selectedView === 'active'){
        return true;
    }

    return false;
}

class TodoList extends PureComponent {
    render() {
        const { archived, completed, todos, selectedView } = this.props;

        const todosList = (!isLoaded(todos))
            ? 'Loading...'
            : (isEmpty(todos))
            ? 'Task list empty'
            :  Object.keys(todos)
                .map(key =>(<Item 
                    key={key} 
                    id={key} 
                    text={todos[key].text} 
                    style={{
                        display: (shouldBeDisplayed(archived, completed, key, selectedView) ? 'block': 'none') 
                    }}/>));

        return (<List className="App-todolist">
           {todosList}
        </List>);
    }
}

TodoList.propsTypes = {
    todos: PropTypes.object,
    selectedView: PropTypes.string,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedList = firebase([
    '/todos',
    '/archived'
])(TodoList)

export default connect(
    (state) => ({
        todos: dataToJS(state.firebase, 'todos'),
        archived: dataToJS(state.firebase, 'archived'),
        completed: dataToJS(state.firebase, 'completed'),
        selectedView: state.viewManager.selectedView
    }),
)(WrappedList);