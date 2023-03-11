import { createClient } from '@supabase/supabase-js';
import { EmbedBuilder } from 'discord.js';
const supabase = createClient(process.env["SupabaseURL"] || "", process.env["supabaseApiKey"] || "");
const main: any = {
  name: ["daily"],
  run: async (client: any, message: any, args: any) => {
    
    let { data: users, error } = await supabase.from('users').select('daily,coins').eq('id', message.author.id);
    
    let time = users![0]?.daily || 0
    if(time < Date.now()){
        let randomCoins: number = Math.floor(Math.random() * 5) + 1;
        await supabase.from('users').upsert([{ id: message.author.id, coins: users![0]?.coins+randomCoins || randomCoins, daily: Date.now()+86400000 }]).select()
        const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`You received \`${randomCoins}\` coins!`)
        .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL()});
        message.reply({
            embeds: [embed]
        });
    }else{
        const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`You can claim daily reward in: <t:${Math.ceil(users![0]?.daily/1000)}:R>`)
        .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL()});
        message.reply({
            embeds: [embed]
        });
    }

  }
};

export {main}
