import { SlashCommandBuilder } from '@discordjs/builders'

class SimpleSlashCommand {
    constructor(name, description, botReply, ephemeral) {
        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description)
        this.botReply = botReply
        this.ephemeral = ephemeral
        this.interaction = null
    }
    async execute(interaction) {
        this.interaction = interaction
        await interaction.reply({
            content: this.botReply,
            ephemeral: this.ephemeral
        })
    }
}

export default SimpleSlashCommand