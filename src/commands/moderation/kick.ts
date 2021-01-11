import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import { simpleEmbed } from "../../utils/embedBuilder";
import colors from "../../utils/colors";
import responses from "../../utils/responses";
import { formatDate } from "../../utils/formatDate";

// Load Models
import GuildInfo from "../../models/GuildInfo";
import ModCase from "../../models/ModCase";

export default {
    name: "kick",
    description: "Kick a specified user",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        if (!message.member?.hasPermission("KICK_MEMBERS")) return simpleEmbed(message, responses.moderation.no_user_permission, colors.error);
        if (!message.guild?.me?.hasPermission("KICK_MEMBERS")) return simpleEmbed(message, responses.moderation.no_bot_permission, colors.error);
        const kickUser = message.guild?.member(message.mentions.users.first() || message.guild?.members.cache.get(args[0])!);
        if (!kickUser) return simpleEmbed(message, responses.moderation.no_user_provided + "kick!", colors.error);
        if (kickUser.id === message.author.id) return simpleEmbed(message, responses.moderation.kick.cannot_kick_self, colors.error);
        if (kickUser.hasPermission("KICK_MEMBERS")) return simpleEmbed(message, responses.moderation.kick.could_not_kick_user, colors.error);
        let kickReason = args.join(" ").slice(22);
        if (!kickReason) kickReason = "No Reason Provided!";

        await GuildInfo.findOne({ guildId: message.guild?.id }, async (err:any, response:any) => {
            if (err) return console.error(err);

            let caseId:number = response.cases;

            ++caseId;

            const date = new Date();
            await ModCase.create({
                guildId: message.guild?.id,
                caseId,
                staffMember: message.author.id,
                user: kickUser.user.id,
                reason: kickReason,
                method: "Kick",
                date: formatDate(date, "MM/DD/YYYY HH:mm"),
            });

            await GuildInfo.findOneAndUpdate({ guildId: message.guild?.id }, { cases: caseId });

            try {
                await kickUser.kick(kickReason);
                return simpleEmbed(message, `${kickUser.user.tag} has been kicked!`, colors.success);
            }
            catch (err) {
                console.error(err);
                return simpleEmbed(message, "Could not kick user. An error has occurred and the developer has been notified", colors.error);
            }
        });
    }
}