import express, { Request, Response } from 'express'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus', async (req: Request, res: Response) => { 
    const { search, populate } = req.query

    let buses;
    if (search) {
        buses = await Bus.find({ busNumber: search }).populate('stops')
    } else {
        if (populate)  buses = await Bus.find({}).populate('stops')
        else buses = await Bus.find({})
    }

    res.status(200).json(buses)
})

export {router as GetAllBusRoute}   