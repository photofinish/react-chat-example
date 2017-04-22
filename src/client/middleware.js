export const socketMiddleware = socket => store => next => action => {
    if(action.meta && action.meta.remote) {
        socket.emit('action', action)
    }
    return next(action) 
}


export const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    const nextState = store.getState()
    console.log('next state', nextState.toJS? nextState.toJS() : nextState)
    console.groupEnd(action.type)
    return result
}


export const thunk = store => next => action => 
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action)

export const timeoutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action)
    }

    let timeoutId = setTimeout(
        () => next(action),
        action.meta.delay
    )

    return function cancel() {
        clearTimeout(timeoutId)
    }
}

const vanillaPromise = store => next => action => {
    if (typeof action.then != 'function') {
        return next(action)
    }

    return Promise.resolve(action).then(store.dispatch)
}

const readyStatePromise = store => next => action => {
    if (!action.promise) {
        return next(action)
    }

    function makeAction(ready, data) {
        let newAction = Object.assign({}, action, {ready}, data)
        delete newAction.promise
        return newAction
    }

    next(makeAction(false))
    return action.promise.then(
        result => next(makeAction(true, {result})),
        error => next(makeAction(true, {error}))
    )
}