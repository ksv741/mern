const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            console.log('No token')
            res.status(401).json({message: 'Not logged user'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
    }catch(err){
        console.log('WTF ?', err.message)
        res.status(401).json({message: 'Not logged user'})
    }
}