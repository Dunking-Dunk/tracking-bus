import { io } from "./app"
import { Tracker } from "./models/Tracking"

export const connection = () => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} a user connected`)
        socket.on('stop-getLocation', (data) => {
            console.log(data)
            clearInterval(interval)
        })

        const interval = setInterval(async () => {
            const tracker = await Tracker.find({})
            io.emit('getLocation', tracker)
        }, 10000)


        socket.on('disconnect', () => {
            clearInterval(interval)
            console.log(`${socket.id} disconnected`)
        })
    })
}