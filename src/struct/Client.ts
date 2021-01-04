import { Client, Collection } from "discord.js";

type SynicConfig = {
    token: string,
    prefix: string,
};

export class SynicClient extends Client {
    commands = new Collection<any, any>();
    config: SynicConfig;

    constructor(config: SynicConfig) {
        super({
            disableMentions: "everyone",
        });
        this.config = config;
    }
}