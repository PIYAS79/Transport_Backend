import mongoose, { Schema, Document } from 'mongoose';
import { SemesterCardStack_Type } from './semesterCardStack.interface';



const SemesterCardStackSchema: Schema = new Schema<SemesterCardStack_Type>({
    payment_amount: { type: Number, required: true },
    route: {
        type: String,
        enum: {
            values: ["MIRPUR <> DSC", "Tongi <> DSC", "Dhanmondi <> DSC", "Uttara <> DSC"],
            message: '{VALUE} is not assignable with following values'
        },
        required: [true, "Route is required *"]
    },
    email: {
        type: String,
        unique:true,
        required: [true, "Eamil is Required *"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User _id is required *"]
    },
    transaction_id: {
        type: String,
        required: [true, "Transaction id is required *"]
    },
    semester_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: [true, "Semester id is required *"]
    },
    payedWith: {
        type: String,
        required: [true, "Payment Process name is requried *"]
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "WITHDRAW"],
            message: '{VALUE} is not assignable with following values'
        },
        default: "PENDING",
        required: [true, "Defile the request status is requried *"]
    }
}, {
    timestamps: true
});





export const SemesterCardStack_Model = mongoose.model<SemesterCardStack_Type>('SemesterCardStack', SemesterCardStackSchema);
