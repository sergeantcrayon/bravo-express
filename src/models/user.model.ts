import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  googleId: string;
  image: string;
}

export const UserSchema = new Schema(
  {
    name: String,
    googleId: String,
    image: String,
  },
  { _id: true }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
