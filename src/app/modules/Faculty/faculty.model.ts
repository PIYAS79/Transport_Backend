import { model, Schema } from "mongoose";
import { User_Name_Type } from "../../global/interfaces";
import { Faculty_Type } from "./faculty.interface";

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


const Faculty_Schema = new Schema<Faculty_Type>({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user ref is required *"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required *"]
    },
    department: {
        type: String,
        enum: {
            values: ['CSE', 'SWE', 'BBA', 'MCT', 'CIS', 'ENG'],
            message: `{VALUE} is not assignable with provided types *`
        },
        required: [true, "Role is required *"]
    },
    facultyId: {
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




export const Faculty_Model = model<Faculty_Type>('Faculty', Faculty_Schema);