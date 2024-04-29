#!bin/bash
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
PURPLE="\033[1;35m"
GREEN="\033[1;32m"
RED='\033[1;31m'
NC='\033[0m'

echo $YELLOW"[$RED ! $YELLOW] Irei Instalar As Dependências Necessárias Para Iniciar O Bot! Para Prosseguirmos Digite ( s )"
read inp
if [ "$inp" = "s" ]; then
termux-setup-storage
apt-get upgrade
apt-get update
apt upgrade -y
apt update -y
apt install nodejs -y 
apt install nodejs-lts -y 
apt install ffmpeg -y
apt install wget -y 
apt install git -y
yarn install
echo $GREEN"As Dependências Foram Instaladas Com Sucesso! Irei Iniciar O Bot Agora!"
npm start
fi
if [ "$inp" = "n" ]; then
    echo $RED"Certo! Não Irei Instalar As Dependências! Se Mata"
    exit
fi