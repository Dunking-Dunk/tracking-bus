import mongoose from "mongoose";
import { BusDoc } from "./Bus";

interface DriverAttrs {
    name: string,
    busId?: BusDoc[],
    phoneNumber: number,
    photoUrl: {
        data: Buffer,
        contentType: string
    }
}

export interface DriverDoc extends mongoose.Document {
    name: string,
    phoneNumber: number,
    busId?: BusDoc[],
    photoUrl: {
        data: Buffer,
        contentType: string
    }
}

interface DriverModel extends mongoose.Model<DriverDoc> {
    build(attrs: DriverAttrs): DriverDoc;
}


const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    photoUrl: {
        data: Buffer,
        contentType: String
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

driverSchema.statics.build = (attrs: DriverAttrs) => {
    return new Driver(attrs)
}

// DriverSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.

// });

const Driver = mongoose.model<DriverDoc, DriverModel>('Driver', driverSchema)

export {Driver}