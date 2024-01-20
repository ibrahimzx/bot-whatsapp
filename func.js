class Fitur{
  pisahKanPerintah (req) {
    return req.split(' ')[1];
  };

  perintah_h () {
    return `[ Cicak Bot ]
    1. #h (bantuan)
    2. #sb site.com (scanning subdomain)
    3. #dp site.com (da pa checker)
    4. #bl site.com (backlink checker)
    5. #backup site.com (backup checker)`;
  }

  ambilCommand (req) {
    const res = req.split(' ')[0];
    if (res === '#h') {
      return this.perintah_h;
    }
  }
}


module.exports = { Fitur };
