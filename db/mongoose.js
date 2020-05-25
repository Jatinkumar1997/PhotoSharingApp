const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://Jatin19:jatin1903@cluster0-sfqlo.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection
db.once('open',()=>{
    console.log('Connected to DB')
})