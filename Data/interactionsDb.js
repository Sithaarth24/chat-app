const mongoose = require('mongoose')
const interactionsShcema = new mongoose.Schema({
    user1 : { 
        name : String,
        chat : [{type : String}]
    },
    user2 :{
        name : String,
        chat : [{type : String}]
    } 
})

module.exports = interactionsShcema