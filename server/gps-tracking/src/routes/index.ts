import express, { Request, Response } from "express";
import { Tracker } from "../models/Tracking";

const router = express.Router();

router.get('/api/gps-tracking', async (req: Request, res: Response) => {
    const trackers = await Tracker.find({}).populate('bus')
    res.status(200).send(trackers)
 })

export {router as GetAllGpsTracker}