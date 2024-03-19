import { Server } from "socket.io";
import { serverHttp } from "./http";
import { Group, GroupMessages, Rooms, User, UserMessages } from "./schemas";
import prisma from "./libs/prisma";

interface Users {
  socket_id: string
  userId: string
}

interface Message {
  sender: string
  recipient: string
  type: string
  content: string
  date: Date
}

interface GroupMessage {
  sender: string
  group: number
  type: string
  content: string
  date: Date
}

interface UsersOnline {
  status: string
  id: string
}

const users: Users[] = []
const usersOnline: UsersOnline[] = []

const io = new Server(serverHttp, { cors: {} })

io.on("connection", socket => {
  socket.on("login", (userId: string) => {
    const userExistsInServer = users.find(u => u.userId === userId)
    if (userExistsInServer) userExistsInServer.socket_id = socket.id
    else {
      users.push({ userId, socket_id: socket.id })
      usersOnline.push({ id: userId, status: "online" })
    }
    io.emit("users-online", usersOnline)
  })

  socket.on("join-room", async ({ id1, id2 }) => {
    const idRoom = [id1, id2].sort()
    const roomKey = `${idRoom[0]}-${idRoom[1]}`


    const existsRoom = await Rooms.find({ key: roomKey })

    if (existsRoom.length > 0) socket.join(roomKey)
    else {
      await Rooms.create({ key: roomKey })
      socket.join(roomKey)
    }

    socket.emit("join-room", roomKey)
  })

  socket.on("join-group-room", async ({ groupId }) => {
    const roomKey = groupId.toString()

    const existsRoom = await Rooms.find({ key: roomKey })

    if (existsRoom.length > 0) socket.join(roomKey)
    else {
      await Rooms.create({ key: roomKey })
      socket.join(roomKey)
    }

    socket.emit("join-group-room", roomKey)
  })

  socket.on("send-message", async ({ data: message, roomKey }: { data: Message, roomKey: string }) => {
    const { content, date, recipient, sender, type } = message

    const createMessage = await UserMessages.create({
      content,
      date,
      readed: false,
      recipient,
      sender,
      type
    })

    const sendUser = await User.find({ userId: sender })
    const recipientUser = await User.find({ userId: recipient })

    if (sendUser.length > 0 && recipientUser.length > 0) {
      await User.findByIdAndUpdate(sendUser[0]._id, { $push: { messages: createMessage._id } })
      await User.findByIdAndUpdate(recipientUser[0]._id, { $push: { messages: createMessage._id } })
      io.to(roomKey).emit("message-received", createMessage)
    } else {
      if (sendUser.length === 0) {
        const user = await User.create({ userId: sender })
        await User.findByIdAndUpdate(user._id, { $push: { messages: createMessage._id } })
      }
      if (recipientUser.length === 0) {
        const user = await User.create({ userId: recipient })
        await User.findByIdAndUpdate(user._id, { $push: { messages: createMessage._id } })
      }
      io.to(roomKey).emit("message-received", createMessage)
    }
  })

  socket.on("send-group-message", async (message: GroupMessage) => {
    const { content, date, group, sender, type } = message

    const roomKey = group.toString()

    let createMessage = await GroupMessages.create({
      content, date, group, readed: false, sender, type
    })

    const groupFind = await Group.find({ groupId: group })

    if (groupFind.length > 0) {
      const user = await prisma.user.findUnique({
        where: { id: sender },
        select: { image: { select: { url: true } } }
      })

      const message = {
        content: createMessage.content,
        sender: createMessage.sender,
        date: createMessage.date,
        group: createMessage.group,
        type: createMessage.type,
        image: user!.image ? user?.image.url : ""
      }
      await Group.findByIdAndUpdate(groupFind[0]._id, { $push: { messages: createMessage } })

      io.to(roomKey).emit("group-message-received", message)
    } else {
      const createGrouo = await Group.create({ groupId: group })
      const user = await prisma.user.findUnique({
        where: { id: sender },
        select: { image: { select: { url: true } } }
      })

      await Group.findByIdAndUpdate(createGrouo._id, { $push: { messages: createMessage } })

      const message = {
        content: createMessage.content,
        sender: createMessage.sender,
        date: createMessage.date,
        group: createMessage.group,
        type: createMessage.type,
        image: user!.image ? user?.image.url : ""
      }
      io.to(roomKey).emit("group-message-received", message)
    }
  })

  socket.on("disconnect", () => {

    const disconnectedUserIndex = users.findIndex(u => u.socket_id === socket.id)

    if (disconnectedUserIndex !== -1) {
      const userId = users[disconnectedUserIndex].userId
      users.splice(disconnectedUserIndex, 1)

      const userIdIndex = usersOnline.findIndex(user => user.id === userId)

      if (userIdIndex !== -1) {
        usersOnline.splice(userIdIndex, 1)
      }
    }

    io.emit("users-online", usersOnline)
  })
})

export default io
