import express from "express";
import 'express-async-errors'
import bodyParser from "body-parser";
import cors from 'cors'

import { NotFoundError } from "@hursunss/bus-tracking-common";
import {ErrorHandler} from '@hursunss/bus-tracking-common'
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

const app = express();

app.use(cors())
app.set('trust proxy', true)
app.use(bodyParser.json())


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



app.use('*', async(req, res) => { 
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app };
