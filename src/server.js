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
    fitur.subdomainFinder(domain = fitur.ambilPerintah(msg.body, 1)).then(async data => {
      let hasil = '';
      data.forEach(datas => {
        hasil += `Subdomain: ${datas.subdomain}\n`;
        hasil += `IP: ${datas.ip}\n`;
        hasil += `Cloud Flare Status: ${datas.cloudflare}\n\n`;
      });
      await msg.reply(hasil);
    }).catch(async err => {
      console.log(err);
      await msg.reply(`fitur scane domain error cak, mungkin api nya limit :')`);
    })
  } else if (fitur.ambilPerintah(msg.body, 0) === '#checkDAPA') {
    fitur.dapaBacklinkChecker(fitur.ambilPerintah(msg.body, 1)).then(async data => {
      await msg.reply(`[ ${data.target} ]\nDa Score: ${data.da_score}\nPA Score: ${data.pa_score}\nSpam Score: ${data.spam_score}\nTotal Backlink: ${data.total_backlinks}`);
    }).catch(async err => {
      console.log(err);
      await msg.reply(`fitur DAPA Checker error cak, mungkin api nya limit :')`);
    });
  }
});


client.initialize();