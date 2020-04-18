const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/user')

const router = Router()

router.post('/register',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'wrong password. min password length - 6')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect registration'
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if(candidate){
                return res.status(400).json({message: 'User already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'new User has been created'})


        }catch(err){
            res.status(500).json({message: 'Something goes wrong'})
        }
})

router.post(
    '/login',
    [
        check('email', 'wrong email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect login'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message: 'User not found'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'Password is wrong'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        }catch(err){
            res.status(500).json({message: 'Something goes wrong'})
        }
    })

// router.get('/register', async (req, res) => {
//
// })

module.exports = router