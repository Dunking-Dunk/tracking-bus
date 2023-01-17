import express, { Request, Response } from 'express'

import { Bus } from '../models/Bus'
import { NotFoundError } from '@hursunss/bus-tracking-common'

const router = express.Router()

router.put('/api/bus-routes/:id', async(req: Request, res: Response) => { 
    const { id } = req.params
    
    const bus = await Bus.findById(id)

    if (!bus) {
        throw new NotFoundError()
    }

    bus.set(req.body)
    await bus.save()

    res.status(204)
})

export {router as UpdateBusRoute}