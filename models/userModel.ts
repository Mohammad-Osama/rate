import mongoose from "mongoose";

export interface IUser {
    id: mongoose.Types.ObjectId
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthday: string;
    phone: string;
    status: string;
    role: string;
    city: string;
    country: string;
    address: string;

};


const UserSchema = new mongoose.Schema<IUser>({

    first_name: {
        type: String,
        required: [true, "Please add a first name"]
    },
    last_name: {
        type: String,
        required: [true, "Please add a last name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    birthday: { type: String, default: " " },
    phone: { type: String, default: " " },
    status: {
        type: String,
        enum: ["active", "deactivated", "suspended"],
        default: "active"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    city: { type: String, default: " " },
    country: { type: String, default: " " },
    address: { type: String, default: " " },
},
    {
        timestamps: true
    });


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);