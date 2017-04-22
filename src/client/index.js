import ReactDOM from "react-dom"
import React from "react"
import {ConnectedApp} from "./components/App"

import {Provider} from "react-redux"

import {createStore, applyMiddleware} from "redux"
import {logger, socketMiddleware} from './middleware'

import rootReducer from "./reducer"
import {setState, newMessage} from "./actionCreator"
import {getInitialState, saveToStorage} from "./store"

import {socket} from "./io"

const createStoreWithMiddleware = applyMiddleware(
    logger, socketMiddleware(socket)
)(createStore)

const store = createStoreWithMiddleware( rootReducer, getInitialState() )

socket.on("state", state=>{
    store.dispatch(setState(state))
})

socket.on("message", message=>{
    store.dispatch(newMessage(message, true))
})


//----------------------
let $app = document.getElementById("app")

function render() {
    const fakeState = store.getState()
    ReactDOM.render(

        <Provider store = {store}>
            <ConnectedApp />
        </Provider>
        , $app
    )
    
}



render()

store.subscribe(()=>{
    saveToStorage(store.getState())
})