//Dependencies
const Discord = require("discord.js")
const Axios = require("axios")
const Fs = require("fs")

//Variables
const Bot = new Discord.Client()

var Self = {
    discordbot_token: "",
    guild_id: null,
    channel_id: null,
    sending_time: 1800,
    modules: Fs.readdirSync("./modules", "utf8"),
    proxies: {
        https: [],
        socks4: [],
        socks5: []
    }
}

//Main
Bot.on("ready", ()=>{
    Bot.user.setActivity("APGDB")
    console.log("APGDB is running.")

    const guild = Bot.guilds.cache.find(guild => guild.id == Self.guild_id)
    const channel = guild.channels.cache.find(channel => channel.id == Self.channel_id)

    setInterval(async function(){
        var module_index = 0

        Get_Proxies()
        async function Get_Proxies(){
            if(module_index === Self.modules.length){
                console.log("Sending the proxies to the Discord server channel.")
                
                if(Self.proxies.https.length){
                    channel.send("[APGDB] HTTP/HTTPS proxies:", { files: [ new Discord.MessageAttachment(Buffer.from(Self.proxies.https.join("\n")), "http_https_proxies.txt") ] }).then(()=>{
                        console.log("HTTP/HTTPS proxies successfully sent.")
                    })
                }else{
                    console.log("HTTP/HTTPS proxies is empty therefore not sent.")
                }

                if(Self.proxies.socks4.length){
                    channel.send("[APGDB] Socks4 proxies:", { files: [ new Discord.MessageAttachment(Buffer.from(Self.proxies.socks4.join("\n")), "socks4_proxies.txt") ] }).then(()=>{
                        console.log("Socks4 proxies successfully sent.")
                    })
                }else{
                    console.log("Socks4 proxies is empty therefore not sent.")
                }

                if(Self.proxies.socks5.length){
                    channel.send("[APGDB] Socks5 proxies:", { files: [ new Discord.MessageAttachment(Buffer.from(Self.proxies.socks5.join("\n")), "socks5_proxies.txt") ] }).then(()=>{
                        console.log("Socks5 proxies successfully sent.")
                    })
                }else{
                    console.log("Socks5 proxies is empty therefore not sent.")
                }

                return Self.proxies = { https: [], socks4: [], socks5: [] }
            }

            const module = Self.modules[module_index].replace(".js", "")

            console.log(`Executing module ${module}`)
            const data = await require(`./modules/${Self.modules[module_index]}`).self(Axios)

            if(!data.proxies.length){
                console.log(`No proxies found from module ${module}`)
                module_index++
                return Get_Proxies()
            }

            console.log(`${data.proxies.length} proxies found from module ${module}`)
            
            if(data.type === "https"){
                for( i in data.proxies ){
                    Self.proxies.https.push(data.proxies[i])
                }
            }else if(data.type === "socks4"){
                for( i in data.proxies ){
                    Self.proxies.socks4.push(data.proxies[i])
                }
            }else if(data.type === "socks5"){
                for( i in data.proxies ){
                    Self.proxies.socks5.push(data.proxies[i])
                }
            }

            module_index++
            return Get_Proxies()
        }
    }, Self.sending_time * 1000)
})

Bot.login(Self.discordbot_token)