import slugify from "slugify";

const slugfyString = (str: string): string => {
  return slugify(str, {
    remove: /[*+~.()'"!:@]/g,
    replacement: "_"
  })
}

export default slugfyString