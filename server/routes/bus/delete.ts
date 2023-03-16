import express, { Request, Response } from 'express'

import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'
import { Tracker } from '../../models/Tracking'

const router = express.Router()

router.delete('/api/bus/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const bus = await Bus.findById(id)
    await bus?.stops.map(async(stopId) => {
        await Stop.updateOne({id: stopId}, { $pull : {busId: id} })
    })
    await Tracker.updateOne({id: bus?.tracker }, {bus: null})
    await Bus.findByIdAndDelete(id)
    res.status(200).send("successfully deleted")
})

export {router as DeleteBusRoute}