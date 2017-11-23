import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

const { dataToJS } = helpers

class Toolbar extends Component {
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Add an item" ref={c => this._input = c}/>
                    <button>X</button>
                </form>
            </div>
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
])(Toolbar)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedToolbar);