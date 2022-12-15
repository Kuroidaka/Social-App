const mongoose = require('mongoose')
const User = require('./users')

const { Schema } = mongoose

const Conversation = new Schema ({
    member: [
        {   
            _id: {
                type: Schema.Types.ObjectId,
                ref: User
            }
           
        }
    ],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
},{
    collection: 'Conversations'
}
)

module.exports = mongoose.model('Conversation', Conversation)