import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import { List } from 'material-ui/List';

import Item from './TodoItem';
import { isCompleted, isArchived } from './helpers.js';

const { dataToJS, isLoaded, isEmpty } = helpers;

/**
 * @private
 * Determine if the current item should be in view based on 
 * the selected view and if it's completed or archived.
 * 
 * @param {Object} archived List of archived tasks
 * @param {Object} completed List of completed tasks
 * @param {String} id id of current task
 * @param {String} selectedView The current selected view
 * 
 * @return
 */
const shouldBeDisplayed = (archived, completed, id, selectedView) => {
    if(isArchived(archived, id)){
        return false;
    }

    if(selectedView === 'all'){
        return true;
    }

    if(isCompleted(completed, id)) {
        if(selectedView === 'completed'){
            return true;
        }
    } else if(selectedView === 'active') {
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
    completed: PropTypes.object,
    archived: PropTypes.object,
    selectedView: PropTypes.string
}

const WrappedList = firebase([
    '/todos',
    '/archived'
])(TodoList)

export default connect(
    ({firebase, viewManager}) => ({
        todos: dataToJS(firebase, 'todos'),
        archived: dataToJS(firebase, 'archived'),
        completed: dataToJS(firebase, 'completed'),
        selectedView: viewManager.selectedView
    }),
)(WrappedList);