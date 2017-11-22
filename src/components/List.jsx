import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebase, helpers } from 'react-redux-firebase';
import * as actions from '../actions/actions';

import Item from './Item';

const { dataToJS } = helpers

class List extends PureComponent {
    render() {
        console.log(this.props);
        return (<ul>
            {this.props.todos && Object.keys(this.props.todos).map(key => {
                return <Item key={key} id={key}>{this.props.todos[key].text}</Item>
            })}
        </ul>);
    }
}

List.propsTypes = {
    todos: PropTypes.object,
    todoActions: PropTypes.object
}

// const mapStateToProps = state => {
//     console.log('list state', state)
//     return {
//         todos: state.todos
//     }
// }

// const mapDispatchToProps = dispatch => ({
//     todoActions: bindActionCreators(actions, dispatch)
// })

const WrappedList = firebase([
    '/todos'
])(List)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedList);