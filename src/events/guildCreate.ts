import { SynicClient } from "../struct/Client";
import { Guild } from "discord.js";

// Import GuildInfo Model
import GuildInfo from "../models/GuildInfo";

module.exports = async (client:SynicClient, guildData:Guild) => {
    const newGuild = await GuildInfo.create({
        guildId: guildData.id,
        guildName: guildData.name,
        memberCount: guildData.memberCount,
        channels: guildData.channels.cache.array(),
        roles: guildData.roles.cache.array(),
        region: guildData.region,
    });

    await newGuild.save();
}