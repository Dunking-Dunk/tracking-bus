import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { StopDoc } from "./Stop";

interface BusAttrs {
    busNumber: number,
    busSet: string,
    busName: string,
    description: string,
    origin: string,
    stops: StopDoc[],
    morningToCollege: boolean,
    returnAfter315: boolean,
    tracker: string,
}
export interface BusDoc extends mongoose.Document {
    busNumber: number,
    busSet: string,
    busName: string,
    description: string,
    origin: string,
    stops: StopDoc[],
    version: number,
    morningToCollege: boolean,
    returnAfter315: boolean,
    tracker: string,
}

interface BusModel extends mongoose.Model<BusDoc> {
    build(attrs: BusAttrs): BusDoc
}

export const Schema = new mongoose.Schema({
    busNumber: {
        type: Number,
        required: true,
    },
    busSet: {
        type: String,
    },
    busName: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
    },
    description: {
        type: String
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop'
    }],
    morningToCollege: {
        type: Boolean,
    },
    returnAfter315: {
        type: Boolean,
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
    seats: {
        type: Number,
        default: 64
    },
    ac: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id
            delete ret._id
        },
        virtuals: true
    }
})

Schema.set("versionKey", "version");
Schema.plugin(updateIfCurrentPlugin);

Schema.statics.build = (attrs:BusAttrs) => {
    return new Bus(attrs)
}

const Bus = mongoose.model<BusDoc, BusModel>('Bus', Schema)

export {Bus}