const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
.setName('add-emoji')
.setDescription('Ajoute un emoji existant.')
.addStringOption(option =>
option.setName('emoji')
.setDescription('Donnez un emoji existant.')
.setRequired(true))
.addStringOption(option =>
option.setName('nom')
.setDescription('Spécifiez un nom pour l\'emoji.')
.setRequired(true)),
async execute(interaction) {
// Vérifie si l'utilisateur a la permission de gérer les emojis
if (!interaction.member.permissions.has(PermissionFlagsBits.ManageEmojisAndStickers)) {
return interaction.reply({ content: ':x: Erreur : Vous n\'avez pas la permission `gérer les emojis.`', ephemeral: true });
}

const emojiInput = interaction.options.getString('emoji');
const nom = interaction.options.getString('nom');

// Extrait l'ID de l'emoji
const emojiId = emojiInput.split(":").pop().replace(">", "");

try {
// Récupère l'URL de l'emoji grâce à son ID
const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}`;

const ajoutéEmoji = await interaction.guild.emojis.create({
attachment: emojiUrl,
name: nom
});
interaction.reply({ content: `:white_check_mark: L'émoji spécifié a été créé avec succès ! ${ajoutéEmoji}`, ephemeral: true });
} catch (erreur) {
console.error(erreur);
interaction.reply({ content: ':x: Une erreur a été survenue lors de l\'ajout de l\'emoji. !', ephemeral: true });
}
}
};