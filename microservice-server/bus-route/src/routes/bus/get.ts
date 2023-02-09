import express, { Request, Response } from 'express'

import {NotFoundError} from '@hursunss/bus-tracking-common'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus-routes/:id', async (req: Request, res: Response) => { 
    const { id } = req.params
    const bus = await Bus.findById(id).populate('stops')

    if (!bus) {
        throw new NotFoundError()
    }
    
    res.status(200).send(bus)
})

export {router as GetBusRoute}