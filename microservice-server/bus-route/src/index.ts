import { app } from "./app"
import mongoose from "mongoose"
import { natsWrapper } from "./nats-wrapper"

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

        process.on('SIGINT', () =>natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

       await mongoose.connect(process.env.MONGO_URI)
  
    }
    catch (err) {
        console.error(err)
    }
 
    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
}

start()