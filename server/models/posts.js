const mongoose = require('mongoose')
// const { Schema } = mongoose
const Schema = mongoose.Schema
const Post = new Schema ({
    postText: {type: String},
    postImg: {type: String},
    userId: {type: String},
    name: {type: String},
    avatarUrl: {type: String},
    imgUrl: {type: String},
    like: { type: Number, default: 0 },
    userLike: { type: Array }
    
},{
    timestamps: true
})


Post.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('Post', Post)