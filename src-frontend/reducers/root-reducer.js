import {List} from 'immutable'
import * as Actions from '../actions/actions';

const initialTodosState = List([]);

const rootReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        /*
         * Add todo to state
         */
        case Actions.ADD_TODO :
            return state.push(action.payload);

        /*
         * Change todo view in accordance with done/not done.
         */
        case Actions.TOGGLE_TODO :
            console.log("List item must be toggled, with id %d, state: %o, appropriate item: %o", action.payload, state, state.get(action.payload));
            //TODO: investigate how to use nested immutable objects
            return state.updateIn([action.payload], (item) => Object.assign({}, item, {isDone: !item.isDone}));

        /*
         * Remove todo from state
         */
        case Actions.REMOVE_TODO:
            console.log("List item must be removed, with id %d, item to delete: %o", action.payload, state.get(action.payload));
            return state.delete(action.payload);


        default:
            console.log("Default in root-reducer invoked, state: ", state);
            return state;
    }
};

export default rootReducer