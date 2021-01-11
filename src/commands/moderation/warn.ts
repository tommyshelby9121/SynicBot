import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import { simpleEmbed } from "../../utils/embedBuilder";
import colors from "../../utils/colors";
import { formatDate } from "../../utils/formatDate";
const responses = require("../../utils/responses");

// Import Model
import GuildInfo from "../../models/GuildInfo";
import ModCase from "../../models/ModCase";

export default {
    name: "warn",
    description: "Issue a warning to specified user",
    category: "moderation",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("MANAGE_MESSAGES")) return simpleEmbed(message, responses.en.moderation.no_user_permission, colors.error);
        if (!message.guild?.me?.hasPermission("MANAGE_MESSAGES")) return simpleEmbed(message, responses.en.moderation.no_bot_permission, colors.error);
        const warnUser = message.guild?.member(message.mentions.users.first() || message.guild?.members.cache.get(args[0])!)
        if (!warnUser) return simpleEmbed(message, responses.en.moderation.no_user_provided + "warn!", colors.error);
        if (warnUser.hasPermission("MANAGE_MESSAGES")) return simpleEmbed(message, responses.en.moderation.warn.could_not_warn_user, colors.error);
        if (warnUser.id === message.author.id) return simpleEmbed(message, responses.en.moderation.warn.cannot_warn_self, colors.error);
        let warnReason = args.join(" ").slice(warnUser.id.length);
        if (!warnReason) warnReason = "No Reason Provided";

        await GuildInfo.findOne({ guildId: message.guild?.id }, async (err:any, response:any) => {
            if (err) return console.error(err);

            let caseId:number = response.cases;

            ++caseId;

            const date = new Date();
            await ModCase.create({
                guildId: message.guild?.id,
                caseId,
                staffMember: message.author.id,
                user: warnUser.user.id,
                reason: warnReason,
                method: "Warn",
                date: formatDate(date, "MM/DD/YYYY HH:mm"),
            });

            await GuildInfo.findOneAndUpdate({ guildId: message.guild?.id }, { cases: caseId });

            return simpleEmbed(message, `${warnUser.user.tag} has been warned!`, colors.success);
        });
    }
}