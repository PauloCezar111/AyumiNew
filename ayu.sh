#!/bin/bash

RED='\033[0;31m'
NC='\033[0m' # No Color
CYAN='\033[1;36m'

echo   "${RED}╭━━━━━•𖧹❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ𖧹•━━━━━╮${NC}"
echo   "${RED}│${NC}"
echo   "${RED}│${CYAN}Digite '1' Para Conectar Via Código"
echo   "${RED}│${CYAN}Digite '2' Para Conectar Via QR-Code"
echo   "${RED}│${CYAN}Digite '3' Para Cancelar A Operação"
echo   "${RED}│${NC}"
echo   "${RED}╰━━━━━•𖧹❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ❀⃘࣭࣭࣭࣭ٜꔷ⃔໑࣭࣭ٜ𖧹•━━━━━╯${NC}"

read -p "Digite A Opção Desejada: " opcao

case $opcao in
    1)
        echo ""
        node index.js --code

        ;;
    2)
        echo ""
node index.js
        ;;
    3)
        echo "Operação Finalizada!"
        ;;
    *)
        echo "Opção inválida."
        ;;
esac
