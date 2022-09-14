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
            let idrol = msg.member
            if (idrol == null) {
                idrol = {_roles:['2342342342', '2342342343']}
            }
            let user  = idrol._roles.find(item => item == '950468824010985562') 
            
            if (chatName == 'рекрутинг') {
                if (user === '1017170126530936892' ){
                } else {
                    setInterval(()=>{
                        dateS = new Date()
                        time = dateS.getTime();
                    }, 1)
                    get(ref(db,'user/' + msg.author.id + '/ContentTime/')).then((snapshot) => {
                        let data = snapshot.val();
                        dateS = new Date()
                        let timeMes = dateS.getTime();
                        let SixDay = 518400000 + data
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
