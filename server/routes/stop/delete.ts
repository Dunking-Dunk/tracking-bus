import express, { Request, Response } from 'express'

import { Stop } from '../../models/Stop'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.delete('/api/stop/:id', async (req: Request, res: Response) => { 
    const { id } = req.params
    const stop = await Stop.findById(id)
    await stop?.busId?.map(async(busId) => {
        await Bus.updateOne({id: busId}, { $pull : {stops: id} })
    })
    await Stop.findByIdAndDelete(id)
    res.status(200).send("successfully deleted")
})

export {router as DeleteStop}