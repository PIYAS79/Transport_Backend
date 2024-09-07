import mongoose, { Schema } from "mongoose";
import { Card_Type } from "./card.interface";





const Card_Schema = new Schema<Card_Type>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User _id is required *"]
    },
    cardType: {
        type: String,
        enum: {
            values: ["Semester Pass Out", "One Way Pass Out"],
            message: '{VALUE} is not assignable'
        },
        required: [true, "Card Type is required *"],
    },
    email: {
        type: String,
        required: [true, "Email is required *"]
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "EXPIRED", "BLOCK"],
            message: '{VALUE} is not assignable'
        },
        default: "ACTIVE",
        required: true,
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: false
    },
    duraton: {
        type: String,
        required: [true, "Duration is required *"]
    },
    route: {
        type: String,
        enum: {
            values: ["MIRPUR <> DSC", "Tongi <> DSC", "Dhanmondi <> DSC", "Uttara <> DSC"],
            message: '{VALUE} is not assignable'
        },
        required: [true, "Route is required *"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required *"]
    },
    transaction_id: {
        type: String,
        required: [true, "Transaction id is required *"]
    },
    payedWith: {
        type: String,
        required: [true, "Payment information is required *"]
    },
    confirmedBy: {
        type: String,
        enum: ["AUTO"], // Allow only "AUTO" as a predefined string
        validate: {
            validator: function (value) {
                // if i send any _id then set the _id id or set :"AUTO"
                return mongoose.Types.ObjectId.isValid(value) || value === "AUTO";
            },
            message: "confirmedBy must be a valid ObjectId or 'AUTO'",
        },
        ref:"User",
        required: [true, "ConfirmedBy field is required *"],
    },
    expiredAt: {
        type: Date,
        required: [true, "Expired time is required *"]
    },
    expiredBy: {
        type: String,
        enum: {
            values: ["USER", "AUTO", "ADMIN"],
            message: '{VALUE} is not assignable'
        },
        required: false,
    },
    expiredConfirmBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});


// Heartbit Check !








export const Card_Model = mongoose.model<Card_Type>('Card', Card_Schema);