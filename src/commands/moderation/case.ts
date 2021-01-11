import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import {caseInfo, missingArgs, noPermission} from "../../utils/embedBuilder";
const response = require("../../utils/responses");

// Load Model
import ModCase from "../../models/ModCase";

export default {
    name: "case",
    description: "Get information about a specific case",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("MANAGE_MESSAGES")) return noPermission(message, response.en.moderation.no_user_permission);
        const caseId = args[0];
        if (!caseId) return missingArgs(message, response.en.moderation.no_case_arg);

        await ModCase.findOne({ guildId: message.guild?.id, caseId: { $gte: parseInt(caseId) } }, async (err:any, response:any) => {
            if (err) return console.error(err);
            return caseInfo(message, `Case ${response.caseId} | ${response.method}`, response.method, response.victim, response.staffMember, response.reason);
        });
    }
}