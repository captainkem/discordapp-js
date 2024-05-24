const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { footertext, colorbot } = require("../../config.json"); 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Obtenez l'avatar d'un membre")
        .addUserOption(option =>
            option.setName('user').setDescription("Sélectionnez l'utilisateur dont vous voulez obtenir l'avatar")),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ size: 1024, extension: 'png' });

        const embed = new EmbedBuilder()
            .setColor(colorbot) 
            .setTitle(`Avatar de ${user.username}`)
            .setImage(avatarURL)
            .setFooter({ text: footertext }); 

        await interaction.reply({ embeds: [embed] });
    },
};