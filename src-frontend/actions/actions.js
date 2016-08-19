/**
 * Actions.
 *
 * @see https://github.com/github/fetch
 * @see https://github.com/gaearon/redux-thunk
 * @see https://github.com/glenjamin/transit-immutable-js
 */
import {toJSON, fromJSON} from 'transit-immutable-js'
import * as types from '../constants/action-types'


/** util check http status function*/
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
};

/**
 * Todos CRUD actions
 */
export const addTodo = (text, isDone) => {
    return {
        type: types.ADD_TODO,
        payload: {
            isDone: isDone,
            text: text
        }
    }
};

export const toggleTodo = (id) => {
    return {
        type: types.TOGGLE_TODO,
        payload: id
    }
};

export const removeTodo = (id) => {
    return {
        type: types.REMOVE_TODO,
        payload: id
    }
};

export const replaceText = (id, text) => {
    return {
        type: types.REPLACE_TODO_TEXT,
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
        type: types.SET_VISIBILITY_FILTER,
        payload: {
            filter: filter
        }
    }
};

/**
 * Post single todo
 */
export const postSingleTodoStarted = (text, isDone) => {
    return {
        type: types.POST_SINGLE_TODO,
        payload: {
            status: types.REQUEST.PENDING,
            isDone: isDone,
            text: text
        }
    }
};

export const postSingleTodoSucess = (resp) => {
    return {
        type: types.POST_SINGLE_TODO,
        payload: {
            status: types.REQUEST.SUCESS,
            resp: resp
        }
    }
};

export const postSingleTodoFailure = (err) => {
    return {
        type: types.POST_SINGLE_TODO,
        payload: {
            status: types.REQUEST.ERROR,
            err: err
        }
    }
};


/**
 * Save (post) todos to server actions
 */
export const postTodosStarted = () => {
    return {
        type: types.POST_TODOS,
        payload: {
            status: types.REQUEST.PENDING
        }
    }
};

export const postTodosSucess = () => {
    return {
        type: types.POST_TODOS,
        payload: {
            status: types.REQUEST.SUCESS
        }
    }
};

export const postTodosFailure = (error) => {
    return {
        type: types.POST_TODOS,
        payload: {
            status: types.REQUEST.FAILURE,
            error: error
        }
    }
};

//action creator for posting todos (obtain from store (state)) to server flow
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
        type: types.FETCH_TODOS,
        payload: {
            status: types.REQUEST.PENDING
        }
    }
};

export const fetchTodosSucess = (todos) => {
    return {
        type: types.FETCH_TODOS,
        payload: {
            status: types.REQUEST.SUCESS,
            response: todos
        }
    }
};

export const fetchTodosFailure = (error) => {
    return {
        type: types.FETCH_TODOS,
        payload: {
            status: types.REQUEST.FAILURE,
            error: error
        }
    }
};

//action creator for fetching todos flow
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

