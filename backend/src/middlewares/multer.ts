import dotenv from "dotenv"
dotenv.config()
import multer, { Multer } from "multer"
import multerS3 from "multer-s3"
import path from "path"
import crypto from "crypto"
import s3 from "../libs/s3"


interface MulterTemplate {
  dev: {
    paths: string[]
    mimeTypes: string[]
    fileSize?: number
  }
  prod: {
    acl: "public-read" | "private"
    bucketName: string
  }
}

const multerStorage = (paths: string[], bucketName: string, acl: string): multer.StorageEngine => {
  const developing = process.env.NODE_ENV === "developing"
  if (developing) {
    return multer.diskStorage({
      destination(req, file, callback) {
        callback(null, path.resolve(...paths))
      },
      filename(req, file, callback) {
        crypto.randomBytes(16, (err, hash) => {
          if (err) callback(err, "")
          const filename = `${hash.toString("hex")}-${file.originalname}`
          callback(null, filename)
        })
      }
    })
  } else {
    return multerS3({
      s3: s3,
      bucket: bucketName,
      acl,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) callback(err, "")
          const filename = `${hash.toString("hex")}-${file.originalname}`
          callback(null, filename)
        })
      }
    })
  }
}

const multerTemplate = ({ dev, prod }: MulterTemplate): Multer => {
  const { paths, fileSize, mimeTypes } = dev
  const { acl, bucketName } = prod
  return multer({
    dest: path.resolve(__dirname, "..", "..", ...paths),
    storage: multerStorage([__dirname, "..", "..", ...paths], bucketName, acl),
    fileFilter(req, file, callback) {
      if (mimeTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error("Mimetype não permitido: " + file.mimetype));
      }
    }
  })
}

export const userImageUpload = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "images"],
    mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
    fileSize: 1024 * 1024 * 4
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_IMAGES_BUCKET_NAME!
  }
})

export const userChatImageUpload = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "userFiles", "images"],
    mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
    fileSize: 1024 * 1024 * 6
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_CHAT_IMAGES_BUCKET_NAME!
  }
})

export const userChatVideoUpload = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "userFiles", "videos"],
    mimeTypes: ["video/mp4", "video/mov", "video/wmv", "video/avi", "video/webm"],
    fileSize: 1024 * 1024 * 50
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_CHAT_VIDEOS_BUCKET_NAME!
  }
})

export const userChatFileUpload = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "userFiles", "files"],
    mimeTypes: [],
    fileSize: 1024 * 1024 * 10
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_CHAT_FILES_BUCKET_NAME!
  }
})

export const userChatAudioUpload = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "userFiles", "audios"],
    mimeTypes: ["audio/mpeg", "audio/ogg", "audio/wav"],
    fileSize: 1024 * 1024 * 4
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_CHAT_AUDIOS_BUCKET_NAME!
  }
})

export const gameUploadImage = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "images"],
    mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
    fileSize: 1024 * 1024 * 4
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_IMAGES_BUCKET_NAME!
  }
})

export const gameUploadDescriptionImage = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "images"],
    mimeTypes: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    fileSize: 1024 * 1024 * 10
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_IMAGES_BUCKET_NAME!
  }
})

export const gameUploadFile = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "files"],
    mimeTypes: ["application/x-zip-compressed", "application/zip"],
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_FILES_BUCKET_NAME!
  }
})


export const gameUploadVideos = multerTemplate({
  dev: {
    paths: ["tmp", "uploads", "videos"],
    mimeTypes: ["video/mp4", "video/mov", "video/wmv", "video/avi", "video/webm"],
    fileSize: 1024 * 1024 * 100
  },
  prod: {
    acl: "public-read",
    bucketName: process.env.AWS_VIDEOS_BUCKET_NAME!
  }
})

export const gameReadFile = multer({
  fileFilter(req, file, callback) {
    if (file.mimetype === "application/x-zip-compressed" || file.mimetype === "application/zip") {
    } else {
      callback(new Error("Mimetype não permitido"))
    }
    callback(null, true)
  },
})


