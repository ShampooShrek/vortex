interface Avaliation {
  avaliation: "LIKE" | "DESLIKE"
}

export default function calcPercent(avaliations: any[]) {
  if (avaliations.length > 0) {
    const totalGameLikes = avaliations.filter(av => av.avaliation === "LIKE").length
    const totalAvaliations = avaliations.length
    const percentLikes = (totalGameLikes / totalAvaliations) * 100

    return percentLikes
  } else {
    return 0
  }
}

