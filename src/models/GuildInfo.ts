import { model, Schema, Document } from "mongoose";

export interface IGuildInfo extends Document {
    guildId: string,
    guildName: string,
    memberCount: string,
    region: string,
    // categories: string,
    // textChannels: string,
    // voiceChannels: string,
    // roles: string,
    prefix: string,
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
        type: String,
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
    }
});

export default model<IGuildInfo>("GuildInfo", GuildInfoSchema);