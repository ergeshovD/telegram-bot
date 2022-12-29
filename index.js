const TelegramApi = require('node-telegram-bot-api')
const {gamaOptions, againOptions} = require('./options')
const token = '5946406413:AAHsW8jqS5VSbEVVcUAY-jyjgBRtnUgooag'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId,`Азыр мен 0 - 9, чейин сан тандайм сен тап!! 🫵🏽`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Тап !!', gameOptions)
}

const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Саламдашуу'},
        {command: '/info', description: 'Мен жонундо маалымат'},
        {command: '/game', description: 'Санды тап ойуну 🤖'}
    ])

    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            // await bot.sendPhoto(chatId, 'https://sport.ua/news/606954-foto-messi-naglyadno-pokazal-vsemu-miru-kto-zdes-goat')
            await  bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/1.webp')
            return  bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автора 'ergv.d7'`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId, `Сенин Аты-Жонун ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `Мен сени тушунгон жокмун 🙅🏽‍♂ ${msg.from.first_name} ${msg.from.last_name}`)
    })
    bot.on('callback_query', async msg => {
       const data = msg.data
        const chatId = msg.message.chat.id
        if (data ==='/again') {
           return  startGame(chatId)
        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Кутуктайм, сен санды туура таптын ${chats[chatId]} 👏🏽`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `Тилеке каршы тападын бот санды таап койду ${chats[chatId]} 🥲`, againOptions)
        }
        bot.sendMessage(chatId, `Сен ${data} санын тандадын ✅`)
    })

}

start()