import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userId: String,
  userMessages: [{ type: Schema.ObjectId, ref: "FriendMessages" }],
  groupMessages: [{ type: Schema.ObjectId, ref: "GroupMessages" }],
})

const UserMessagesSchema = new Schema({
  sender: { type: String, ref: "User", required: true },
  recipient: { type: String, ref: "User", required: true },
  readed: { type: Boolean, default: false },
  type: { type: String, enum: ["image", "video", "text", "arquive", "audio"], default: "text" },
  content: String,
  date: { type: Date, default: Date.now() }
})

const GroupSchema = new Schema({
  groupId: Number,
  messages: [{ type: Schema.ObjectId, ref: "GroupMesages" }],
  date: { type: Date, default: Date.now() },
});


const GrouMessagesSchema = new Schema({
  sender: { type: String, ref: "User", required: true },
  group: { type: Number, ref: "Group", required: true },
  readed: { type: Boolean, default: false },
  type: String,
  content: String, 
  date: { type: Date, default: Date.now() }
})

const RoomsSchema = new Schema({
  key: String,
  date: { type: Date, default: Date.now() }
})

export const User = model("User", UserSchema)
export const Group = model("Group", GroupSchema)
export const GroupMessages = model("GroupMessages", GrouMessagesSchema)
export const UserMessages = model("FriendMessages", UserMessagesSchema)
export const Rooms = model("Rooms", RoomsSchema)