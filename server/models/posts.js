const mongoose = require('mongoose')
const User = require('./users')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const Post = new Schema ({
    userId: {type: String, ref: User },
    postText: {type: String},
    imgUrl: {type: String},
    like: { type: Number, default: 0 },
    userLike: { type: Array }
    
},{
    timestamps: true
})


Post.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Post', Post)