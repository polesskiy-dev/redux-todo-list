const loggerMiddleware = store => next => action => {
    store;
    console.log("Was invoked action: %o", action);
    return next(action);
};

export default loggerMiddleware