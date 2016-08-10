const mainReducer = function (state, action) {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
        case 'REMOVE_TODO':
        default:
            console.log("Main reducer invoked, state: %s", state);
            return state;
    }
};

export default mainReducer