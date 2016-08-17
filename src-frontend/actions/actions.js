import {fromJSON} from 'transit-immutable-js'

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REPLACE_TODO_TEXT = 'REPLACE_TODO_TEXT';
export const POST_TODOS = 'POST_TODOS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const REQUEST = {PENDING: 'pending', SUCESS: 'sucess', FAILURE: 'failure'};

/**
 * Action creators
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

export const postTodos = () => {
    return {
        type: POST_TODOS
    }
};

export const getTodosRequest = () => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.PENDING
        }
    }
};

export const getTodosSucess = (todos) => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.SUCESS,
            response: todos
        }
    }
};

export const getTodosFailure = (error) => {
    return {
        type: FETCH_TODOS,
        payload: {
            status: REQUEST.FAILURE,
            error: error
        }
    }
};

export const getTodos = () => {
    return (dispatch) => {
        dispatch(getTodosRequest());
        return fetch('/todos')
            .then(resp=>resp.text())
            .then(text=> dispatch(getTodosSucess(fromJSON(text))))
            .catch(error=>dispatch(getTodosFailure(`Error ${error} while trying to fetch todos from server`)))
    }
};

