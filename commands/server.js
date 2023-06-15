import SimpleSlashCommand from '../command-creator/SimpleSlashCommands.js';

const server = new SimpleSlashCommand(
    'server',
    'Replies with the server name',
    `Server name is: ${this.interaction.guild.name}`,
    false
);

export const data = server.data;

export async function execute(interaction) {
    await server.execute(interaction);
    console.log(server.interaction);
}
