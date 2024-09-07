import { model, Schema } from "mongoose";
import { User_Name_Type } from "../../global/interfaces";
import { Admin_Type } from "./admin.interface";

const Name_Schema: Schema = new Schema<User_Name_Type>({
    f_name: {
        type: String,
        required: [true, "First Name is required *"]
    },
    m_name: {
        type: String,
        required: false
    },
    l_name: {
        type: String,
        required: [true, "Last Name is required *"]
    }
});


const Admin_Schema = new Schema<Admin_Type>({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user ref is required *"],
        ref: "User"
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required *"]
    },
    adminId: {
        type: String,
        required: [true, "Faculty Id is required *"]
    },
    name: Name_Schema,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})




export const Admin_Model = model<Admin_Type>('Admin', Admin_Schema);