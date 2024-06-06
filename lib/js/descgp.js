//Não Mexa Em Nada

async function setDescGp(q, from, ayumi, selo) {
ayumi.groupUpdateDescription(from, `${q}`)
ayumi.sendMessage(from, {text: '• Descrição Alterada Com Sucesso!'}, {quoted: selo})
}

module.exports = { setDescGp } 