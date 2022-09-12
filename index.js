//Подключаем все пакеты
import {getDatabase, ref, get, set} from "firebase/database";
import discord  from 'discord.js'; 
import config from './botconfig.json' assert {type: "json"}; 
import { initializeApp } from "firebase/app";
//Подключаем FireBase
const firebaseConfig = {
    apiKey: "AIzaSyCNNVB5IbTb-Cdp0qx8NUhpDTRk7_3WIPY",
    authDomain: "botdis-491ba.firebaseapp.com",
    databaseURL: "https://botdis-491ba-default-rtdb.firebaseio.com",
    projectId: "botdis-491ba",
    storageBucket: "botdis-491ba.appspot.com",
    messagingSenderId: "469090335949",
    appId: "1:469090335949:web:f1b65b2a4687cd95383d84",
    measurementId: "G-20ESKN2P4J"
};
      
// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

//Основной код бота
function BotCode() {
    const db = getDatabase();
    const bot = new discord.Client({partials: ["message"]})
    let token = config.token; 
    let date = new Date()
    //let SixDay = 518400000 + time
    let dateS = new Date()
    let time = dateS.getTime();
    bot.on('message', msg => {
            let chatName = msg.channel.name 
            if (chatName == '456456445645456456456456456') {
                if ((msg.author.id === '254697346275868673') ||  (msg.author.id === '292960305649156096') ||  (msg.author.id === '499627043609378816') ||  (msg.author.id === '308228415016927233') ||  (msg.author.id === '254697346275868673')) {
                } else {
                    setInterval(()=>{
                        dateS = new Date()
                        time = dateS.getTime();
                    }, 1)
                    get(ref(db,'user/' + msg.author.id + '/ContentTime/')).then((snapshot) => {
                        let data = snapshot.val();
                        dateS = new Date()
                        let timeMes = dateS.getTime();
                        let SixDay = 10000 + time
                        if (timeMes <= SixDay) {
                            data = snapshot.val();
                            msg.delete()
                            let Remains = new Date(SixDay).toLocaleString()
                            msg.author.send("Сообщение в текстовом канале "+ chatName + " будут доступны " + Remains)
                        } else {
                            set(ref(db, 'user/' + msg.author.id), {
                                id: msg.author.id,
                                ContentTime: time,
                            })
                            data = snapshot.val();
                        }
                    });
                }
            } else {
                
            }
    });
    bot.login(process.env.BOT_TOKEN);
}
BotCode();
