import { io } from "./app"
import { Tracker } from "./models/Tracking"

export const connection = () => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} a user connected`)
        socket.on('stop-getLocation', (data) => {
            clearInterval(interval)
        })

        const interval = setInterval(async () => {
            const tracker = await Tracker.find({})
            io.emit('getAllBusLocation', tracker)
            tracker.forEach(track => {
                io.to(track.id).emit('getBusLocation', track)
            })
        }, 2000)

        socket.on('join-room', (room) => { 
            socket.join(room)
        })

        socket.on('leave-room', (room) => { 
            socket.leave(room)
        })

        socket.on('disconnect', () => {
            clearInterval(interval)
            console.log(`${socket.id} disconnected`)
        })
    })
}