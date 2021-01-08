import { Message, MessageEmbed } from "discord.js";

export async function noPermission(message:Message, description:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("#E74C3C")
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}

export async function noUser(message:Message, description:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("#E74C3C")
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}

export async function warnCancelled(message:Message, description:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("#E74C3C")
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}