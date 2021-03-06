import {Map, List} from 'immutable'
import * as types from '../constants/action-types';

const initialTodosState = Map({todos: List([])});

const rootReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        /** Todos CRUD section */
        /*
         * Add todo to state
         */
        case types.ADD_TODO :
            console.log("New todo item %o must be added, todos: %o", action.payload, state.get('todos'));
            return state.updateIn(['todos'], (todos)=>todos.push(Map(action.payload)));

        /*
         * Change todo view in accordance with done/not done.
         */
        case types.TOGGLE_TODO :
            console.log("List item must be toggled, with id %d, state: %o, appropriate item: %o", action.payload, state, state.get('todos').get(action.payload));
            return state.updateIn(['todos', action.payload, 'isDone'], (isDone)=>!isDone);

        /*
         * Remove todo from state
         */
        case types.REMOVE_TODO:
            console.log("List item must be removed, with id %d, item to delete: %o", action.payload, state.get('todos').get(action.payload));
            return state.deleteIn(['todos', action.payload]);

        /*
         * Replace text in todo
         */
        case types.REPLACE_TODO_TEXT:
            console.log("List item text must be replaced, with id %d, new item text: %s", action.payload.id, action.payload.text);
            return state.setIn(['todos', action.payload.id, 'text'], action.payload.text);

        /** todos server requests section*/
        /*
         * Posting todos to server request flow
         */
        case types.POST_TODOS:
            switch (action.payload.status) {
                case types.REQUEST.PENDING:
                    console.log("Request for posting todos will be sent to server");
                    return state;
                case types.REQUEST.SUCESS:
                    return state;
                case types.REQUEST.FAILURE:
                    console.error(action.payload.error);
                    return state;
                default:
                    return state;
            }

        /*
         * Fetching todos from server request flow
         */
        case types.FETCH_TODOS:
            console.log("fetch todos action passing through fetch %o, with status: %s", action, action.payload.status);
            switch (action.payload.status) {
                case types.REQUEST.PENDING:
                    console.log("Request for fetching todos will be sent to server");
                    return state;
                case types.REQUEST.SUCESS:
                    // Replace state todos by todos fetched from server
                    return state.set('todos', action.payload.response);
                case types.REQUEST.FAILURE:
                    console.error(action.payload.error);
                    return state;
                default:
                    return state;
            }

        /**todos visibility filter section*/
        case types.SET_VISIBILITY_FILTER:
            return state.set('visibilityFilter', action.payload.filter);

        /** test saga features*/
        case 'START':
            console.log('Timer started');
            return state;
        case 'STOP':
            console.log('Timer stopped');
            return state;
        case 'TICK':
            console.log('Timer ticked');
            return state;
        case 'RESET':
            console.log('Timer reset');
            return state;

        default:
            console.log("Default in root-reducer invoked, state: ", state);
            return state;
    }
};

export default rootReducer