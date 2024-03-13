const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
let users = []
let messages = [];

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/chat',(req,res)=>{
    console.log(req.session.user)
    const { user } = req.session.user
    if(user)
        res.render('chat',{ user })
    
})

app.get('/chat/get_message',(req,res)=>{
    res.render('index')
})

app.post('/user_validation',(req,res)=>{
    const { user,password } = req.body
    for(let i=0;i<users.length;i++)
    {
        if(users[i].userName === user)
        {
            if(users[i].password !== password)
            {
                console.log("Hello")
                res.send("password is wrong")
                return
            }
            else
            {
                console.log(users)
                req.session.user = { user }
                res.redirect('/chat')
                return 
            }
        } 
    }
    users.push({name:user,password:password})
    console.log(users)
    req.session.user = { user }
    console.log(req.session.user)
    res.redirect('/chat')
    
})

app.post("/chat/send_message",(req,res)=>{



})



app.listen(5000)