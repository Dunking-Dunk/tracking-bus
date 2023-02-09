import { app, httpServer } from "./app"
import mongoose from "mongoose"
import { natsWrapper } from "./nats-wrapper"
import { BusCreatedListener } from "./events/listener/bus-created-listener"
import { connection } from './socket'

const start = async () => {
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("CLUSTER_ID is required")
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error("CLIENT_ID is required")
    }
    if (!process.env.NATS_URL) {
        throw new Error("NATS_URL is required")
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required")
    }
    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!')
            process.exit()
        })

        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        new BusCreatedListener(natsWrapper.client).listen()
        await mongoose.connect(process.env.MONGO_URI)
    
       connection()
    }
    catch (err) {
        console.error(err)
    }
 
    httpServer.listen(3000, () => {
        console.log('listening on port 3000')
    })
}

start()