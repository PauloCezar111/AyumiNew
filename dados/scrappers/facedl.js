//Scrapper Download Facebook 

//Const
const fetch = require('node-fetch');
const axios = require('axios');
const cheerio = require('cheerio');

//FetchJson
const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

//Funções 

async function FacebookDl(q) {
data = await fetchJson(`https://tools.betabotz.eu.org/tools/facebookdl?url=${q}`)
return data.result.hd_q
}

module.exports = { FacebookDl }
