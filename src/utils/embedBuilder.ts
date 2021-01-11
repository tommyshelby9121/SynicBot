import { Message, MessageEmbed } from "discord.js";

export async function simpleEmbed(message:Message, description:any, color:any) {
    const embed = new MessageEmbed()
        .setDescription(description)
        .setColor(color)
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}

export async function caseInfo(message:Message, title:any, type:any, user:any, staffMember:any, reason:any) {
    let color = "";
    if (type === "Warn") color = "#F7DC6F";
    if (type === "Mute") color = "#F7DC6F";
    if (type === "Kick") color = "#F7DC6F";
    if (type === "Ban") color = "#E74C3C";
    if (type === "Unban") color = "#58D68D"

    const embed = new MessageEmbed()
        .setTitle(title)
        .setColor(color)
        .addFields(
            {
                name: "User",
                value: user,
                inline: true,
            },
            {
                name: "Staff Member",
                value: staffMember,
                inline: true,
            },
            {
                name: "Reason",
                value: reason,
                inline: true,
            }
        )
        .setFooter(`Requested By: ${message.author.tag} | Synic v1.0.0`);

    await message.channel.send(embed);
}