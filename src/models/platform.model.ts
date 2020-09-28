import { Schema } from 'mongoose';

export interface IPlatform {
  name: string;
}

export const PlatformSchema = new Schema({
  name: { type: String, required: true },
});
