import { SynicClient } from "../../struct/Client";
import { Message, MessageEmbed } from "discord.js";
import {formatDate} from "../../utils/formatDate";

export default {
    name: "serverinfo",
    description: "Get information about a server",
    category: "utility",
    /**
     * @param {SynicClient} client
     * @param {Message} message
     */
    async execute(client:SynicClient, message:Message) {
        const guildEmbed = new MessageEmbed()
            .setAuthor(message.guild?.name, message.guild?.iconURL({ dynamic: true })!)
            .setColor("#FF7F50")
            .setThumbnail(message.guild?.iconURL({ dynamic: true })!)
            .addFields(
                {
                    name: "Owner",
                    value: message.guild?.owner?.user.tag,
                    inline: true,
                },
                {
                    name: "Region",
                    value: message.guild?.region,
                    inline: true,
                },
                {
                    name: "Members",
                    value: message.guild?.memberCount,
                    inline: true,
                },
                {
                    name: "Channels",
                    value: message.guild?.channels.cache.size,
                    inline: true,
                },
                {
                    name: "Roles",
                    value: message.guild?.roles.cache.size,
                    inline: true,
                }
            )
            .setFooter(`Requested By: ${message.author.tag} | Server Created: ${formatDate(message.guild?.createdAt, "MM/DD/YYYY")}`);

        await message.channel.send(guildEmbed);
    }
}