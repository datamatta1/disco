import { SlashCommandBuilder } from '@discordjs/builders';

class SimpleSlashCommand {
    constructor(name, description, botReply, ephemeral = false) {
        this.data = new SlashCommandBuilder().setName(name).setDescription(description);
        this.botReply = botReply;
        this.ephemeral = ephemeral;
    }

    async execute(interaction) {
        const reply = typeof this.botReply === 'function' ? this.botReply(interaction) : this.botReply;

        await interaction.reply({
            content: reply,
            ephemeral: this.ephemeral,
        });
    }
}

export default SimpleSlashCommand;
