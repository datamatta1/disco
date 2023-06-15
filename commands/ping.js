import SimpleSlashCommand from "../command-creator/SimpleSlashCommands.js";

const ping = new SimpleSlashCommand("ping", "Replies with Pong!", "Pong!", false);

export const data = ping.data;

export async function execute(interaction) {
    await ping.execute(interaction);
}