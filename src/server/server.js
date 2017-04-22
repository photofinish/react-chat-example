import express from "express"
import {Server} from "http"

let app = express()
let http = Server( app )

// configs
let rootPath = require('path').normalize(__dirname + '/../..')
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static( rootPath + "/public" ))

let io = require('socket.io')(http);

import {makeStore} from "./store"
import listenWebSocket from "./io"

const store = makeStore()
listenWebSocket( io, store )

import {indexCtrl} from "./controller"
app.use(indexCtrl(store))

// app.get("/", (req, res)=>{
//     res.render("index")
// })

let port = 3000
http.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})