import * as types from '../actions/actionTypes';

const initialState = {
    todos: {},
    archived: [],
    completed: []
}

export default (state = initialState, action) => {
    console.log('state', state, action);
    switch(action.type) {
        case types.ADD_TODO:
           return {
                ...state,
                todos: { ...state.todos, ...action.todo }
           };
        case types.ARCHIVE_TODO:
           return {
               ...state,
               archived: [ ...state.archived, action.archivedId ]
           }
        case types.COMPLETE_TODO:
           return {
               ...state,
               completed: [ ...state.completed, action.completedId ]
           }
        default:
            return state;
    }
}