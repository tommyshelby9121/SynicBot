import { SynicClient } from "../../struct/Client";
import { Message } from "discord.js";

export default {
    name: "ping",
    description: "Get bot & api latency",
    category: ["utility"],
    /**
     * @param {SynicClient} client
     * @param {Message} message
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async execute(client:SynicClient, message:Message) {
        const msg = await message.channel.send("Pinging... 🏓");
        await msg.edit(`**Pong!** 🏓\nBot Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\` \nGateway Latency: \`${client.ws.ping}ms\``);
    }
}