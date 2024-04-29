const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function BrasileirãoFutebol() {
    try {
        // Obtenha os dados da página
        const { data } = await axios.get('https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/2024');
        
        // Carregue os dados com o Cheerio
        const $ = cheerio.load(data);

        // Crie um array para armazenar as informações dos times
        let teams = [];
        
        // Seletor CSS para os dados da tabela de classificação
        const rows = $('div#classificacao tbody tr');

        // Loop para percorrer cada linha da tabela
        rows.each((i, row) => {
            const cells = $(row).find('td');
            
            // Verifica se as células existem
            if (cells.length > 0) {
                const equipe = cells.eq(0).find('span.hidden-xs').text().trim();
                const pontos = cells.eq(1).text().trim();
                const jogosJogados = cells.eq(2).text().trim();

                // Verifica se o nome da equipe está presente
                if (equipe) {
                    teams.push({
                        equipe,
                        pontos: pontos || '0',
                        jogosJogados: jogosJogados || '0',
                    });
                }
            }
        });

        // Verifica se há dados disponíveis
        if (teams.length > 0) {
            // Salva os dados em um arquivo JSON
            fs.writeFileSync('./tabela.json', JSON.stringify(teams, null, 2), 'utf-8');
            return teams;
        } else {
            console.error('Nenhum time foi raspado com sucesso.');
            return [];
        }
    } catch (error) {
        console.error('Erro durante a raspagem:', error);
        return [];
    }
}

module.exports = { BrasileirãoFutebol };
