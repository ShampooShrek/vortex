export const MatrizOfMatriz = <T>(array: T[], size: number): T[][][] => {
  array = array.concat(array, array, array, array, array, array, array)
  const result: T[][][] = []
  for (let i = 0; i < array.length; i += size * 2) {
    const matriz = []
    for (let j = i + size; j <= i + size * 2; j += size) {
      matriz.push(array.slice(j - size, j))
    }
    result.push(matriz)
  }
  return result
}

export const MatrizOfArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = []

  if (array.length < size) {
    return [array]
  }
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}
