const mongoose = require('mongoose')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const Chat = new Schema ({
    conversationId: {type: String},  
    senderId: {type: String},  
    text: {type: String},         
    
},{
    timestamps: true
})



module.exports = mongoose.model('Chat', Chat)