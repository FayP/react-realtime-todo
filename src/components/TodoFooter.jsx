import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebase, helpers } from 'react-redux-firebase';
import { bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionList from 'material-ui/svg-icons/action/list';
import ImageTimelapse from 'material-ui/svg-icons/image/timelapse';

const { dataToJS } = helpers;
const viewList = [
    'all',
    'active',
    'completed'
];

class TodoFooter extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: viewList[props.selectedView] || 0
        }
    }

    onSelect = index => {
        this.props.changeView.changeView({ selectedView: viewList[index]})
        this.setState({
            selectedIndex: index
        })
    }

    render(){
        return (
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <BottomNavigationItem label={viewList[0]} icon={<ActionList />} onClick={() => this.onSelect(0)} />
                <BottomNavigationItem label={viewList[1]} icon={<ImageTimelapse />} onClick={() => this.onSelect(1)} />
                <BottomNavigationItem label={viewList[2]} icon={<ActionDoneAll />} onClick={() => this.onSelect(2)} />
            </BottomNavigation>
        );
    }
}

TodoFooter.propsTypes = {
    todos: PropTypes.object,
    completed: PropTypes.object
}

const WrappedList = firebase([
    '/todos',
    '/completed'
])(TodoFooter)


const mapDispatchToProps = dispatch => ({
    changeView: bindActionCreators(actions, dispatch)
})

export default connect(
    (state) => ({
            todos: dataToJS(state.firebase, 'todos'),
            selectedView: state.viewManager.selectedView
        }),
    mapDispatchToProps
)(WrappedList);