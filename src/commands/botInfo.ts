import { SynicClient } from "../struct/Client";
import { Message, MessageEmbed } from "discord.js";

export default {
    name: "botinfo",
    description: "Get Synic's information",
    category: ["utility"],
    /**
     * @param {SynicClient} client
     * @param {Message} message
     */
    async execute(client:SynicClient, message:Message) {
        const botInfo = new MessageEmbed()
            .setAuthor("Synic", client.user?.displayAvatarURL())
            .setColor("#FF7F50")
            .addFields(
                {
                    name: "Version",
                    value: "1.0.0",
                    inline: true
                },
                {
                    name: "Creator",
                    value: "Luci#9121",
                    inline: true,
                },
                {
                    name: "Servers",
                    value: client.guilds.cache.size,
                    inline: true,
                },
                {
                    name: "Users",
                    value: client.users.cache.size,
                    inline: true,
                },
                {
                    name: "Website",
                    value: "[synic.xyz](https://synic.xyz)",
                    inline: true,
                },
                {
                    name: "Invite",
                    value: "[synic.xyz/invite](https://synic.xyz/invite)",
                    inline: true,
                }
            )
            .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

        await message.channel.send(botInfo);
    }
}