import {List, Map} from 'immutable'

import * as Actions from '../actions/actions';

const todosState = Map({
    todo: List([])
});

const mainReducer = function (state = todosState, action) {
    switch (action.type) {
        //converting the todo object into an immutable map before it’s pushed onto the list.
        case [Actions.ADD_TODO] :
            return todosState.push(Map(action.payload));
        case 'TOGGLE_TODO':
            //iterate over the todos list, find with appropriate id (from action.payload), call .update() to toggle "isDone" property
            return todosState.map(
                (todo) => {
                    if (todo.get('id') === action.payload)
                        return todo.update('isDone', isDone => !isDone)
                    else
                        return todo
                }
            );
        case 'REMOVE_TODO':
            //TODO: implement this
            break;
        default:
            console.log("Main reducer invoked, state: %s", todosState);
            return todosState;
    }
};

export default mainReducer