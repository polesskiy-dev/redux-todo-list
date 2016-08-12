import {Map, List} from 'immutable'
import * as Actions from '../actions/actions';

const initialTodosState = Map({todos: List([])});

const rootReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        /*
         * Add todo to state
         */
        case Actions.ADD_TODO :
            console.log("New todo item %o must be added, todos: %o", Map(action.payload), state.get('todos'));
            return state.updateIn(['todos'], (todos)=>todos.push(Map(action.payload)));

        /*
         * Change todo view in accordance with done/not done.
         */
        case Actions.TOGGLE_TODO :
            console.log("List item must be toggled, with id %d, state: %o, appropriate item: %o", action.payload, state, state.get('todos').get(action.payload));
            return state.updateIn(['todos', action.payload, 'isDone'], (isDone)=>!isDone);

        /*
         * Remove todo from state
         */
        case Actions.REMOVE_TODO:
            console.log("List item must be removed, with id %d, item to delete: %o", action.payload, state.get('todos').get(action.payload));
            return state.deleteIn(['todos', action.payload]);

        /*
         * Replace text in todo
         */
        case Actions.REPLACE_TODO:
            return state.setIn(['todos', action.payload.id, 'text'], action.payload.text);


        default:
            console.log("Default in root-reducer invoked, state: ", state);
            return state;
    }
};

export default rootReducer