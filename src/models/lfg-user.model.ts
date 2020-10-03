import { Schema } from 'mongoose';
import { IUser } from './user.model';

export interface ILfgUser extends IUser {
  ign: string;
}

export const LfgUserSchema = new Schema({
  name: String,
  googleId: String,
  image: String,
  ign: String,
});
