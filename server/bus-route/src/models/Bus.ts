import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface stopAttrs {
    lat: number,
        lng: number,
        address: string,
        name: string
}

interface BusAttrs {
    busNumber: number,
    busSet: string,
    description: string,
    origin: string,
    stops: stopAttrs[]
}
interface BusDoc extends mongoose.Document {
    busNumber: number,
    busSet: string,
    description: string,
    origin: string,
    stops: stopAttrs[],
    version: number
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
    description: {
        type: String
    },
    origin: {
        type: String,
    },
    stops: {
        type: [stopSchema],
        require: true
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
    return new Bus(attrs)
}

const Bus = mongoose.model<BusDoc, BusModel>('Bus', Schema)

export {Bus}