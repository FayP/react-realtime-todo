import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class Toolbar extends Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const result = {};

        result[Math.floor(Math.random()*100)] = {
            text: this._input.value
        };
        
        this.props.todoActions.addTodo(result);
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
    todos: PropTypes.object
}

const mapStateToProps = state => ({
        todos: state.todos
    })

const mapDispatchToProps = dispatch => ({
    todoActions: bindActionCreators(actions, dispatch)
   })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);