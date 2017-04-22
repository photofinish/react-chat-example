const DEFAULT_ROOM = "0"

export default function listenWebSocket( io, store ) {
    io.on('connection', socket=>{
        console.log('a user connected')

        socket.emit("state", store.getState())

        socket.join(DEFAULT_ROOM)

        socket.on('action', action => {
            console.log('get client action:', action)
            switch (action.type) {
                case "SWITCH_ROOM":
                    return switchRoom(socket, action.roomId || DEFAULT_ROOM)
                case "NEW_MESSAGE":
                    if(socket.rooms){
                        for (let id in socket.rooms) {
                            if (id == action.message.roomId) {
                                socket.to(id).emit('message', action.message)
                            }
                        }
                    } else {
                        socket.emit('message', action.message)
                    }
                    // if(socket.rooms && socket.rooms.length>0){
                    //     socket.rooms.forEach(id=>{
                    //         socket.to(id).emit('message', action.message)
                    //     })
                    // }else{
                    //     socket.emit('message', action.message)
                    // }
                    return
            }

            store.dispatch(action)

            socket.emit('state', store.getState())

            if (["ADD_ROOM", "REMOVE_ROOM"].indexOf(action.type) > -1){
                socket.broadcast.emit('state', store.getState())
            }      
            
        })

        socket.on('disconnect', ()=>{
            console.log('user disconnected')
        })
    })
}

function switchRoom(socket, roomId) {
    for(let room in socket.rooms) {
        if (room != DEFAULT_ROOM) {
            socket.leave(room)
        }
    }

    setTimeout(()=> {
        socket.join(roomId)
        console.log("roomId:", roomId, 'socket.rooms', socket.rooms)
    }, 200)
}