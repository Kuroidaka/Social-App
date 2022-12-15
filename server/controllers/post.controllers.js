
const User = require('../models/users')
const Post = require('../models/posts')

const postControllers = {
    createPost: async (req, res) => {
        try{

            // const userInfo = User.findById( req.body.userId )

            // console.log(userInfo);
            // res.status(200).json(userInfo)
            const newPost = new Post({
                userId: req.body.userId,
                postText: req.body.postText,
                imgUrl: req.body.imgUrl,
            })  
            const post = await newPost.save()

            await Post.findById(post._id)
            .populate('userId')
            .then(data => {
                return res.status(200).json(data)
            })
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
            await Post.find()
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
           

        } catch (error) {
            console.log(error);
        }
    },
    getById: async(req, res) =>{
        console.log(req.params);
        try {
            await Post.find({userId: req.params.userId})
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })

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
    },
    changeAvatarPost: async(req, res) => {
        try {
            const post = await Post.updateMany(
                { userId: req.query.userId },
                { 
                    name: req.body.name,
                    avatarUrl: req.body.avatarUrl
                }
            )
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
        }
    }   

}

module.exports = postControllers