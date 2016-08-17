/**
 * Action creators.
 *
 * @see https://github.com/github/fetch
 * @see https://github.com/gaearon/redux-thunk
 * @see https://github.com/glenjamin/transit-immutable-js
 */

import {toJSON, fromJSON} from 'transit-immutable-js'

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REPLACE_TODO_TEXT = 'REPLACE_TODO_TEXT';
export const POST_TODOS = 'POST_TODOS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const REQUEST = {PENDING: 'pending', SUCESS: 'sucess', FAILURE: 'failure'};
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/** util check http status function*/
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response;
        throw error
    }
};

/**
 * Todos CRUD actions
 */
export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        payload: {
            isDone: false,
            text: text
        }
    }
};

export const toggleTodo = (id) => {
    return {
        type: TOGGLE_TODO,
        payload: id
    }
};

export const removeTodo = (id) => {
    return {
        type: REMOVE_TODO,
        payload: id
    }
};

export const replaceText = (id, text) => {
    return {
        type: REPLACE_TODO_TEXT,
        payload: {
            id: id,
            text: text
        }
    }
};

/**
 * Todos visibility filter
 */
export const setTodosVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        payload: {
            filter: filter
        }
    }
};


/**
 * Save (post) todos to server actions
 */
export const postTodosStarted = () => {
    return {
        type: POST_TODOS,
        payload: {
            status: REQUEST.PENDING
        }
    }
};

export const postTodosSucess = () => {
    return {
        type: POST_TODOS,
        payload: {
            status: REQUEST.SUCESS
        }
    }
};

export const postTodosFailure = (error) => {
    return {
        type: POST_TODOS,
        payload: {
            status: REQUEST.FAILURE,
            error: error
        }
    }
};

export const postTodos = () => {
    return (dispatch, getState) => {
        dispatch(postTodosStarted());
        fetch('/todos', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: toJSON(getState().get('todos'))
        })
            .then(checkStatus)
            .then(()=> dispatch(postTodosSucess()))
            .catch(error=>dispatch(postTodosFailure(`Error ${error} while trying to post todos to server`)))
    }
};

/**
 * Fetch todos from server actions
 */
export const fetchTodosStarted = () => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.PENDING
        }
    }
};

export const fetchTodosSucess = (todos) => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.SUCESS,
            response: todos
        }
    }
};

export const fetchTodosFailure = (error) => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.FAILURE,
            error: error
        }
    }
};

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosStarted());
        return fetch('/todos')
            .then(checkStatus)
            .then(resp=>resp.text())
            .then(text=> dispatch(fetchTodosSucess(fromJSON(text))))
            .catch(error=>dispatch(fetchTodosFailure(`Error ${error} while trying to fetch todos from server`)))
    }
};

