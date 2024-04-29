const fs = require('fs');

function fuzzySimilarity(word1, word2) {
    function generateNGrams(word, n) {
        const nGrams = [];
        for (let i = 0; i < word.length - n + 1; i++) {
            nGrams.push(word.slice(i, i + n));
        }
        return nGrams;
    }

    const nGrams1 = generateNGrams(word1, 2);
    const nGrams2 = generateNGrams(word2, 2);
    const commonNGrams = nGrams1.filter(nGram => nGrams2.includes(nGram));
    const similarity = Math.round((2 * commonNGrams.length) / (nGrams1.length + nGrams2.length) * 100);
    
    return similarity;
}

const listCommands = (targetWord) => {
    const fileContent = fs.readFileSync("ayumi.js", "utf8");
    const commandsRegex = /case\s+['"](.+?)['"]/g;
    let mostSimilarCommand = "";
    let highestSimilarity = -1;
    let match;

    while ((match = commandsRegex.exec(fileContent)) !== null) {
        const extractedCommand = match[1];
        const similarity = fuzzySimilarity(targetWord, extractedCommand);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            mostSimilarCommand = extractedCommand;
        }
    }

    return {
        command: mostSimilarCommand, 
        similarity: highestSimilarity
    };
};

// Exemplo de uso
const targetWord = "play-ad"; // Palavra alvo
const cmdSimilarity = listCommands(targetWord);
//console.log(`O comando mais similar à palavra "${targetWord}" é "${cmdSimilarity.command}" com uma similaridade de ${cmdSimilarity.similarity}%`);

module.exports = { fuzzySimilarity, listCommands, cmdSimilarity }