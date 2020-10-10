import { Schema } from 'mongoose';
import { IUser, UserSchema } from './user.model';

export interface IComment {
  text: string;
  created: Date;
  createdBy: IUser;
}

export const CommentSchema = new Schema({
  text: { type: String, required: true },
  created: { type: Date, default: Date.now },
  createdBy: { type: UserSchema },
});
