import express, { Request, Response } from "express";
import { Tracker } from "../../models/Tracking";
import { requireAuth } from "../../middleware/require-auth";

const router = express.Router();

router.post('/api/gps-tracking',requireAuth, async (req: Request, res: Response) => {

    const trackers = await Tracker.build(req.body)
    await trackers.save()

    res.status(200).send(trackers)
 })

export {router as NewGpsTracker}