// Import modules
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config();
var request = require('request');

// put the url of the api. this code expects json 
const coinUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false';
const nameBeforePrice = 'price is '; // this is the name before price is set
const guildId = '832468129644544040'
const updateInterval = 30000; // this is how fast it will update in millis

client.login(process.env.TOKEN); // <- get bot token in .env

// this will run when the bot is ready
client.on('ready', () => {
    console.log('I am ready!');

    // sets interval and starts command
    setInterval(() => {
        changeNameToPrice()
    }, updateInterval)
});

// if you want to add commands by message put them below
client.on('message', message => {

    // type !ping in chat to use this command
    if (message.content == "!ping") { // Check if content of message is "!ping"
        message.channel.send("pong!"); // Call .send() on the channel object the message was sent in
    }

})


// this function changes the name and gets the price
function changeNameToPrice() {

    // starts api request
    request({ url: coinUrl, json: true }, function(err, res, json) {
        if (err) {
            //put you error handeling here
            throw err;
        }

        //if successful run below 
        const price = json.ethereum.usd // <- json object for price
        changeName(price); // pass the price and change the name
        console.log('name updated'); // log change
        return 1;
    });

}

// the changes the name
async function changeName(newName) {
    await (await client.guilds.fetch(guildId)).me.setNickname(nameBeforePrice + newName);
}