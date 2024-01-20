const env = require('dotenv');
const axios = require('axios');
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
    2. #sb site.com (scanning subdomain)
    3. #dp site.com (da pa checker)
    4. #bl site.com (backlink checker)
    5. #backup site.com (backup checker)`;
  }

  async perintah_sb(site) {
    const options = {
      method: 'GET',
      url: 'https://subdomain-finder3.p.rapidapi.com/v1/subdomain-finder/',
      params: {
        domain: site
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'subdomain-finder3.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      
      return response.subdomains.map(sub => {
        return {
          subdomain: sub.subdomain,
          ip: sub.ip || 'tidak ada ip nya bang :D',
          cloudflare: sub.cloudflare ? 'ada' : 'tidak ada'
        };
      });
    } catch (error) {
      console.error(error);
      return 'ada error ni, liat latar belakang cak :D';
    }

  }

}



module.exports = { Fitur };
