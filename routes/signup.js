const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {findUser,users} = require('../commonResources.js')

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/',(req,res)=>{
    res.render('signup')
})

router.post('/signup_validation',(req,res)=>{
    const { user,password } = req.body
    if(findUser(user) == -1)
    {
        users.push({userName:user,password:password,messages:{}, knownUsers:[]})
        res.send({redirect:true, URL:'/chat'})
    }
    else
        res.send({redirect:false, mess:"username not available"})

})

module.exports = router