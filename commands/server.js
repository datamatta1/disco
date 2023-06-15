import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server.")

export async function execute(interaction) {
    await interaction.reply(`This server name is: ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
}