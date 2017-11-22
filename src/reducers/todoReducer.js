import * as types from '../actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case types.ADD_TODO:
            return state.concat([action.todo])
            
        default:
            return state;
    }
}