import * as types from './actionTypes';

export const addTodo = json => {
    return (dispatch => {
        dispatch({
            type: types.ADD_TODO,
            todo: json
        })
    });
}