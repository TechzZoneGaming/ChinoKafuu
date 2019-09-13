const Command = require("../../structures/command")
module.exports = class AddEmoji extends Command {
    constructor(client) {
       super(client, {
           name: 'addemoji',
           category: 'mod',
           aliases: ['adicionaremoji'],
           UserPermission: ["MANAGE_EMOJIS"],
           ClientPermission: ["MANAGE_EMOJIS"],
           OnlyDevs: false,
           hidden: false,
       })
   } 
   execute({message, args, server}, t) {
            
        const url = args[1] || message.attachments.first() ? message.attachments.first().url : undefined
        if (!url || url === undefined) return message.chinoReply("error, t("commands:addemoji.args-null"))
        const name = args[0]

        message.guild.createEmoji(url, name).then(emoji => {
            message.channel.send(`${emoji} **|** ${message.author}, ${t('commands:addemoji.success')}`)
        }).catch(() => {
            message.chinoReply("error", t('commands:addemoji.error'))
        })
    }
}
