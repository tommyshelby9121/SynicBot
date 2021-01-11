import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";
import ms from "ms";

export default {
    name: "remind",
    description: "Set a reminder",
    category: "utility",
    async execute(client:SynicClient, message:Message, args:ReadonlyArray<string>) {
        const time = args[0];
        if (!time) return message.channel.send("Please specify a timeframe!");
        const reminderText = args.join(" ").slice(time.length);
        if (!reminderText) return message.channel.send("Please specify a text to remind you about!");

        await message.channel.send(`Okay ${message.author}, in ${ms(ms(time), { long: true })} I will remind you about:${reminderText}`);

        setTimeout(async () => {
           await message.channel.send(`${message.author}, your reminder:${reminderText}`);
        }, ms(time));
    }
}