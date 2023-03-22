import { createClient } from '@supabase/supabase-js';
import { EmbedBuilder } from 'discord.js';
const supabase = createClient(process.env["SupabaseURL"] || "", process.env["supabaseApiKey"] || "");

const main: any = {
    name: ["cd", "cooldown", "cooldowns"],
    cooldown: 5,
    run: async (client: any, message: any, args: any) => {
  
        let { data: users, error } = await supabase.from('users').select('daily,vote').eq('id', message.author.id);

        let daily: any = Math.ceil(users![0].daily/1000) || Math.ceil(Date.now()/1000);
        let vote: any = Math.ceil(users![0].vote/1000) || Math.ceil(Date.now()/1000);
        if(vote<=Math.ceil(Date.now()/1000)) vote = "Now"; else vote = `<t:${vote}:R>`;
        if(daily<=Math.ceil(Date.now()/1000)) daily = "Now"; else daily = `<t:${daily}:R>`;
        let embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`Daily: **${daily}**\nVote: **${vote}**`)
        .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL()});
        message.reply({ embeds: [embed] });

    
    }
};

export {main}