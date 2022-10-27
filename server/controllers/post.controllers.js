
const User = require('../models/users')
const Post = require('../models/posts')

const postControllers = {
    createPost: async (req, res) => {
        try{
            const newPost = await new Post({
                postText: req.body.postText,
                userId: req.params.userId,
                name: req.body.name,
                avatarUrl: req.body.avatarUrl,
                imgUrl: req.body.imgUrl
            })  
            const post = await newPost.save()
            res.status(200).json(post)
        }
        catch(error){
            res.status(500).json(error)
        }
    },
    deletePost: async(req, res) => {
        try{
            await Post.findByIdAndDelete(req.params.postId)
            res.status(200).json('delete successful')

        }
        catch(error){
            res.status(500).json(error)
        }
    },
    getAllPost: async(req, res) =>{
        try {
            const newPosts = await Post.find()
            res.status(200).json(newPosts)

        } catch (error) {
            console.log(error);
        }
    },
    getByUser: async(req, res) =>{
        try {
            const newPosts = await Post.find({userId: req.params.userId})
            res.status(200).json(newPosts)

        } catch (error) {
            console.log(error);
        }
    },
    like: async(req, res) =>{
        console.log(req.query.userId);
        try {
            const post = await Post.updateOne( { _id : req.params.postId },
                    {
                        '$set':{'like': req.query.count},
                        '$addToSet':{'userLike': req.query.userId } 
                    } 
                )
            res.status(200).json(post)
        } catch (error) {
            console.log(error);
        }        
    }

}

module.exports = postControllers