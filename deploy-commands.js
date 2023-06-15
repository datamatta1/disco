import { REST } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import dotenv from "dotenv"

dotenv.config()

const { CLIENT_ID: clientId, GUILD_ID: guildId, TOKEN: token } = process.env;

const currentFileUrl = import.meta.url;
const currentDirPath = path.dirname(new URL(currentFileUrl).pathname);
const commandsPath = path.join(currentDirPath, 'commands');

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        const commandFiles = await fs.readdir(commandsPath);
        const commands = [];

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const { data } = await import(filePath);

            if (data) {
                commands.push(data.toJSON());
            } else {
                console.log(`[WARNING] The command file ${file} is missing the "data" export.`);
            }
        }

        const data = await rest.put(`/applications/${clientId}/guilds/${guildId}/commands`, {
            body: commands,
        });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();