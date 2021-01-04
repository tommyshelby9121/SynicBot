import { SynicClient } from "../struct/Client";
import { ActivityType } from "discord.js";

module.exports = async (client:SynicClient) => {
    console.log(`Logged in as ${client.user?.tag}`);

    try {
        void client.user?.setPresence({
            status: "online",
            activity: {
                name: process.env.DISCORD_CLIENT_PRESENCE_MESSAGE,
                type: process.env.DISCORD_CLIENT_PRESENCE_TYPE as ActivityType,
            }
        })
    }
    catch (err) {
        console.error(`Could not set startup presence: ${err}`);
        process.exit(1);
    }
}