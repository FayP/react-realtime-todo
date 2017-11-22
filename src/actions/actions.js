import * as types from './actionTypes';

export const addTodo = json => {
    return (dispatch => {
        dispatch({
            type: types.ADD_TODO,
            todo: json
        })
    });
}

export const archiveTodo = json => {
    return (dispatch => {
        dispatch({
            type: types.ARCHIVE_TODO,
            archivedId: json
        })
    });
}

export const completeTodo = json => {
    return (dispatch => {
        dispatch({
            type: types.COMPLETE_TODO,
            completedId: json
        })
    });
}