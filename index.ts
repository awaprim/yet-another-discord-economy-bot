import { Collection, Client, GatewayIntentBits, Partials} from 'discord.js';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
const client = new Client({
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent
  ] // for now all of dat shit but one day i might remove useless ones
});
const commands = new Collection();


fs.readdirSync(__dirname + "/commands/").forEach(dir=>{
    fs.readdirSync(__dirname+"/commands/"+dir).filter((e)=>e.endsWith(".ts")).forEach(file=>{
        import(__dirname+`/commands/${dir}/${file}`).then(e=>{
            e.main.name.forEach((v: any)=>{
                commands.set(v, e);
            });
        });
    });
});



client.on("ready", () => {
    client.user?.setActivity(`test`);
    client.user?.setPresence({ status: "idle" });
    console.log(`${client.user?.username} ✅`);
});

client.on("messageCreate", async (message)=>{
    if (message.author.bot) return;
    if(!message.content.startsWith(".")) return;
    const args = message.content.slice(1).split(" ");
    let cmd = args.shift();
    let x: any = commands.get(cmd);
    if(x != undefined){
        x.main.run(client, message, args, commands);
    };
})


process.on("uncaughtException", (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n Exception origin: ${origin}`
  );
});
client.login(process.env["Token"]);
