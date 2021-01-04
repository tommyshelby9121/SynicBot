import { SynicClient } from "../struct/Client";
import { Message } from "discord.js";

module.exports = async (client:SynicClient, message:Message) => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot || !message.guild) return;
    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (message.channel.type !== "text") return;

    try {
        command.execute(client, message, args);
    }
    catch (err) {
        console.error(`Could not load ${commandName} command: ${err}`);
        process.exit(1);
    }
}