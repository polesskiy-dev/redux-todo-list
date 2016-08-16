export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REPLACE_TODO_TEXT = 'REPLACE_TODO_TEXT';
export const POST_TODOS = 'POST_TODOS';
export const GET_TODOS = 'GET_TODOS';

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

export const getTodos = () => {
    return {
        type: GET_TODOS
    }
};

