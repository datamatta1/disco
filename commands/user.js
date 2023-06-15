import SimpleSlashCommand from "../command-creator/SimpleSlashCommands.js";

const user = new SimpleSlashCommand("user", "Provides the information about the user and users time on server", (interaction) => {
    return `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`;
}, false);

export const data = user.data;

export async function execute(interaction) {
    await user.execute(interaction);
}