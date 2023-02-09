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
}

interface BusModel extends mongoose.Model<BusDoc> {
    build(attrs: BusAttrs): BusDoc
}

const Schema = new mongoose.Schema({
    busNumber: {
        type: Number,
        required: true,
    },
    busSet: {
        type: String,
        required: true,
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