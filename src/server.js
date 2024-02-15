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
    
  } else if (fitur.ambilPerintah(msg.body, 0) === '#chk') {

    // console.log(fitur.ambilPerintah(msg.body, 0)); // ambil kode perintah
    // console.log(fitur.ambilPerintah(msg.body, 1)); // ambil domain

    const domain = fitur.ambilPerintah(msg.body, 1);
    if (fitur.cariFileDomain(domain.trim().replace(/\s+/g, '')) === 1) {
      fitur.ambilDataDariDomain(domain.trim().replace(/\s+/g, '')).then(async data => {
        const dataList = data.list;
        await msg.reply(`Data Ditemukan\nDomain : ${data.domain}\n${dataList.map(dtlist => dtlist.trim()).join('\n')}`);
        console.log(`Data Ditemukan\n${data}`);
      }).catch(async err => {
        await msg.reply('Ada error cak :D cek terminal');
        console.log(`error ${err}`);
      })
    } else {
      console.log(`${domain} tidak tersedia !`);
      await msg.reply(`${domain} tidak tersedia !`);
    }

  } else if (fitur.ambilPerintah(msg.body, 0) === '#add') {
    const dataDomain = fitur.ambilDataDomainDariPerintah(msg.body);
    const namaDomain = fitur.ambilDomain(dataDomain);
    const jsonData = fitur.convertKeJson(namaDomain, dataDomain);
    fitur.simpanData(jsonData, namaDomain, async (err) => {
      if (err) {
        console.log(`ada error\n${err}`);
        await msg.reply(`ada error\n${err}`);
      } else {
        console.log(`data ${namaDomain} berhasil di simpan !`);
        await msg.reply(`data ${namaDomain} berhasil di simpan !`);
      }
    });
  } else if (fitur.ambilPerintah(msg.body, 0) === '#scaneDomain') {
    const domain = fitur.ambilPerintah(msg.body, 1);
    fitur.subdomainFinder(domain).then(async data => {
      const hasil = [];
      data.forEach(datas => {
        hasil.push({
          Subdomain: datas.subdomain,
          IP: datas.ip,
          'Cloud Flare Status': datas.cloudflare
        });
      });
      await msg.reply(`Hasil Scane ${domain}\n${JSON.stringify(hasil, null, 2)}`);
    }).catch(async err => {
      console.log(err);
      await msg.reply(`ada error cak`);
    })
  }
});


client.initialize();