const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { footertext, colorEmbed, image } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Aidez vous de cette commande pour voir toute les commandes du bot."),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(colorEmbed)
            .setTitle("<:blue_ticket:1231944784675864639> - Help Command")
            .setDescription(interaction.client.commands.map(c => `**/${c.data.name} :** ${c.data.description}`).join("\n"))
            .setImage(image)
            .setFooter({ text: footertext });

        await interaction.reply({ embeds: [embed] });
    }
}