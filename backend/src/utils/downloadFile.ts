import fs from "fs"
import AdmZip from "adm-zip"
import axios from "axios"

export const downloadFile = async (chunkSize: number, outputPath: string, url: string) => {
  try {
    const response = await axios.head(url)
    const fileSize = Number(response.headers["content-length"])


    const numberChunks = Math.ceil(fileSize / chunkSize)

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true })
    }

    for (let i = 0; i < numberChunks; i++) {
      const startByte = i * chunkSize
      const endByte = Math.min(startByte + chunkSize - 1, fileSize - 1)
      const rangeHeader = `bytes=${startByte}-${endByte}`

      const chunkResponse = await axios.get(url, {
        headers: { Range: rangeHeader },
        responseType: "arraybuffer"
      })

      const chunkPath = `${outputPath}/chunk_${i}.zip`
      fs.writeFileSync(chunkPath, chunkResponse.data)
    }

    const fileZipPath = `${outputPath}/combined.zip`
    const fileZipData = fs.createWriteStream(fileZipPath)

    for (let i = 0; i < numberChunks; i++) {
      const chunkPath = `${outputPath}/chunk_${i}.zip`
      const chunkData = fs.readFileSync(chunkPath)
      fileZipData.write(chunkData)
      fs.unlinkSync(chunkPath)
    }

    fileZipData.end()

    await new Promise((resolve, reject) => {
      fileZipData.on("finish", resolve)
      fileZipData.on("error", reject)
    })

    const zip = new AdmZip(fileZipPath)
    zip.extractAllTo(outputPath, true)

    return true

  } catch (err) {
    return false
  }
}
