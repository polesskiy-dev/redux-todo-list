let todoId = 0;

export const ADD_TODO = 'ADD_TODO';

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        payload: {
            id: todoId++,
            isDone: false,
            text: text
        }
    }
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
};

export const removeTodo = (id) => {
    return {
        type: 'REMOVE_TODO',
        payload: id
    }
};

