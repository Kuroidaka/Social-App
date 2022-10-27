const User = require('../models/users')
const Chat = require('../models/chat')

const conservationController = {
    createChat: async (req, res) => {
      try {
        const otherUser = await User.findById(req.params.userId)

        const otherName = otherUser.info.name
      

        const user = await User.findById(req.query.id)

        const check = await user.conservation.some(element => element.OtherUserId === req.params.userId)
        console.log(check);
        var userUpdate 
        if(!check) {
          userUpdate = await User.updateOne({_id: req.query.id}, {
              '$addToSet': {conservation: {
                            OtherUserId: req.params.userId,
                            OtherUserName: otherName
                    }}
          }
          )
        }
        console.log(userUpdate);

        return res.status(200).json(userUpdate)
        

       

      } catch (error) {
        console.log(error);
      }
    },

}

module.exports = conservationController

// floating point 
// thiết kế mạch số
