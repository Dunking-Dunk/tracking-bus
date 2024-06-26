import express, { Request, Response } from 'express'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus-routes', async (req: Request, res: Response) => { 
    const { search } = req.query
    let buses;
    if (search) {
        buses = await Bus.find({ busNumber: search }).populate('stops')
    } else {
        buses = await Bus.find({}).populate('stops')
    }

    res.status(200).json(buses)
})

export {router as GetAllBusRoute}   