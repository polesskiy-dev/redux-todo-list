import {List} from 'immutable'

import * as Actions from '../actions/actions';

const initialTodosState = List([]);

const rootReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        /*
         * Add todo to state,
         * converting the todo object into an immutable map before it’s pushed onto the list.
         */
        case Actions.ADD_TODO :
            return state.push(action.payload);
        case Actions.TOGGLE_TODO :
            /*
             * Change todo view in accordance with done/not done.
             * iterate over the todos list, find with appropriate id (from action.payload), call .update() to toggle "isDone" property
             */
            console.log("List item must be toggled, with id %d, state: %o", action.payload, state);
            return state.map(
                (todoIListItem) => {
                    if (todoIListItem.get('id') === action.payload)
                        return todoIListItem.update('isDone', isDone => !isDone);
                    else {
                        return todoIListItem
                    }
                }
            );
        /*
         * Remove todo from state
         */
        case Actions.REMOVE_TODO:
            console.log("List item must be removed, with id %d, state: %o", action.payload, state);
            return state.filter((todoIListItem)=> {
                return todoIListItem.get('id') !== action.payload
            });
        default:
            console.log("Main reducer invoked, state: %s", state);
            return state;
    }
};

export default rootReducer