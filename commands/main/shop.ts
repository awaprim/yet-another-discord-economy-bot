import { createClient } from '@supabase/supabase-js';
import { EmbedBuilder } from 'discord.js';
const supabase = createClient(process.env["SupabaseURL"] || "", process.env["supabaseApiKey"] || "");
const main: any = {
  name: ["shop"],
  run: async (client: any, message: any, args: any) => {
    
    let { data: shopdata, error } = await supabase.from('shop').select('id,name,price');
    let stufftodisplayonshop: any = ""
    shopdata?.forEach(e=>{
      stufftodisplayonshop += `${e.id}: **${e.name}** - ${e.price} Coins.\n`
    })
    if(stufftodisplayonshop=="") stufftodisplayonshop = "Empty";

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Buy stuff for coins!")
      .setDescription(stufftodisplayonshop)
      .setAuthor({name:message.author.username, iconURL:message.author.displayAvatarURL()});
      message.reply({
          embeds: [embed]
      });


  }
};

export {main}
