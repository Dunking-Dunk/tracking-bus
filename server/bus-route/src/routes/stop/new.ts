import express, {Request, Response} from 'express'
import { Stop } from "../../models/Stop";
import { body } from 'express-validator';
import {ValidateRequest} from '@hursunss/bus-tracking-common'

const router = express.Router()

router.post('/api/bus-routes/stop',
    [
        body('coords').not().isEmpty().withMessage('coordinates are required'),
        body('name').not().isEmpty().withMessage('name is required'),
        body('timing').not().isEmpty().withMessage('timing is required'),
], ValidateRequest, async (req: Request, res: Response) => {
    const stop = Stop.build(req.body)
    await stop.save()

    res.send(stop).status(201)
})

export { router as NewStopRoute}