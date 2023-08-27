const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://sauravurlcul:sauavcalcul123@cluster0.tqpgffi.mongodb.net/urlcal?retryWrites=true&w=majority";

connection = mongoose.connect(DB_URL).then(()=>{
    console.log('Database connected successfully.');
}).catch((err)=>{
    console.log('Connection failed.');
})
