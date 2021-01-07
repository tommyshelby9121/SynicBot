import { SynicClient } from "../struct/Client";
import { Message, MessageEmbed } from "discord.js";

export default {
    name: "avatar",
    description: "Get the avatar of a user",
    category: "utility",
    /**
     * @param {SynicClient} client
     * @param {Message} message
     * @param {String} args
     */
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        let user = message.mentions.users?.first() || client.users.cache.get(args[0]);
        if (!user) user = message.author;

        const avatarEmbed = new MessageEmbed()
            .setTitle("Avatar")
            .setColor("#FF7F50")
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

        await message.channel.send(avatarEmbed);
    }
}