import {Map, List} from 'immutable'
import * as Actions from '../actions/actions';
import fetch from 'isomorphic-fetch'
import {toJSON} from 'transit-immutable-js'

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
        case Actions.REPLACE_TODO_TEXT:
            console.log("List item text must be replaced, with id %d, new item text: %s", action.payload.id, action.payload.text);
            return state.setIn(['todos', action.payload.id, 'text'], action.payload.text);

        case Actions.POST_TODOS:
            console.log("List of todos: %o must be serialized and sent to server", state.get('todos'));
            fetch('/todos', {
                method: 'post',
                body: toJSON(state.get('todos'))
            });
            return state;

        case Actions.RECEIVE_TODOS:
            console.log("Obtained new list of todos: %o", action.payload.todos);
            return state.set('todos', action.payload.todos);


        default:
            console.log("Default in root-reducer invoked, state: ", state);
            return state;
    }
};

export default rootReducer