import { Socket } from 'socket.io'

class Connection {
    socket: Socket
    io: any

    constructor(io: any, socket: Socket) {
        this.socket = socket
        this.io = io
        socket.on('connect_error', (err: Error) => {
            console.log(`connect_error due to ${err.message}`)
        })

        socket.on('msg', (data) => {
            console.log(socket.handshake.auth)
            console.log(data)
        })
    }

    disconnect() {
        console.log('user disconnected')
    }
}

function chat(io: any) {
    io.on('connection', (socket: Socket) => {
        new Connection(io, socket)
    })
}

export default chat
