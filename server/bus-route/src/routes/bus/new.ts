import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { natsWrapper } from '../../nats-wrapper'
import { BusCreatedPublisher } from '../../events/publisher/bus-created-publisher'
import { Bus } from '../../models/Bus'
import {ValidateRequest} from '@hursunss/bus-tracking-common'

const router = express.Router()

router.post('/api/bus-routes',
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
   await bus.populate('stops')
  
        new BusCreatedPublisher(natsWrapper.client).publish({
            id: bus.id,
            busNumber: bus.busNumber,
            busSet: bus.busSet,
            busName: bus.busName,
            description: bus.description,
            origin: bus.origin,
            stops: bus.stops,
            morningToCollege: bus.morningToCollege,
            returnAfter315: bus.returnAfter315
        })
        
    res.status(201).send(bus)
})

export {router as NewBusRoute} 