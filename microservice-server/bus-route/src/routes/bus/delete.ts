import express, { Request, Response } from 'express'

import { Bus } from '../../models/Bus'

const router = express.Router()

router.delete('/api/bus-routes/:id', async(req: Request, res: Response) => { 
    const { id } = req.params
    await Bus.deleteOne({id})
    res.status(200).send("successfully deleted")
})

export {router as DeleteBusRoute}