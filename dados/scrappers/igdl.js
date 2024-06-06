const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")

const igdl = (url) => new Promise((resolve, reject) => {
axios.post(`https://vidinsta.app/web/home/fetch`, qs.stringify({
url: url
}), {
headers: {
"user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
"connection": "keep-alive",
"origin": "https://vidinsta.app",
"referer": "https://vidinsta.app/",
"x-csrf-token": "IrIYkEXAyfiUcEZgQuW9jVVIwJkandxVddfZcPulCOZB4nDGNvCejPYGCiQovdPSbCDt9SypjWY555UEge06kQ==",
"x-requested-with": "XMLHttpRequest",
"cookie": "_csrf=608d48854ec29384d72c245d07f0b104cab4642bc2a6639def2a78956fd2784ea%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22cPhVs0WtbvLDjXn_9h-l64Q3L0LtzH2w%22%3B%7D;"}
}).then((res) => {
const $ = cheerio.load(res.data)
const dados = []
$('div.row').each((i, e) => {
if ($(e).find('.item-download > div > a').attr('href')) 
dados.push({link_dl: 'https://vidinsta.app' + $(e).find('.item-download > div > a').attr('href')})
})
resolve({status: res.status, resultado: dados[0]})
})
.catch((e) => {
reject(e)
})
})

module.exports = { igdl }