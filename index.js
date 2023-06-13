import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import config from './config.json' assert { type: 'json' };
const token = config.token;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

console.log('commandFiles :>> ', commandFiles);

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    import(filePath)
        .then(command => {
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        })
        .catch(error => {
            console.log(`[ERROR] Failed to import command at ${filePath}: ${error}`);
        });
}

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token);
