import express, { Request, Response } from "express";
import { Tracker } from "../../models/Tracking";

const router = express.Router();

router.post('/api/gps-tracking/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const {lat, lng} = req.query
    console.log(lat,lng)
    const trackers = await Tracker.findOneAndUpdate({ gpsId: id }, {
        $push: {
            coords: {
                latitude: lat,
                longitude: lng,
                timestamp: Date.now()
    } } })

    res.status(200).send(trackers)
 })

export {router as UpdateGpsTracker}
