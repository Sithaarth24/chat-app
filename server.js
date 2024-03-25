require('dotenv').config()

const express = require('express')
// const mongoose = require('mongoose')
const app = express()

app.set('view engine','ejs')

app.use('/login',require('./routes/login'))
app.use('/signup',require('./routes/signup'))
app.use('/chat',require('./routes/chat'))


app.get('/',(req,res)=>{
    res.redirect('/login')
})

// mongoose.connect(process.env.DB_URL)
// db = mongoose.connection

// db.on('error',(e)=>{console.log(e)})
// db.once('open',()=>{console.log('Connection successfull')})
// // console.log("Just checking git push1")


app.listen(3000)