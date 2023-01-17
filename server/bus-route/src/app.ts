import express from "express";
import 'express-async-errors'
import bodyParser from "body-parser";
import cors from 'cors'

import {ErrorHandler} from '@hursunss/bus-tracking-common'
import { GetBusRoute } from "./routes/get";
import { GetAllBusRoute } from "./routes/index";
import { NewBusRoute } from "./routes/new";
import { DeleteBusRoute } from "./routes/delete";
import { UpdateBusRoute } from "./routes/update";
import { NotFoundError } from "@hursunss/bus-tracking-common";

const app = express();

app.use(cors())
app.set('trust proxy', true)
app.use(bodyParser.json())

app.use(NewBusRoute)
app.use(GetAllBusRoute)
app.use(GetBusRoute)
app.use(DeleteBusRoute)
app.use(UpdateBusRoute)

app.use('*', async(req, res) => { 
    throw new NotFoundError()
})

app.use(ErrorHandler)

export { app };
