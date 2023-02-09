import mongoose from 'mongoose';
import { BusDoc } from './Bus';

interface TrackerAttrs {
    bus: BusDoc,
    coords: {
        latitude: number,
        longitude: number
    },
    speed: number,
}

interface TrackerDoc extends mongoose.Document {
    bus: BusDoc,
    coords: {
        latitude: number,
        longitude: number
    },
    speed: number,
}

interface TrackerModel extends mongoose.Model<TrackerDoc> {
    build(attrs: TrackerAttrs): TrackerDoc
}

const trackingSchema = new mongoose.Schema({
    coords: {
        latitude: {
            type: Number,
            default: 0
        },
        longitude: {
            type: Number,
            default: 0
        },
    },
    speed: {
        type: Number,
        default: 0
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    },
    gpsId: {
        type: String,
        require: true
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