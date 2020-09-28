import mongoose, { Document, Schema, Types } from 'mongoose';
import { PlatformSchema, IPlatform } from './platform.model';
import { GameModeSchema, IGameMode } from './game-mode.model';
import { IRegion, RegionSchema } from './region.model';

export interface IGame extends Document {
  name: string;
  platforms: Types.Array<IPlatform>;
  gameModes: Types.Array<IGameMode>;
  regions: Types.Array<IRegion>;
}

export const GameSchema = new Schema(
  {
    name: { type: String, required: true },
    platforms: [{ type: PlatformSchema }],
    gameModes: [{ type: GameModeSchema }],
    regions: [{ type: RegionSchema }],
  },
  { _id: true }
);

const Game = mongoose.model<IGame>('Game', GameSchema);

export default Game;
