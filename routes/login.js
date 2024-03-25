const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {findUser,users} = require('../commonResources.js')

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/login_validation',(req,res)=>{
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

module.exports = router
