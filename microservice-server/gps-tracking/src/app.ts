import  express from "express";
import {createServer} from 'http'
import 'express-async-errors'
import bodyParser from "body-parser";
import { Server } from 'socket.io'
import cors from 'cors'

import { GetAllGpsTracker } from "./routes";
import { UpdateGpsTracker } from "./routes/update";
import {ErrorHandler} from '@hursunss/bus-tracking-common'
import { NotFoundError } from "@hursunss/bus-tracking-common";


const app = express();

app.use(cors())
app.set('trust proxy', true)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const httpServer = createServer(app)
const io = new Server(httpServer)

app.get('/', (req, res) => { 
    res.json('hello')
})

app.use(GetAllGpsTracker)
app.use(UpdateGpsTracker)

app.use('*', async() => { 
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app, httpServer, io };
