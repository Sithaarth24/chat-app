const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {isPending,findUser,users,new_messages} = require('../commonResources.js')

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/',(req,res)=>{
    res.render('chat')
    
})

router.post('/get_message',(req,res)=>{
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

router.post("/send_message",(req,res)=>{
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

// router.post('/chat/retrieve_past_message',(req,res)=>{
//     console.log(users)
//     const { sender } = req.body
//     const i = findUser(sender)
//     res.send({available:true, mess:users[i].messages})
// })

module.exports = router



