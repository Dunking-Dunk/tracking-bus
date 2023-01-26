import mongoose from "mongoose";
import { BusDoc } from "./Bus";

interface Coords {
    latitude: number;
    longitude: number;
}


interface StopAttrs {
    coords: Coords,
    address?: string,
    name: string,
    timing: string, 
    busId?: BusDoc
}

export interface StopDoc extends mongoose.Document {
    coords: Coords,
    address?: string,
    name: string,
    timing: string,   
    busId?: BusDoc
}

interface StopModel extends mongoose.Model<StopDoc> {
    build(attrs: StopAttrs): StopDoc;
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
        required: true,
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
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

stopSchema.statics.build = (attrs: StopAttrs) => {
    return new Stop(attrs)
}

const Stop = mongoose.model<StopDoc, StopModel>('Stop', stopSchema)

export {Stop}