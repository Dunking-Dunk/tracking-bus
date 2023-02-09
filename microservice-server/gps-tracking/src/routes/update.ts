import express, { Request, Response } from "express";
import { Tracker } from "../models/Tracking";

const router = express.Router();

router.post('/api/gps-tracking/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const {lat, lng} = req.query
    console.log(id, lat, lng)
    const trackers = await Tracker.findById(id)
    console.log(trackers)
    if (trackers) { 
        trackers.set({
            coords: {
                latitude: lat,
                longitude: lng
        }})
    }

    await trackers?.save()

    res.status(200).send(trackers)
 })

export {router as UpdateGpsTracker}