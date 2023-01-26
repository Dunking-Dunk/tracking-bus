import express, { Request, Response } from "express";
import { Tracker } from "../models/Tracking";

const router = express.Router();

router.post('/api/gps-tracking/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const trackers = await Tracker.findById(id)
    console.log(id)
    // if (trackers) { 
    //     console.log(req.query)
    //     console.log(trackers)
    // }
    res.status(200).send(trackers)
 })

export {router as UpdateGpsTracker}