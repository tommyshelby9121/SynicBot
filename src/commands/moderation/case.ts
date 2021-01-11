import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import { caseInfo, simpleEmbed } from "../../utils/embedBuilder";
import colors from "../../utils/colors";
const response = require("../../utils/responses");

// Load Model
import ModCase from "../../models/ModCase";

export default {
    name: "case",
    description: "Get information about a specific case",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("MANAGE_MESSAGES")) return simpleEmbed(message, response.en.moderation.no_user_permission, colors.error);
        const caseId = args[0];
        if (!caseId) return simpleEmbed(message, response.en.moderation.no_case_arg, colors.error);

        const foundCase = await ModCase
            .where('guildId', message.guild?.id)
            .where('caseId', parseInt(caseId));

        if (foundCase === null || undefined || [] || "") return simpleEmbed(message, `\`Case ${parseInt(caseId)}\` does not exist`, colors.error);
        return caseInfo(message, `Case ${foundCase[0].caseId} | ${foundCase[0].method}`, foundCase[0].method, foundCase[0].user, foundCase[0].staffMember, foundCase[0].reason);
    }
}