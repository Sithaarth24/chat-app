require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DB_URL)
db = mongoose.connection

db.on('error',(e)=>{console.log(e)})
db.once('open',()=>{console.log('Connection successfull')})
db.listCollections()
    .then(data=>console.log(data))

let users = []
let new_messages = []

app.set('view engine','ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.redirect('/login')
})

// app.post('/chat/retrieve_past_message',(req,res)=>{
//     console.log(users)
//     const { sender } = req.body
//     const i = findUser(sender)
//     res.send({available:true, mess:users[i].messages})
// })

app.post("/chat/send_message",(req,res)=>{
    const {sender,reciever,data} = req.body
    // console.log(data)
    const i = findUser(sender)
    if(i!=-1 && findUser(reciever)!=-1)
        if(reciever in users[i].messages)
            users[i].messages[reciever].push(data)
        else
            users[i].messages[reciever] = [data]
    else
    {
        res.send({ sent:false, mess:"No user found"})
        return
    }
        
    let ind = isPending(reciever)
    if(ind!=-1)
    {
        if(sender in new_messages[ind].messages)
            new_messages[ind].messages[sender].push(data)
        else
            new_messages[ind].messages[sender] = [data]
        // console.log(users,"\n",new_messages[ind])
    }   
    else
    {
        let obj = {}
        obj[sender]=[data]
        // obj[sender].push(data)
        new_messages.push({reciever:reciever,messages:obj})
        // console.log(users,"\n",new_messages[new_messages.length-1])
    }
        
    res.send({ sent:true, mess:"Message sent" })
    
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/chat',(req,res)=>{
    res.render('chat')
    
})

app.post('/chat/get_message',(req,res)=>{
    const { sender } = req.body
    const i = isPending(sender)
    if(i != -1)
    {
        res.send({pending: true, mess: new_messages[i].messages})
        new_messages.splice(i,1)
    }
    else
        res.send({pending: false})
})

app.post('/login_validation',(req,res)=>{
    const { user,password } = req.body
    let ind = findUser(user)
    if(ind!=-1)
    {
        if(users[ind].password === password)
        {
            res.send({redirect:true,URL:"/chat"})
        }
        else
            res.send({redirect:false,mess:"Check your password"})
    }
    else
        res.send({redirect:false,mess:"No user found!"})
    
})

app.post('/signup_validation',(req,res)=>{
    const { user,password } = req.body
    if(findUser(user) == -1)
    {
        users.push({userName:user,password:password,messages:{}, knownUsers:[]})
        res.send({redirect:true, URL:'/chat'})
    }
    else
        res.send({redirect:false, mess:"username not available"})

})

function isPending(user)
{
    for(let i=0;i<new_messages.length;i++)
    {
        if(new_messages[i].reciever === user)
            return i
    }
    return -1
}

function findUser(user)
{
    for(let i=0;i<users.length;i++)
    {
        if(users[i].userName === user)
            return i
    }
    return -1
}



app.listen(3000)