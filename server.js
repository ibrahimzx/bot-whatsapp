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
  if (fitur.ambilPerintah(msg.body, 0) === '#h') {
    console.log(`Perintah : ${msg.body}`);
    await msg.reply(fitur.perintah_h());
    
  } else if (fitur.ambilPerintah(msg.body, 0) === '#sb') {
    console.log(fitur.ambilPerintah(msg.body, 1));
    await msg.reply(fitur.perintah_sb(fitur.ambilPerintah(msg.body, 1)));

  }
});


client.initialize();