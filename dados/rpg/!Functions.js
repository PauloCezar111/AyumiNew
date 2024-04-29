const fs = require('fs')

const autorpg = JSON.parse(fs.readFileSync("./dados/rpg/autorpg.json"));

const megurpg = JSON.parse(fs.readFileSync("./dados/rpg/megurpg.json"));

const bcbet = JSON.parse(fs.readFileSync("./dados/rpg/1xbcbet.json"));

const minerar = JSON.parse(fs.readFileSync("./dados/rpg/minerar.json"));

const rg_pescaria = JSON.parse(fs.readFileSync("./dados/rpg/pescaria-t.json"));

const pescaria = JSON.parse(fs.readFileSync("./dados/rpg/pescaria.json"));

const coderpg = JSON.parse(fs.readFileSync("./dados/rpg/coderpg.json"));

const elitepasse = JSON.parse(fs.readFileSync("./dados/rpg/passerpg.json"));

const cavalosrpg = JSON.parse(fs.readFileSync("./dados/rpg/cavalosrpg.json"));

const galosrpg = JSON.parse(fs.readFileSync("./dados/rpg/galosrpg.json"));

const roubosrpg = JSON.parse(fs.readFileSync("./dados/rpg/roubosrpg.json"));

const addSaldo = (ID, VALUE) => {
XY = megurpg.map(i => i.id).indexOf(ID)
megurpg[XY].money += Number(VALUE)
fs.writeFileSync("./dados/rpg/megurpg.json", JSON.stringify(megurpg))
}

const rmSaldo = (ID, VALUE) => {
XY = megurpg.map(i => i.id).indexOf(ID)
megurpg[XY].money -= Number(VALUE)
fs.writeFileSync("./dados/rpg/megurpg.json", JSON.stringify(megurpg))
}

const ativarRPG = '• Ative O Rpg Primeiro!'

module.exports = { autorpg, megurpg, bcbet, minerar, rg_pescaria, pescaria, coderpg, elitepasse, cavalosrpg, galosrpg, roubosrpg, addSaldo, rmSaldo, ativarRPG }