const IN_VIEW = 'IN_VIEW';

export const changeView = json => dispatch => {
       return dispatch({
            type: IN_VIEW,
            selectedView: json.selectedView
        })
    }