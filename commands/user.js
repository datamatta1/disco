import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")

export async function execute(interaction) {
    await interaction.reply(`Your tag is: ${interaction.user.tag}`)
}