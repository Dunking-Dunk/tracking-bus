import mongoose from 'mongoose';
import { BusDoc } from './Bus';

interface TrackerAttrs {
    bus:  BusDoc,
    lat: number,
    lng: number
}

interface TrackerDoc extends mongoose.Document {
    bus: BusDoc,
    lat: number,
    lng: number
}

interface TrackerModel extends mongoose.Model<TrackerDoc> {
    build(attrs: TrackerAttrs): TrackerDoc
}

const trackingSchema = new mongoose.Schema({
    lat: {
        type: Number,
        default: 0
    },
    lng: {
        type: Number,
        default: 0
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

trackingSchema.statics.build = (attrs: TrackerAttrs) => {
    return new Tracker(attrs)
}

const Tracker = mongoose.model<TrackerDoc, TrackerModel>('Tracker', trackingSchema)

export {Tracker}