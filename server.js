const { Client } = require('whatsapp-web.js');
const { Fitur } = require('./func');

const fitur = new Fitur();

const qrcode = require('qrcode-terminal');
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('OK sudah bisa di gunakan bot nya !')
});

client.on('message', async (msg) => {
  await msg.reply(fitur.ambilCommand(msg.body));
});


client.initialize();