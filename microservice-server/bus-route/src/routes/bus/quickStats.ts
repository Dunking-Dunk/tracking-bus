import express, { Request, Response } from 'express'
import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'

const router = express.Router()

router.get('/api/bus-routes/quick-stats', async (req: Request, res: Response) => { 
    const morningToCollege = await Bus.countDocuments({morningToCollege: true })
    const returnAfter315 = await Bus.countDocuments({ returnAfter315: true })
    const totalStops = await Stop.countDocuments({})
    const totalBus = await Bus.countDocuments({})

    res.status(200).send({
        morningToCollege, returnAfter315, totalStops,  totalBus
    })
})

export {router as GetBusQuickStats}   