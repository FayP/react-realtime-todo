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

    onSubmit() {
        this.props.todoActions.addTodo({
                text: 'new Todo'
            })
    }
    
    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Add an item" onChange={this.onSubmit}/>
                    <button>X</button>
                </form>
            </div>
        )
    }
}

Toolbar.propTypes = {
    todos: PropTypes.array
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