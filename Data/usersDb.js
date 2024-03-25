const mongoose = require('mongoose')
const userShcema = new mongoose.Schema({
    email : String,
    name : String,
    knownUsers : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    }]
})

module.exports = userShcema