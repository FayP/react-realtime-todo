import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

class Item extends PureComponent {
    constructor(){
        super();

        this.onChange = this.onChange.bind(this);
        this.onArchiveClick = this.onArchiveClick.bind(this);
    }

    onArchiveClick() {
        this.props.todoActions.archiveTodo(this.props.id)
    }

    onChange() {
        this.props.todoActions.completeTodo(this.props.id)
    }

    render() {
        const {
            children
        } = this.props;

        return(
            <li>
                <input type='checkbox' onChange={this.onChange}/>
                    {children}
                <button onClick={this.onArchiveClick}>X</button>
            </li>
        )
    } 
}

Item.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string
}

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => ({
    todoActions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);

