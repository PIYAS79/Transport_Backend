import { model, Schema } from "mongoose";
import { User_Type } from "./user.interface";




const User_Schema = new Schema<User_Type>({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: [true, "user ref is required *"]
    // },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required *"]
    },
    isPasswordChanged: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: [true, "Password is required *"]
    },
    passwordChangedAt: {
        type: Date
    },
    role: {
        type: String,
        enum: {
            values: ['SUPER', 'ADMIN', 'STUDENT', 'FACULTY'],
            message: `{VALUE} is not assignable with provided types *`
        },
        required: [true, "Role is required *"]
    },
    status: {
        type: String,
        enum: {
            values: ['ACTIVE', 'BLOCK', 'EXPIRED'],
            message: `{VALUE} is not assignable with provided types *`
        },
        required: [true, "Status is required *"]
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})




export const User_Model = model<User_Type>('User', User_Schema);