const initialState = {
    selectedView: 'all'
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'IN_VIEW':
            return {
                selectedView: action.selectedView
            }
        default:
            return state;
    }
}