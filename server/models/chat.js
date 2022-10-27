const mongoose = require('mongoose')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const Chat = new Schema ({
    
   

},{
    timestamps: true
})



module.exports = mongoose.model('Chat', Chat)