const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const config = require('config')

const app = express()

const PORT = config.get('port') || 5000
const MONOGO_URI = config.get('mongoUri')

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


async function start(){
    try{
        await mongoose.connect(MONOGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {console.log(`Server has been started on port ${PORT}...`)})
    }catch(err){
        console.log('Some error: ', err.message)
        process.exit(1)

    }
}

start()

