import mongoose from "mongoose";

export interface IUser {
    id : mongoose.Types.ObjectId
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthday: string;
    phone: string;
    status: string;
    city: string;
    country: string;
    address: string;
    rate: [mongoose.Types.ObjectId];
    review: [mongoose.Types.ObjectId];
    watchlist: mongoose.Types.ObjectId;
};


const UserSchema = new mongoose.Schema<IUser>({
    
    first_name: { type: String,
                  required: [true, "Please add a first name"] },
    last_name: { type: String, 
                 required: [true, "Please add a last name"] },
    email: { type: String, 
             required: [true, "Please add an email"], 
             unique: true },
    password: { type: String,
                required: [true, "Please add a password"] },
    birthday: { type: String , default: " " },
    phone: { type: String  , default: " "},
    status: { type: String,
              enum:["active","deactivated","suspended"],
              default: "active" },
    city: { type: String  , default: " "},
    country: { type: String , default: " " },
    address: { type: String , default: " "},
    rate: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Rate"
        
    },
    review: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review"
        
    },
    watchlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Watchlist"
        
    },
    
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

export const User = mongoose.models.User ||  mongoose.model<IUser>('User', UserSchema);