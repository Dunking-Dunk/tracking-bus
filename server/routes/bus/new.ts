import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'
import { Tracker } from '../../models/Tracking'
import { ValidateRequest } from '../../middleware/validate-request'
import { requireAuth } from '../../middleware/require-auth'
import { io } from '../../app'

const router = express.Router()

router.post('/api/bus',requireAuth,
    [
        body('busNumber').isFloat({gt: 0}).withMessage('Bus Number should be greater than 0').notEmpty().withMessage('Bus Number is Required'),
        body('busSet').not().isEmpty().withMessage('Bus Set is required'),
        body('busName').not().isEmpty().withMessage('Bus Name is required'),
        body('stops').isLength({min: 1}).withMessage('requires more than one stop').notEmpty().withMessage('Stops are required')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => { 

        let bus = Bus.build(req.body)
        await bus.save()

        await bus.stops.map(async (stop) => {
            let doc = await Stop.findById(stop)
            doc?.busId?.push(bus._id)
            await doc?.save()
        })

        const tracker = await Tracker.findById(bus.tracker)
        tracker?.set({ bus: bus._id })
        await tracker?.save()
        
        bus = await bus.populate('stops')

      
            io.emit('newBusAdded', bus)
        
    res.status(201).json(bus)
})

export {router as NewBusRoute} 