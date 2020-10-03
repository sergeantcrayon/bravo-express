import mongoose, { Types, Document, Schema } from 'mongoose';
import { IRegion, RegionSchema } from './region.model';
import { IPlatform, PlatformSchema } from './platform.model';
import { GameModeSchema, IGameMode } from './game-mode.model';
import { GameSchema, IGame } from './game.model';
import { IUser, UserSchema } from './user.model';
import { ILfgUser, LfgUserSchema } from './lfg-user.model';

interface ILfg extends Document {
  game: IGame;
  owner: IUser;
  users: Types.Array<ILfgUser>;
  platform: IPlatform;
  region: IRegion;
  gameModes: Types.Array<IGameMode>;
  ign: string;
  maxPlayers: number;
  description: string;
  tags: Types.Array<string>;
  created: Date;
}

const LfgSchema = new Schema(
  {
    game: GameSchema,
    owner: UserSchema,
    users: [{ type: LfgUserSchema }],
    platform: PlatformSchema,
    region: RegionSchema,
    gameModes: [{ type: GameModeSchema }],
    ign: String,
    maxPlayers: Number,
    description: String,
    tags: [String],
    created: { type: Date, default: Date.now },
  },
  { _id: true }
);

const Lfg = mongoose.model<ILfg>('Lfg', LfgSchema);

export default Lfg;
