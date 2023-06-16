import { SlashCommandBuilder } from "discord.js";

class OptionSlashCommand {
    constructor(name, description, options = [], botReply, ephemeral = false) {
        this.data = new SlashCommandBuilder().setName(name).setDescription(description);

        options.forEach((option) => {
            const { type, name, description, required, choices } = option;
            switch (type) {
                case "STRING":
                    this.data.addStringOption((option) =>
                        option
                            .setName(name)
                            .setDescription(description)
                            .setRequired(required)
                            .addChoices(...choices)
                    );
                    break;
                case "INTEGER":
                    this.data.addIntegerOption((option) =>
                        option
                            .setName(name)
                            .setDescription(description)
                            .setRequired(required)
                            .addChoices(...choices)
                    );
                    break;
                case "BOOLEAN":
                    this.data.addBooleanOption((option) =>
                        option
                            .setName(name)
                            .setDescription(description)
                            .setRequired(required)
                            .addChoices(...choices)
                    );
                    break;
                default:
                    throw new Error(`Invalid option type: ${type}`);
            }
        });
        this.botReply = botReply;
        this.ephemeral = ephemeral;
    }

    async execute(interaction) {
        const reply = typeof this.botReply === "function" ? this.botReply(interaction) : this.botReply;

        await interaction.reply({
            content: reply,
            ephemeral: this.ephemeral
        });
    }
}

export default OptionSlashCommand;
