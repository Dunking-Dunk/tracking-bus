import { Listener, Subject, BusCreatedEvent } from '@hursunss/bus-tracking-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Tracker } from '../../models/Tracking'
import { Bus } from '../../models/Bus'

export class BusCreatedListener extends Listener<BusCreatedEvent> {
    readonly subject = Subject.BusCreated
    queueGroupName = queueGroupName
    async onMessage(data: BusCreatedEvent['data'] ,msg: Message ) {
        if (data) {
            const bus = Bus.build({ 
                id: data.id,
                busNumber: data.busNumber,
                busSet: data.busSet,
                description: data.description,
                origin: data.origin,
                stops: data.stops
            })
            
            await bus.save()

            const tracker = Tracker.build({
                bus: bus.id,
                lat: 0,
                lng: 0
            })
            await tracker.save()
       } 
        msg.ack()
    }
}