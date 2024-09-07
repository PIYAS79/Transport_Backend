import { model, Schema } from "mongoose";
import { Student_Type } from "./student.interface";
import { User_Name_Type } from "../../global/interfaces";

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


const Student_Schema = new Schema<Student_Type>({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user ref is required *"],
        ref:"User"
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
    studentId: {
        type: String,
        required: [true, "Student Id is required *"]
    },
    name: Name_Schema,
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})




export const Student_Model = model<Student_Type>('Student', Student_Schema);