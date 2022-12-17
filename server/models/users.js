const mongoose = require('mongoose')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const User = new Schema ({
    username: {type: String , unique: true, require: true},
    password: {type: String, require: true},
    admin:    {type: Boolean, default: false },
    info: {
        name:      {type: String, default: ''},
        liveIn:    {type: String, default: ''},
        comeFrom:  {type: String, default: ''},
        about:     {type: String, default: ''},
        avatarUrl: {type: String, default: 'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'},
        theme:     {type: String, default: '#fafafa'},
    },
    online: {type: Boolean, default: false},
    accessToken: {type: String, default: '' },
    conservation: [ 
        {
           _id : { type: mongoose.Schema.Types.ObjectId},
          
        },{
            timestamps: true
        }
    ]


},{
    timestamps: true
})



module.exports = mongoose.model('User', User)