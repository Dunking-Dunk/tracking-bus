import { instrument } from "@socket.io/admin-ui"
import { io } from "./app"
import { Tracker } from "./models/Tracking"

export const connection = async() => {

    const collection = Tracker.collection
    const changeStream = collection.watch([])

    changeStream.on('change', (event) => {
        if (event.operationType === 'update') {
            const id = String(event.documentKey._id)
            const location:any = event.updateDescription.updatedFields
            const coord = Object.keys(location)
            const locations = coord.map((key) => ({ id: location[key] }))
            io.in(id).emit("getBusLocation", locations[0]);
            io.sockets.emit('getAllBusLocation', locations)
        }
    })

    io.on("connection", (socket) => {
        console.log(`${socket.id} a user connected`)
   
        socket.on('join-room', (room) => { 
            socket.join(room)
        })

        socket.on('leave-room', (room) => { 
            socket.leave(room)
        })

        socket.on('disconnect', () => {

            console.log(`${socket.id} disconnected`)
        })
    })
}

instrument(io,{auth: false})




//extra code and old
// socket.on('stop-getLocation', (data) => {
        //     // clearInterval(interval)
        // })
         // clearInterval(interval)
        // const interval = setInterval(async () => {
        //     const tracker = await Tracker.find({})
        //     io.emit('getAllBusLocation', tracker)
        //     tracker.forEach(track => {
        //         io.to(track.id).emit('getBusLocation', track)
        //     })
        // }, 2000)