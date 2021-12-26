<h1 align="center">APGDB</h1>
<h4 align="center">Extensible automatic proxies grabber Discord bot</h4>
<p align="center">
	<a href="https://github.com/I2rys/APGDB/blob/main/LICENSE"><img src="https://img.shields.io/github/license/I2rys/APGDB?style=flat-square"></img></a>
	<a href="https://github.com/I2rys/APGDB/issues"><img src="https://img.shields.io/github/issues/I2rys/APGDB.svg"></img></a>
	<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/-Nodejs-green?style=flat-square&logo=Node.js"></img></a>
</p>


## Installation
Github:

    git clone https://github.com/I2rys/APGDB
    
NPM Packages:
```
npm i discord.js && npm i axios
```

## Setup
1. Open index.js
2. Find **Self** > **discordbot_token** and replace it with your Discord bot token.
3. Find **Self** > **guild_id** and replace it with your Discord server id.
4. Find **Self** > **channel_id** and replace it with your Discord server channel id on where to send the proxies.
 
## Usage
```
node index.js
```

## Note
The proxies are sent every 30 minutes and to change the time open index.js then find **Self** > **sending_time** and replace it with other time(seconds).

## License
MIT © I2rys
