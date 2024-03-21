import mongoose, { Document, Schema } from 'mongoose'

export interface UserDocument extends Document {
    _id: string,
    username: string,
    email: string,
    password: string,
    cpassword: string,
    hashedPassword: string,
    profilePicture?: {
        url: string,
        key: string,
    },
    coverPhoto?: {
        url: string,
        key: string
    },
    createdAt: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        username: String,
        email: { type: String, unique: true },
        hashedPassword: String,
        profilePicture: { type: Object, url: String, key: String },
        coverPhoto: { type: Object, url: String, key: String },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);