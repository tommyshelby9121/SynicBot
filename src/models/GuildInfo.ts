import { model, Schema, Document } from "mongoose";

export interface IGuildInfo extends Document {
    guildId: string,
    guildName: string,
    memberCount: number,
    region: string,
}

const GuildInfoSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    memberCount: {
        type: Number,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    channels: {
        type: Array,
        required: true,
    },
    roles: {
        type: Array,
        required: true,
    },
    prefix: {
        type: String,
        default: "!",
    },
    cases: {
        type: Number,
        default: 0,
    },
});

export default model<IGuildInfo>("GuildInfo", GuildInfoSchema);