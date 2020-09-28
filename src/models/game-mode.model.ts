import { Schema } from 'mongoose';

export interface IGameMode {
  name: string;
}

export const GameModeSchema = new Schema({
  name: { type: String, required: true },
});
