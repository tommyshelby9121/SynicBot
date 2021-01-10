import { SynicClient } from "../struct/Client";
import { Message } from "discord.js";
import { noPermission, noUser, modActionCancelled, modActionSuccess } from "../utils/embedBuilder";
import { formatDate } from "../utils/formatDate";
const responses = require("../utils/responses");

// Import Model
import GuildInfo from "../models/GuildInfo";
import ModerationCase from "../models/ModCase";

export default {
    name: "warn",
    description: "Issue a warning to specified user",
    category: "moderation",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("MANAGE_MESSAGES")) return noPermission(message, responses.en.moderation.no_user_permission);
        if (!message.guild?.me?.hasPermission("MANAGE_MESSAGES")) return noPermission(message, responses.en.moderation.no_bot_permission);
        const warnUser = message.guild?.member(message.mentions.users.first() || message.guild?.members.cache.get(args[0])!)
        if (!warnUser) return noUser(message, responses.en.moderation.no_user_provided + "warn!");
        if (warnUser.hasPermission("MANAGE_MESSAGES")) return modActionCancelled(message, responses.en.moderation.warn.could_not_warn_user);
        if (warnUser.id === message.author.id) return modActionCancelled(message, responses.en.moderation.warn.cannot_warn_self);
        let warnReason = args.join(" ").slice(22);
        if (!warnReason) warnReason = "No Reason Provided";

        await GuildInfo.findOne({ guildId: message.guild?.id }, async (err:any, response:any) => {
            if (err) return console.error(err);

            let caseId:number = response.cases;

            ++caseId;

            const date = new Date();
            await ModerationCase.create({
                guildId: message.guild?.id,
                caseId,
                staffMember: message.author,
                victim: warnUser,
                reason: warnReason,
                method: "Warn",
                date: formatDate(date, "MM/DD/YYYY HH:mm"),
            });

            await GuildInfo.findOneAndUpdate({ guildId: message.guild?.id }, { cases: caseId });

            return modActionSuccess(message, `${warnUser.user.tag} has been warned!`);
        });
    }
}