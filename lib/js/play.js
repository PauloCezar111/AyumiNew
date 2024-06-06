//Não Mexa Em Nada

const { prepareWAMessageMedia } = require('@whiskeysockets/baileys'); 

const fs = require('fs-extra');

async function playDl(q, ayumi, yts, prefix, delay, reply, from, largeNumber) {
try {
if(!q) return reply('• Informe O Nome Da Música!')
//Puxar As Informações
var search = await yts(q)
//Escolher Algum Dos Resultados Do Módulo 
var x = search.videos[Math.floor(Math.random() * search.videos.length)]
//Enviar A Foto Para O Servidor Do Whatsapp 
Bab = await prepareWAMessageMedia({image: {url: x.thumbnail}}, {upload: ayumi.waUploadToServer});
//Texto 
bla = `⏤͟͟͞͞ꪶAyumi Bot - Ytplay

𖢈Nome: ${x.title}
𖢈Tempo: ${x.timestamp}
𖢈Views: ${largeNumber(x.views)}
𖢈Canal: ${x.author.name}
𖢈Postado: ${x.ago}`
//Enviar Os Botões 
ayumi.relayMessage(from,{interactiveMessage: {header: {title: '', hasMediaAttachment: true, imageMessage: Bab.imageMessage}, headerType: 'IMAGE', body: {text: bla}, footer: {text: "@Ayumi"}, nativeFlowMessage: {buttons: [{name: "quick_reply", buttonParamsJson: JSON.stringify({display_text: "Baixar O Áudio", id: `${prefix}ytmp3 ${x.url}`,}),
}, {name: "quick_reply", buttonParamsJson: JSON.stringify({display_text: "Baixar Documento",id: `${prefix}playdoc ${q}`,disabled: false}),
}, {name: "quick_reply", buttonParamsJson: JSON.stringify({display_text: "Baixar O Vídeo", id: `${prefix}ytmp4 ${x.url}`,disabled: false}),
}, {name: "cta_url", buttonParamsJson: JSON.stringify({display_text: "Ver No YouTube", url: x.url,merchant_url: x.url}),
}], messageParamsJson: "",},},}, {}).then((r) => console.log(r));
} catch(e) {
reply('• Erro!')
console.error(e)
}
}

module.exports = { playDl }