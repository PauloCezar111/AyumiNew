const fs = require("fs")
const chalk = require("chalk")
const colors = chalk

const menu = (pushname, prefix) => {

return ``
} 

exports.menu = menu

const destrava = () => {
    return `
4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4

4
r
r
4 `
}
exports.destrava = destrava

//Campo De Atualização

let file = require.resolve(__filename)
fs.watchFile(file, () => { 
fs.unwatchFile(file)
console.log(colors.yellowBright(`• Arquivo Do Menu Atualizado Com Sucesso!`))
delete require.cache[file]
require(file) 
})