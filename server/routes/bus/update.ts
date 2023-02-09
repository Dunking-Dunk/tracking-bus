import express, { Request, Response } from 'express'

import { Bus } from '../../models/Bus'
import { NotFoundError } from '../../errors/not-found-error'
const router = express.Router()

router.put('/api/bus/:id', async(req: Request, res: Response) => { 
    const { id } = req.params
    
    const bus = await Bus.findById(id)

    if (!bus) {
        throw new NotFoundError()
    }

    bus.set(req.body)
    await bus.save()

    res.status(204).send(bus)
})

export {router as UpdateBusRoute}