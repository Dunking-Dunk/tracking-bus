import express, { Request, Response } from 'express'

import { Stop } from '../../models/Stop'

const router = express.Router()

router.delete('/api/bus-routes/stop/:id', async(req: Request, res: Response) => { 
    const { id } = req.params
    await Stop.deleteOne({id})
    res.status(200).send("successfully deleted")
})

export {router as DeleteStop}