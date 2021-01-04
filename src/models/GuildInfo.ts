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
        unique: true,
    },
    memberCount: {
        type: String,
        required: true,
        unique: true,
    },
    region: {
        type: String,
        required: true,
        unique: true,
    },
    categories: {
        type: Array,
        required: true,
        unique: true,
    },
    textChannels: {
        type: Array,
        required: true,
        unique: true,
    },
    voiceChannels: {
        type: Array,
        required: true,
        unique: true,
    },
    roles: {
        type: Array,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        default: "!",
    }
});

export default model<IGuildInfo>("GuildInfo", GuildInfoSchema);