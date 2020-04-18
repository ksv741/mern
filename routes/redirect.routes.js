const {Router} = require('express')
const Link = require('../models/link')

const router = Router()

router.get('/:code', async(req, res) => {
    try{
        const link = await Link.findOne({code: req.params.code})
        if(link){
            link.clicks++
            link.save()
            return res.redirect(link.from)
        }
        res.status(404).json('Links is not found')
    }catch(err){
        console.log(err)
    }
})

module.exports = router
