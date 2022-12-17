const User = require('../models/users')
const Chat = require('../models/chat')
const Conversation = require('../models/conversation')

const conservationController = {
    send: async (req, res) => {
      const {sender, receive, text} = req.body
      try {
        condition ={'$and': [{'member': { '$in': { '_id':  sender}}},{'member': { '$in': { '_id':  receive}}}]}

        const conservation = await Conversation.findOne(condition)
        .then(async data => {
          if(!data){
            const newConversation = new Conversation({
              member: [{_id: sender}, {_id: receive}]
            })
            return newConversation.save()
          }
          else{
            await Conversation.updateOne(condition, {
              '$set': {
                updatedAt: Date.now()
              }
            })
            
            data = await Conversation.findOne(condition)
            return data

          }
        })
          const newMessage = new Chat({
            conversationId: conservation._id,
            sender: sender,
            message: {
                text: text,         
            }
          })
          const response = await newMessage.save()

        
        return res.status(200).json(response)

      } catch (error) {
        console.log(error);
        res.status(500)
      }

    },
    setLastMessage: async (req, res) => {
      const { lastMes, conservationId } = req.body
      await Conversation.updateOne(conservationId, {
        '$set': {
          lastMes: lastMes
        }
      })
      return res.status(200)
    },
    findConversation: async (req, res) => {
      const { sender } = req.query
      const condition = {
        'member': {
          '$in': {
              '_id': sender
          }
        }
      }

      const conversations = await Conversation.find(condition)
      // .limit(10)
      .sort({'updatedAt': 'desc'})
      .populate('member._id')
      .populate('lastMes')
      .then(data => {
        data.forEach(con => {
          con.member = con.member.filter(data => {
            return String(data._id._id) !== req.query.sender
          })
        })
        return res.status(200).json(data)
      } )
      



    },

    getMessages: async(req, res) => {
      const { conversationId } = req.query
      console.log(conversationId);
      try {
        const messages = await Chat.find({conversationId: conversationId})
        .sort({'createdAt': 1})
        // console.log(messages);
        res.status(200).json(messages)

      } catch (error) {
        console.log(error);
      }
    },

}

module.exports = conservationController

