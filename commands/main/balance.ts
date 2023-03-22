import { createClient } from '@supabase/supabase-js'
import { EmbedBuilder } from 'discord.js';
const supabase = createClient(process.env["SupabaseURL"] || "", process.env["supabaseApiKey"] || "")
const main: any = {
  name: ["balance", "coins", "bal"],
  cooldown: 5,
  run: async (client: any, message: any, args: any) => {
    
    let { data: users, error } = await supabase.from('users').select('coins').eq('id', message.author.id)


    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setDescription(`You currently have \`${users![0]?.coins || 0}\` coins!`)
      .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL()});
    message.reply({
      embeds: [embed]
    });
  }
};

export {main}
