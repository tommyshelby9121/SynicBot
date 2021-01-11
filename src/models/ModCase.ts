import { model, Schema, Document } from "mongoose";

export interface IModCase extends Document {
    guildId: string,
    caseId: number,
    staffMember: string,
    victim: string,
    reason: string,
    method: string,
    date: any,
}

const ModCaseSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    caseId: {
        type: Number,
        unique: true,
        required: true,
    },
    staffMember: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export default model<IModCase>("ModCase", ModCaseSchema);