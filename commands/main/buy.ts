import { createClient } from '@supabase/supabase-js';
import { EmbedBuilder } from 'discord.js';
const supabase = createClient(process.env["SupabaseURL"] || "", process.env["supabaseApiKey"] || "");
const main: any = {
  name: ["buy"],
  cooldown: 5,
  run: async (client: any, message: any, args: any, commands: any) => {
    let { data: shopdata } = await supabase.from('shop').select('price,run').eq('id', args[0])
    if(shopdata?.length==0) return message.reply("The item with that id does not exist!")
    let { data: user } = await supabase.from('users').select('coins').eq('id', message.author.id)
    if(user?.length==0) return message.reply(`You can't afford to buy this! you need \`${shopdata![0].price}\` more coins.`)
    if(user![0].coins<shopdata![0].price) return message.reply(`You can't afford to buy this! you need \`${shopdata![0].price-user![0].coins}\` more coins.`)
    await supabase.from('users').upsert([{ id: message.author.id, coins: user![0]?.coins-shopdata![0].price }]).select()
    commands.get(shopdata![0].run).main.run(client, message, args, commands);


  }
};

export {main}
