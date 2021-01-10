import { Message, MessageEmbed } from "discord.js";
import {emit} from "cluster";

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

export async function modActionCancelled(message:Message, description:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("#E74C3C")
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}

export async function modActionSuccess(message:Message, description:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("#58D68D")
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}