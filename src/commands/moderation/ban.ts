import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import { simpleEmbed } from "../../utils/embedBuilder";
import responses from "../../utils/responses";
import colors from "../../utils/colors";
import { formatDate } from "../../utils/formatDate";

// Load Models
import GuildInfo from "../../models/GuildInfo";
import ModCase from "../../models/ModCase";

export default {
    name: "ban",
    description: "Ban a specified user",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("BAN_MEMBERS")) return simpleEmbed(message, responses.moderation.no_user_permission, colors.error);
        if (!message.guild?.me?.hasPermission("BAN_MEMBERS")) return simpleEmbed(message, responses.moderation.no_bot_permission, colors.error);
        const banUser = message.guild?.member(message.mentions.users.first() || message.guild?.members.cache.get(args[0])!);
        if (!banUser) return simpleEmbed(message, responses.moderation.no_user_provided + "ban!", colors.error);
        if (banUser.id === message.author.id) return simpleEmbed(message, responses.moderation.ban.cannot_ban_self, colors.error);
        if (banUser.hasPermission("BAN_MEMBERS")) return simpleEmbed(message, responses.moderation.ban.could_not_ban_user, colors.error);
        let banReason = args.join(" ").slice(banUser.id.length);
        if (!banReason) banReason = "No Reason Provided!";

        await GuildInfo.findOne({ guildId: message.guild?.id }, async (err:any, response:any) => {
            if (err) return console.error(err);

            let caseId:number = response.cases;

            ++caseId;

            const date = new Date();
            await ModCase.create({
                guildId: message.guild?.id,
                caseId,
                staffMember: message.author.id,
                user: banUser.user.id,
                reason: banReason,
                method: "Ban",
                date: formatDate(date, "MM/DD/YYYY HH:mm"),
            });

            await GuildInfo.findOneAndUpdate({ guildId: message.guild?.id }, { cases: caseId });

            try {
                await banUser.send(`You have been banned in ${message.guild?.name} for: ${banReason}`);
                await banUser.ban({ reason: banReason });
                return simpleEmbed(message, `${banUser.user.tag} has been banned!`, colors.success);
            }
            catch (err) {
                console.error(err);
                return simpleEmbed(message, "Could not ban user. An error has occurred and the developer has been notified", colors.error);
            }
        });
    }
}