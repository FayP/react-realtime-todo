import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import TextField from 'material-ui/TextField';
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
        
        firebase.push('/todos', { text: this._input.input.value })
        this._input.input.value = "";
    }
    
    render() {
        return (
            <Toolbar>
                <form onSubmit={this.onSubmit} style={{ width: '100%' }}>
                    <TextField type="text" id="task-entry" placeholder="Add a task" ref={c => this._input = c} />
                </form>
            </Toolbar>
        )
    }
}

TodoToolbar.propTypes = {
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