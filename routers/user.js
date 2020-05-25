const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

var user = new User({
    name:'test2',
    email: 'test@test2.com',
    password: 'Abc1234567891011@b'
})

// user.save((err,res)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(res)
//     }
// })


router.get('/',(req,res)=>{
    res.render('user',{
        title:'Photo Sharing App',
        name: 'Jatin Kumar'
    })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router