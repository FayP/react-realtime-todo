import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

const { dataToJS } = helpers;

/**
 * @public
 * Test if the completed state of a given id is true.
 * 
 * @param {Object} completed 
 * @param {String} id 
 * @return {Bool}
 */
const isCompleted = (completed, id) => !!completed && !!completed[id] && !!completed[id].completed; 

/**
 * @public
 * Test if the archived state of a given id is true.
 * 
 * @param {Object} archived 
 * @param {String} id
 * @return {Bool} 
 */
const isArchived = (archived, id) => !!archived && !!archived[id] && !!archived[id].archived; 

class Item extends PureComponent {
    constructor(){
        super();

        this.onChange = this.onChange.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    onArchiveClick() {
        const { firebase, id, archived } = this.props;
        const value = !isArchived(archived, id);
        
        // If the current item is marked as archived, unarchive it
        firebase.set(`/archived/${id}`, { archived: value })
    }

    onChange() {
        const { firebase, id, completed } = this.props;
        const value = !isCompleted(completed, id);

        // If the current item is marked as complete, set it to be false
        firebase.set(`/completed/${id}`, { completed: value })  
    }

    render() {
        const {
            children,
            completed,
            id
        } = this.props;

        return(
            <li className="todo-listitem">
                <input type='checkbox' onChange={this.onChange} checked={isCompleted(completed, id)}/>
                    {children}
                <button onClick={this.onArchiveClick}>X</button>
            </li>
        )
    } 
}

Item.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    todos: PropTypes.object,
    completed: PropTypes.object,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedItem = firebase([
    '/todos',
    '/completed',
    '/archived'
])(Item)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos'),
        completed: dataToJS(firebase, 'completed'),
        archived: dataToJS(firebase, 'archived')
    })
)(WrappedItem);

