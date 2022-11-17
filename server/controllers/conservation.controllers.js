const User = require('../models/users')
const Chat = require('../models/chat')
const Conversations = require('../models/conversation')

const conservationController = {
    send: async (req, res) => {
      try {
        const message = new Chat(req.body)
        await message.save()
        return res.status(200).json(message)

      } catch (error) {
        console.log(error);
        res.status(500)
      }
    },
    createConservation: async(req, res) => {
      const {senderId, receiveId} = req.body

      await Conversations.find(
        { 
          '$and': [
            {
              'member': { '$in': { '_id':  senderId}}
            },
            {
              'member': { '$in': { '_id':  receiveId}}
            }
          ]
        }
      )
      .then(async data => {
        if(!data.length){
          const conversation = new Conversations({
            member: [{_id: senderId}, {_id: receiveId}]
          })
          const data = await conversation.save()
            return res.status(200).json(data)
        }
        else{
          return res.status(200).json(data)
        }
      })

    },  
    getMessages: async(req, res) => {
      try {
        const messages = await Chat.find({conversationId: req.params.conversationId})
        res.status(200).json(messages)
      } catch (error) {
        console.log(error);
      }
    },
    getConversation: async(req, res) => {
      try {
        Conversations.find(
          {member:{ '$in':{ _id : req.query.userId }}},
          'member createdAt updatedAt'
        )
        .populate('member._id')
        .then(data => {
          data.forEach(con => {
            con.member = con.member.filter(data => {
              return String(data._id._id) !== req.query.userId
            })
          })
          // console.log('data in promise: ',data);
          return res.status(200).json(data)
          
        } )
      } catch (error) {
        console.log(error);
        return res.status(500).json(error)
      }
      
    },
    test: async (req, res) => {
      const {senderId, receiveId} = req.body

      return res.json({senderId, receiveId})
    }

}

module.exports = conservationController

