const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Parle via le bot")
        .addStringOption(opt => opt
            .setName("message")
            .setDescription("Le texte à envoyer")
            .setRequired(true)
        )
        .addChannelOption(opt => opt
            .setName("channel")
            .addChannelTypes(ChannelType.GuildText)
            .setDescription("Le salon où envoyer le texte")
        ),
    async execute(interaction) {
        const channel = interaction.options.getChannel("channel") || interaction.channel;

        // Verifications des permissions de l'utilisateur
        if(!interaction.member.permissionsIn(channel).has(PermissionFlagsBits.ManageMessages)) {
            await interaction.reply({ content: `:x: Vous n'avez pas les permissions de faire cette commande`, ephemeral: true });
            return;
        }

        // Verifications des permissions du bot
        if(!interaction.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.ViewChannel)) {
            await interaction.reply({ content: `:x: Je ne peux pas voir le salon`, ephemeral: true });
            return;
        }
        if(!interaction.guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.SendMessages)) {
            await interaction.reply({ content: `:x: Je ne peux pas envoyer de message dans le salon`, ephemeral: true });
            return;
        }

        let message = interaction.options.getString("message", true);
        if(!interaction.member.permissionsIn(channel).has(PermissionFlagsBits.MentionEveryone)) {
            // Si l'utilisateur n'a pas les permissions, on bloque les mentions everyone, here, et les rôles
            message = message
                .replace(/@everyone/g, "@­everyone")
                .replace(/@here/g, "@­here")
                .replace(/<@&/g, "<@&­");
        }
        if(message.length > 2000) return await interaction.reply({ content: `:x: Votre message est trop long`, ephemeral: true });

        await interaction.deferReply({ ephemeral: true });
        await channel.send(message);
        await interaction.editReply(`:white_check_mark: Message envoyé !`);
    }
};