const mongoose = require('mongoose')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const Chat = new Schema ({
    room: [
        {   
            chat: [ 
                {
                    userId: {type: String},
                    name: {type: String},
                    img: {type: String},        
                    text: {type: String}
                },{
                    timestamps: true
                }

            ]
        }
    ]
    

},{
    timestamps: true
})



module.exports = mongoose.model('Chat', Chat)