import OptionSlashCommand from "../command-creator/OptionSlashCommand.js";

const gif = new OptionSlashCommand(
    "gif",
    "Sends a random gif!",
    [
        {
            type: "STRING",
            name: "category",
            description: "The gif category",
            required: true,
            choices: [
                { name: "Funny", value: "gif_funny" },
                { name: "Meme", value: "gif_meme" },
                { name: "Movie", value: "gif_movie" }
            ]
        }
    ],
    (interaction) => {
        const category = interaction.options.getString("category");
        return `You selected the category: ${category}`;
    }
);

export const data = gif.data;

export async function execute(interaction) {
    await gif.execute(interaction);
}
