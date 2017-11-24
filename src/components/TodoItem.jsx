import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import { isCompleted } from './helpers.js';

const { dataToJS } = helpers;


class Item extends PureComponent {
    constructor(){
        super();

        this.onCheck = this.onCheck.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    onArchiveClick() {
        const { firebase, id } = this.props;
        
        // Archiving is one way so always set to to true
        firebase.set(`/archived/${id}`, { archived: true })
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
            id,
            style
        } = this.props;

        const styles = {
            color: isCompleted(completed, id) ? '#BDBDBD' : null,
            ...style
        }

        return(
            <ListItem
                className="todo-listitem"
                style={styles}
                primaryText={text}
                leftCheckbox={<Checkbox onCheck={this.onCheck} checked={isCompleted(completed, id)} />}
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
        completed: dataToJS(firebase, 'completed')
    })
)(WrappedItem);

