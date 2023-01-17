import { Publisher, BusCreatedEvent, Subject } from '@hursunss/bus-tracking-common'

export class BusCreatedPublisher extends Publisher<BusCreatedEvent> { 
    readonly subject = Subject.BusCreated
}