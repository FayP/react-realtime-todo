import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

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

        this.onCheck = this.onCheck.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    onArchiveClick() {
        const { firebase, id, archived } = this.props;
        const value = !isArchived(archived, id);
        
        // If the current item is marked as archived, unarchive it
        firebase.set(`/archived/${id}`, { archived: value })
    }

    onCheck() {
        const { firebase, id, completed } = this.props;
        const value = !isCompleted(completed, id);

        // If the current item is marked as complete, set it to be false
        firebase.set(`/completed/${id}`, { completed: value })  
    }

    render() {
        const {
            text,
            completed,
            archived,
            id
        } = this.props;

        const styles = {
            color: isArchived(archived, id) ? '#BDBDBD' : null
        }

        return(
            <ListItem 
                className="todo-listitem"
                style={styles}
                primaryText={text}
                leftCheckbox={<Checkbox onCheck={this.onCheck} checked={isCompleted(completed, id)} disabled={isArchived(archived, id)} />}
                rightIconButton={<IconButton tooltip="archive todo" onClick={this.onArchiveClick} iconStyle={styles}><NavigationClose /></IconButton>}
            />
        )
    } 
}

Item.propTypes = {
    text: PropTypes.string,
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

