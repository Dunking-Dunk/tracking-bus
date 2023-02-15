import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import 'express-async-errors'
import bodyParser from "body-parser";
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { NotFoundError } from './errors/not-found-error'
import {ErrorHandler} from './middleware/error-handler'
import { GetBusRoute } from "./routes/bus/get";
import { GetAllBusRoute } from "./routes/bus/index";
import { NewBusRoute } from "./routes/bus/new";
import { DeleteBusRoute } from "./routes/bus/delete";
import { UpdateBusRoute } from "./routes/bus/update";
import { GetBusQuickStats } from "./routes/bus/quickStats";

import { NewStopRoute } from "./routes/stop/new";
import { GetAllStops } from "./routes/stop";
import { GetStop } from "./routes/stop/get";
import { DeleteStop } from "./routes/stop/delete";

import { NewGpsTracker } from './routes/tracking/new';
import { GetAllGpsTracker } from './routes/tracking';
import { UpdateGpsTracker } from './routes/tracking/update';

const app = express();

app.use(cors())
app.set('trust proxy', true)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(NewBusRoute)
app.use(GetAllBusRoute)

app.use(NewStopRoute)
app.use(GetAllStops)
app.use(GetStop)
app.use(DeleteStop)

app.use(GetBusQuickStats)
app.use(GetBusRoute)
app.use(DeleteBusRoute)
app.use(UpdateBusRoute)

app.use(UpdateGpsTracker)
app.use(NewGpsTracker)
app.use(GetAllGpsTracker)


app.use('*', async(req, res) => { 
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app, io, httpServer };