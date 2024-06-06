//Não Mexa Em Nada

async function infoGp(ayumi, from, groupAdmins, somembros, date, selo) {
try {
var ppUrl = await ayumi.profilePictureUrl(from, 'image')
} catch {
var ppUrl = `https://telegra.ph/file/6ca032835ed7a16748b6f.jpg`
}
var puxarInfo = await ayumi.groupMetadata(from)
var ANC_INFO = puxarInfo.announce
var returnAnnounce = ANC_INFO === false ? "Não." : ANC_INFO === true ? "Sim." : undefined
var RST_INFO = puxarInfo.restrict 
var returnRestrict = RST_INFO === false ? "Sim." : RST_INFO === true ? "Não." : undefined
var infoCreator = puxarInfo.subjectOwner
infoGroup = `ꪶ͢͜‍INFORMAÇÕES DO GRUPOꫂ

𖢈Nome Do Grupo: ${puxarInfo.subject}
𖢈Grupo Criado Por: @${infoCreator.replace("@s.whatsapp.net", "")}
𖢈Admins: ${groupAdmins.length}
𖢈Membros: ${somembros.length}
𖢈Total De Membros: ${puxarInfo.participants.length}
𖢈Data: ${date}`
ayumi.sendMessage(from, {image: {url: ppUrl}, caption: infoGroup, mentions: [infoCreator]}, {quoted: selo})
}

module.exports = { infoGp } 