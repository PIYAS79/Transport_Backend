import { model, Schema } from "mongoose";
import { User_Custom_Static_Method, User_Type } from "./user.interface";
import { encodeDatabyBcrypt } from "../../utils/bcrypt";




const User_Schema = new Schema<User_Type, User_Custom_Static_Method>({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: [true, "user ref is required *"]
    // },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required from model &&&&&&&&& *"]
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
        default: "ACTIVE",
        required: [true, "Status is required *"]
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

// check token timing
User_Schema.statics.isTokenValid = function (tokenIAt: number, PassUpAt: Date) {
    const PassUpdatedAt = new Date(PassUpAt).getTime() / 1000;
    return PassUpdatedAt > tokenIAt;
}
// check if the user is exist or not by static method
User_Schema.statics.isUserExist = async function (email: string) {
    return await User_Model.findOne({ email: email }).select('+password');
}

// hide password by bcrypt
User_Schema.pre('save', async function (next) {
    const newUser = this;
    newUser.password = await encodeDatabyBcrypt(this.password);
    next();
})
// hide password after query
User_Schema.post('save', async function (doc, next) {
    doc.password = '';
    next();
})



export const User_Model = model<User_Type, User_Custom_Static_Method>('User', User_Schema);