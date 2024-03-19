
interface FileType extends Omit<Express.Multer.File, "filename"> {
  filename?: string
  key?: string
}

export default FileType
