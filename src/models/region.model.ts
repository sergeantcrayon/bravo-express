import { Schema } from 'mongoose';

export interface IRegion {
  name: string;
}

export const RegionSchema = new Schema({
  name: { type: String, required: true },
});
