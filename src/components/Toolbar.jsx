import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import TextField from 'material-ui/TextField';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { Toolbar } from 'material-ui/Toolbar';

const { dataToJS } = helpers;

class TodoToolbar extends Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        const { firebase } = this.props;
        e.preventDefault();
        
        firebase.push(`/todos`, { text: this._input.value })
        this._input.value = "";
    }
    
    render() {
        return (
            <Toolbar>
                <form onSubmit={this.onSubmit}>
                    <TextField type="text" placeholder="Add an item" ref={c => this._input = c} />
                    <IconButton tooltip="close">
                        <NavigationClose />
                    </IconButton>
                </form>
            </Toolbar>
        )
    }
}

Toolbar.propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedToolbar = firebase([
    '/todos'
])(TodoToolbar)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedToolbar);