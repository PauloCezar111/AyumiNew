//Não Mexa Em Nada

const fs = require('fs')

const megurpg = JSON.parse(fs.readFileSync("./././dados/rpg/megurpg.json"));

const addSaldo = (ID, VALUE) => {
XY = megurpg.map(i => i.id).indexOf(ID)
megurpg[XY].money += Number(VALUE)
fs.writeFileSync("./././dados/rpg/megurpg.json", JSON.stringify(megurpg))
}

const rmSaldo = (ID, VALUE) => {
XY = megurpg.map(i => i.id).indexOf(ID)
megurpg[XY].money -= Number(VALUE)
fs.writeFileSync("./././dados/rpg/megurpg.json", JSON.stringify(megurpg))
}

async function explorarEspaco(sender) {
const eventos = [
{ mensagem: 'você foi para uma expedição da NASA em Marte, e após pousar achou um tesouro perdido contendo 1000 moedas', acao: () => addSaldo(sender, 1000)}
];
const evento = eventos[Math.floor(Math.random() * eventos.length)];
await evento.acao();
return evento.mensagem;
}

async function explorarFloresta(sender) {
const eventos = [
{ mensagem: 'encontrou um baú de tesouro com 100 moedas!', acao: () => addSaldo(sender, 100) },
{ mensagem: 'você pisou em uma mina e morreu, perdendo 250 moedas', acao: () => rmSaldo(sender, 250) },
{ mensagem: 'você está andando normalmente pela floresta, até que avista uma casa no meio do nada e decide entrar, quando entra você vê um baú com 400 moedas, porém o dono chega e te mata, fazendo você perder 300 moedas', acao: () => rmSaldo(sender, 300) },
{ mensagem: 'você caiu em uma armadilha dos caçadores, por sorte você conseguiu sair e roubar 700 moedas deles!', acao: () => addSaldo(sender, 700) }
];
const evento = eventos[Math.floor(Math.random() * eventos.length)];
await evento.acao();
return evento.mensagem;
}

async function explorarMontanha(sender) {
const eventos = [
{ mensagem: 'ao fazer a trilha para chegar ao topo da montanha, você avista ao lado uma caverna de ouro e decide pegar as moedas que estão por lá, te resultando 500 moedas!', acao: () => addSaldo(sender, 500) },
{ mensagem: 'você estava fazendo sua caminhada a montanha normalmente, até que um bandido chega a você e te assalta, assim levando seus 200 ouros', acao: () => rmSaldo(sender, 200) }
];
const evento = eventos[Math.floor(Math.random() * eventos.length)];
await evento.acao();
return evento.mensagem;
}

async function explorarCaverna(sender) {
const eventos = [
{ mensagem: 'você estava cavando normalmente, até que vê uma mina abandonada e decide ir minerar as rubis que tem lá, resultando em 700 moedas', acao: () => addSaldo(sender, 700) }
];
const evento = eventos[Math.floor(Math.random() * eventos.length)];
await evento.acao();
return evento.mensagem;
}
async function explorar(from, sender, ayumi) {
const locais = ['Floresta', 'Montanha', 'Espaço',  'Caverna'];
const localEscolhido = locais[Math.floor(Math.random() * locais.length)];
let resultado;
switch (localEscolhido) {
case 'Floresta':
resultado = await explorarFloresta(sender);
break;
case 'Montanha':
resultado = await explorarMontanha(sender);
break;
case 'Espaço':
resultado = await explorarEspaco(sender);
break;
case 'Caverna':
resultado = await explorarCaverna(sender);
break;
}
const resposta = `Você decidiu explorar a ${localEscolhido} e ${resultado}`;
return resposta
}

module.exports = { explorar }