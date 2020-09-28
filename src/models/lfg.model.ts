import mongoose, { Types, Document, Schema } from 'mongoose';
import { IRegion, RegionSchema } from './region.model';
import { IPlatform, PlatformSchema } from './platform.model';
import { GameModeSchema, IGameMode } from './game-mode.model';
import { GameSchema, IGame } from './game.model';
import { IUser, UserSchema } from './user.model';

interface ILfg extends Document {
  user: IUser;
  game: IGame;
  platform: IPlatform;
  region: IRegion;
  gameModes: Types.Array<IGameMode>;
  ign: string;
  playerCount: number;
  description: string;
  tags: Types.Array<string>;
  created: Date;
}

const LfgSchema = new Schema(
  {
    user: UserSchema,
    game: GameSchema,
    platform: PlatformSchema,
    region: RegionSchema,
    gameModes: [{ type: GameModeSchema }],
    ign: String,
    playerCount: Number,
    description: String,
    tags: [String],
    created: { type: Date, default: Date.now },
  },
  { _id: true }
);

const Lfg = mongoose.model<ILfg>('Lfg', LfgSchema);

export default Lfg;
