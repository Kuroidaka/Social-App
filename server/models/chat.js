const mongoose = require('mongoose')
const User = require('./users')
const Conversation = require('./conversation')

const Schema = mongoose.Schema
const Chat = new Schema ({
    conversationId: {
        type: String,
        ref: Conversation
    },  
    sender: {
        type: String,
        ref: User,
        require: true
    },
    message: {
        text: {type: String},         
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Chat', Chat)