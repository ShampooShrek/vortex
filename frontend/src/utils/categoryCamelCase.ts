
const catToCamelCase = (category: string): string => {
  if (category.includes(" ")) {
    let cat: string
    const splitCat = category.split(" ")
    const upCase = splitCat.map((word, i) => {
      const firstLetter = i > 0 ? word[0].toUpperCase()
      : word[0]
      const restWord = word.slice(1)
      return firstLetter + restWord
    })
    cat = upCase.join("")
    return cat
  } else {
    return category
  }
}


export default catToCamelCase