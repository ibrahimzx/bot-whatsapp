const env = require('dotenv');
const axios = require('axios');
const fs = require('fs');
env.config();

class Fitur{

  constructor(){
    this.apiKey = process.env.API_KEY;
  }

  ambilPerintah (req, index) {
    // #sb site.com
    // #sb index ke 0
    // #site.com index ke 1
    return req.split(' ')[index];
  };

  perintah_h () {
    return `[ Cicak Bot ]
    1. #h (bantuan)
    2. #chk site.com (backup checker)`;
  }

  pecahData = (domain) => {
    // memecah data dengan separator \n lalu mengubahnya ke bentuk array
    return domain.split('\n');
  }
  
  ambilDomain = (domain) => {
    // mengambil nama domain dari subdomain
    return domain[0].match(/\/\/(.*?)(\/|$)/)[1];
  }
  
  convertKeJson = (domain, subdomain) => {
    // mengkonvert data array ke bentuk json
    return JSON.stringify({
      domain : domain,
      list : subdomain
    })
  }
  
  simpanData = (dataJson, domain, callback) => {
    // menyimpan data kedalam bentuk json
    fs.writeFile(`../db/${domain}.json`, dataJson, err => {
      if (err) {
        callback('ada error');
      } else {
        callback(null, 'berhasil disimpan');
      }
    });
  }
  
  cariFileDomain = (namaDomain) => {
    // const namaFile = `../db/${namaDomain}.json`; // linux
    const namaFile = `D:\\Rimba\\bot-whatsapp\\db\\${namaDomain}.json`;
    if (fs.existsSync(namaFile)) {
      return 1;
    } else {
      return 0;
    }
  }
  
  ambilDataDariDomain = async (namaDomain) => {
    // const fileDomain = `../db/${namaDomain}.json`; // linux
    const fileDomain = `D:\\Rimba\\bot-whatsapp\\db\\${namaDomain}.json`;
    try {
      const data = await fs.promises.readFile(fileDomain, 'utf-8');
      const dataList = data.list;
      console.log(`Data Ditemukan\nDomain : ${data.domain}\n${dataList.map(dtlist => dtlist.trim()).join('\n')}`)
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  };


}



module.exports = { Fitur };
