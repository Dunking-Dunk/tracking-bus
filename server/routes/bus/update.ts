import express, { Request, Response } from 'express'

import { Bus } from '../../models/Bus'
import { NotFoundError } from '../../errors/not-found-error'
const router = express.Router()
import {requireAuth} from '../../middleware/require-auth'
import { Tracker } from '../../models/Tracking'
import { Stop } from '../../models/Stop'

router.put('/api/bus/:id',requireAuth, async(req: Request, res: Response) => { 
    const { id } = req.params
    const { quickedit } = req.query
    
    if (quickedit === 'true') { 
        await req.body.busesId?.map(async (id: any) => {
             const bus = await Bus.findById(id)
             if (!bus) {
                throw new NotFoundError()
            }
            bus.set(req.body.edit)
            await bus.save()
         
        })
        res.status(204).send('suucessfully updated')
    }
    else {
        const bus = await Bus.findById(id)

        if (!bus) {
            throw new NotFoundError()
        }
    
        bus.set(req.body)
        await bus.save()

        await bus.stops.map(async (stop) => {
            let doc = await Stop.findById(stop)
            doc?.busId?.push(bus._id)
            await doc?.save()
        })

        const tracker = await Tracker.findById(bus.tracker)
        tracker?.set({ bus: bus.id })
        await tracker?.save()

        await bus.populate('stops')
        
        res.json(bus).status(204)
    }
})

export {router as UpdateBusRoute}