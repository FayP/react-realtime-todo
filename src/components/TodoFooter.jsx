import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';

const { dataToJS } = helpers;

class TodoFooter extends PureComponent {
    state = {
        selectedIndex: 0,
    }

    onSelect = index => {
        this.setState({
            selectedIndex: index
        })
    }

    render(){
        const { firebase, todos, completed } = this.props;
        return (
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem label="all" icon={<ActionList />} onClick={() => this.onSelect(0)} />
                <BottomNavigationItem label="active" icon={<ImageTimelapse />} onClick={() => this.onSelect(1)} />
                <BottomNavigationItem label="completed" icon={<ActionDoneAll />} onClick={() => this.onSelect(2)} />
            </BottomNavigation>
        );
    }
}

TodoFooter.propsTypes = {
    todos: PropTypes.object,
    completed: PropTypes.object,
    firebase: PropTypes.shape({
        push: PropTypes.func.isRequired
      })
}

const WrappedList = firebase([
    '/todos',
    '/completed'
])(TodoFooter)

export default connect(
    ({firebase}) => ({
        todos: dataToJS(firebase, 'todos')
    })
)(WrappedList);