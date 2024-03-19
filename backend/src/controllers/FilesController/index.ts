
import { Request, Response } from "express"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import client from "../../libs/s3"

export const getItem = async (req: Request, res: Response) => {
  const key = req.params.name
  const type = req.params.type
  const isChatFiles = req.url.includes("chat")


  let bucket = ""
  if (type === "images") bucket = isChatFiles
    ? process.env.AWS_CHAT_IMAGES_BUCKET_NAME!
    : process.env.AWS_IMAGES_BUCKET_NAME!

  else if (type === "videos") bucket = isChatFiles
    ? process.env.AWS_CHAT_VIDEOS_BUCKET_NAME!
    : process.env.AWS_VIDEOS_BUCKET_NAME!

  else if (type === "files") bucket = isChatFiles
    ? process.env.AWS_CHAT_FILES_BUCKET_NAME!
    : process.env.AWS_FILES_BUCKET_NAME!
  else if (type === "audios" && isChatFiles) bucket = process.env.AWS_CHAT_AUDIOS_BUCKET_NAME!
  else return res.status(404).send()

  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    })
    const resp = await client.send(command)
    const bytes = await resp.Body!.transformToByteArray()
    const contentType = resp.ContentType

    if (!contentType) return res.status(404).send()

    res.set("Content-Type", contentType)

    if (type !== "files") {
      res.send(Buffer.from(bytes))
    } else {
      res.set('Content-Disposition', `attachment; filename="${key}"`);
      res.send(Buffer.from(bytes))
    }
  } catch (err) {
    return res.status(404).send(err)
  }
}
