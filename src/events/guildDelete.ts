import { SynicClient } from "../struct/Client";
import { Guild } from "discord.js";

// Import GuildInfo Model
import GuildInfo from "../models/GuildInfo";

module.exports = async (client:SynicClient, guildData:Guild) => {
    const data = GuildInfo.findOne({ guildId: guildData.id }, (err:any) => {
        if (err) return console.error(err);
    });

    if (data) {
        data.remove();
    }
}