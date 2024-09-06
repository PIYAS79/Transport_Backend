import mongoose, { model, Schema } from "mongoose";
import { Semester_Type } from "./semester.interface";


const Semester_Schema: Schema = new Schema<Semester_Type>({
    semester_code: {
        type: Number,
        required: [true, "Semester code is required *"]
    },
    semester_name: {
        type: String,
        required: [true, "Semester name is required *"]
    },
    semester_year: {
        type: Number,
        required: [true, "Semester year is required *"]
    },
    package_price: {
        type: Number,
        required: [true, "Package price is required *"]
    },
    one_way_pass_price: {
        type: Number,
        required: [true, "One way pass out price is required *"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Admin user collection _id is required *"]
    },
    startMonth: {
        type: Number,
        required: [true, "Semester start month is required *"]
    },
    endMonth: {
        type: Number,
        required: [true, "Semester end month is required *"]
    },
    semester_color: {
        type: String,
        required: [true, "Semester Color Code is requried *"]
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "ACTIVE", "EXPIRED", "DELETED"],
            message: '{VALUE} is not assignable on given types'
        },
        default: "PENDING",
        required: [true, "Semester status is required *"]
    },
    isDeleted: {
        type: Boolean,
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

export const Semester_Model = model<Semester_Type>('Semester', Semester_Schema);