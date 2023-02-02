import express, { Request, Response } from 'express'
import { Stop } from '../../models/Stop'

const router = express.Router()

router.get('/api/bus-routes/stop', async (req: Request, res: Response) => { 
   const stops = await Stop.find({}).populate('busId')

    res.status(200).json(stops)
})

export {router as GetAllStops}