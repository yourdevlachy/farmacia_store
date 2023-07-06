import { MessageService } from '../../services/messages'
import { UserService } from '../../services/user'
import { GroupService } from '../../services/group'
import { Console } from '../../utils/console'
import { MessageType } from '../../utils/enums'

const MessageUtils = {
  GetMessagesByParticipants: async ({ messages, participants, type }) => {
    try {
      const messagesToReturn = messages.map((m) => {
        const sender = participants.get(m.sender)
        const receiver = participants.get(m.receiver)

        return {
          ...m.toJSON(),
          sender: { id: sender.id, username: sender.username, image: sender.image },
          receiver: {
            id: receiver.id,
            name: type === MessageType.User ? receiver.username : receiver.name,
            image: receiver.image,
          },
        }
      })
      return messagesToReturn
    } catch (error) {
      Console.Error(`MessageUtils - GetMessagesByParticipants => ${error.message}`)
      throw Error(error)
    }
  },
  GetMessages: async ({ messages, sender, receiver, type }) => {
    try {
      const messagesToReturn = messages.map((m) => {
        return {
          ...m.toJSON(),
          sender: { id: sender.id, username: sender.username, image: sender.image },
          receiver: {
            id: receiver.id,
            name: type === MessageType.User ? receiver.username : receiver.name,
            image: receiver.image,
          },
        }
      })
      return messagesToReturn
    } catch (error) {
      Console.Error(`MessageUtils - GetMessages => ${error.message}`)
      throw Error(error)
    }
  },
  GetMessage: async ({ message, sender, receiver, type }) => {
    try {
      const messageToReturn = {
        ...message.toJSON(),
        sender: { id: sender.id, username: sender.username, image: sender.image },
        receiver: {
          id: receiver.id,
          name: type === MessageType.User ? receiver.username : receiver.name,
          image: receiver.image,
        },
      }
      return messageToReturn
    } catch (error) {
      Console.Error(`MessageUtils - GetMessage => ${error.message}`)
      throw Error(error)
    }
  },
}

export const MessagesBLL = {
  GetAllFromTo: async (req, res) => {
    try {
      const { sender, receiver, type } = req.query
      const messages = await MessageService.GetAllFromTo({ sender, receiver, type })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messagesToReturn = await MessageUtils.GetMessages({
        messages,
        sender: userSender,
        receiver: anyReceiver,
        type: type,
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetAllFromTo => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetGroupLastConversation: async (req, res) => {
    try {
      const { groupId } = req.body
      const messages = await MessageService.GetGroupLastConversation({ groupId, max: 100 })

      const messagesToSend = []
      if (messages.length > 0) {
        const group = await GroupService.GetById(messages[0].receiver)
        const usersCollection = new Map()

        for (const message of messages) {
          var sender = usersCollection.get(message.sender)
          if (!sender) {
            sender = await UserService.GetOneById(message.sender)
            usersCollection.set({ key: sender.id, value: sender })
          }

          const store = await MessageUtils.GetMessage({
            message,
            sender: sender,
            receiver: group,
            type: MessageType.Group,
          })
          messagesToSend.push(store)
        }
      }

      return res.status(200).json({ statusCode: 200, response: messagesToSend })
    } catch (error) {
      Console.Error(`MessagesBLL - GetGroupLastConversation => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  GetUserLastConversation: async (req, res) => {
    try {
      const { sender, receiver } = req.body

      const conversation = await MessageService.GetConversation({ sender, receiver })
      if (!conversation) {
        return res.status(200).json({ statusCode: 200, response: [] })
      }

      const messages = await MessageService.GetUserLastConversation({ conversation, max: 100 })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver = await UserService.GetOneById(receiver)

      const participants = new Map()
      participants.set(userSender.id, userSender)
      participants.set(anyReceiver.id, anyReceiver)

      const messagesToReturn = await MessageUtils.GetMessagesByParticipants({
        messages,
        participants,
        type: MessageType.User,
      })

      return res.status(200).json({ statusCode: 200, response: messagesToReturn })
    } catch (error) {
      Console.Error(`MessagesBLL - GetUserLastConversation => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
  Insert: async (req, res) => {
    try {
      const { message, sender, receiver, type, date } = req.body
      const created = await MessageService.Insert({ message, sender, receiver, type, date })

      const userSender = await UserService.GetOneById(sender)
      const anyReceiver =
        type === MessageType.User ? await UserService.GetOneById(receiver) : await GroupService.GetById(receiver)

      const messageToReturn = await MessageUtils.GetMessage({
        message: created,
        sender: userSender,
        receiver: anyReceiver,
        type: type,
      })

      return res.status(200).json({ statusCode: 200, response: messageToReturn })
    } catch (error) {
      Console.Error(`AvatarsBLL - SetAvatar => ${error.message}`)
      return res.status(200).json({ statusCode: 400, message: error.message })
    }
  },
}
