import { EmbedBuilder } from 'discord.js';


const main: any = {
    name: ["help", "elp"],
    cooldown: 4,
    run: async (client: any, message: any, args: any) => {
  
  
        let exampleEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Help")
            .addFields({ name: " ", value: " " },
            {
                name: ".elp",
                value: "Shows this exact message you are reading right now!",
                inline: true
            },
            {
                name: ".daily",
                value: "Gives you some coins every 24 hours.",
                inline: true
            },
            {
                name: ".coins",
                value: "Shows current amount of coins you have",
                inline: true
            },
            {
                name: ".cooldown",
                value: "Display when you can use coin earning commands again.",
                inline: true
            },
            {
                name: ".buy",
                value: "Allows you to buy an item from shop usage:\n`.buy id_of_item`",
                inline: true
            },
            {
                name: ".shop",
                value: "Displays items which can be purchased",
                inline: true
            }
        )
        .setTimestamp()

        message.reply({ embeds: [exampleEmbed], ephemeral: true });
    
    
    }
};

export {main}