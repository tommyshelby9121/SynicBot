import { SynicClient } from "../struct/Client";
import { Guild } from "discord.js";

// Import GuildInfo Model
import GuildInfo from "../models/GuildInfo";

module.exports = async (client:SynicClient, guildData:Guild) => {
    const deleteGuild = await GuildInfo.findOne({ guildId: guildData.id }, (err:any) => {
       if (err) throw err;
    });

    if (deleteGuild) {
        deleteGuild.remove();
    }
}