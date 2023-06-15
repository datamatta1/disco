import { SlashCommandBuilder } from '@discordjs/builders'

class SimpleSlashCommand {
    constructor(name, description, botReply, hidden) {
        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
        this.botReply = botReply
        this.hidden = hidden
    }
    async execute(interaction, hidden) {
        await interaction.reply({
            content: this.botReply,
            ephemeral: hidden
        })
    }
}

export default SimpleSlashCommand