import dotenv from "dotenv"
dotenv.config()

import { createServer } from "http"
import express, { Application } from "express"
import { connect } from "mongoose"
import cors from "cors"

import path from "path"

import UserRoutes from "./Routes/UserRoutes"
import GameRoutes from "./Routes/GameRoutes"
import { getItem } from "./controllers/FilesController"

const isDeveloping = process.env.NODE_ENV === "developing"

const app: Application = express()
const serverHttp = createServer(app)

connect(`${process.env.MONGO_URL}`).then(_ => console.log("Conectado ao mongo"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  optionsSuccessStatus: 200,
  origin: "*"
}))

if (isDeveloping) {
  app.use("/api/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "files")))
  app.use("/api/images", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "images")))
  app.use("/api/videos", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "videos")))
  app.use("/api/chat/images", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "chatFiles", "images")))
  app.use("/api/chat/videos", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "chatFiles", "videos")))
  app.use("/api/chat/audios", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "chatFiles", "audios")))
  app.use("/api/chat/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads", "chatFiles", "files")))
} else {
  app.get("/api/uploads/chat/:type/:name", getItem)
  app.get("/api/uploads/:type/:name", getItem)
}

app.use(UserRoutes, GameRoutes)

export { app, serverHttp }
