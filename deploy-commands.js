import { REST } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';

const configPath = path.join(process.cwd(), 'config.json');
const { clientId, guildId, token } = JSON.parse(await fs.readFile(configPath, 'utf-8'));

const commands = [];
const commandsPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'commands');
const commandFiles = await fs.readdir(commandsPath);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            `/applications/${clientId}/guilds/${guildId}/commands`,
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
