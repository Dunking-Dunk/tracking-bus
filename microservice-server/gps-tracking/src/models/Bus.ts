import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface stopAttrs {
    coords: {
        latitude: number,
        longitude: number,
    },
    name: string,
    timing: string
}

interface BusAttrs {
    id: string,
    busNumber: number,
    busSet: string,
    busName: string,
    description?: string,
    origin?: string,
    stops: stopAttrs[],
    morningToCollege: boolean,
    returnAfter315: boolean,
}

export interface BusDoc extends mongoose.Document {
    busNumber: number,
    busSet: string,
    busName: string,
    description?: string,
    origin?: string,
    stops: stopAttrs[],
    version: number,
    morningToCollege: boolean,
    returnAfter315: boolean,
}

interface BusModel extends mongoose.Model<BusDoc> {
    build(attrs: BusAttrs): BusDoc
}

const stopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    coords: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    timing: {
        type: String,
    }
},
{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

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
    stops: {
        type: [stopSchema],
        require: true
    },
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
        }
    }
})

Schema.set("versionKey", "version");
Schema.plugin(updateIfCurrentPlugin);

Schema.statics.build = (attrs:BusAttrs) => {
    return new Bus({
        _id: attrs.id,
        busNumber: attrs.busNumber,
        busName: attrs.busName,
        busSet: attrs.busSet,
        description: attrs.description,
        origin: attrs.origin,
        stops: attrs.stops,
        returnAfter315: attrs.returnAfter315,
        morningToCollege: attrs.morningToCollege
    })
}

const Bus = mongoose.model<BusDoc, BusModel>('Bus', Schema)

export {Bus}