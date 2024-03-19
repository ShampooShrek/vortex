

export default function avaliationNoteString(percent: number): string {
  if(percent <= 30) {
    return "Extremamente negativas"
  } else if(percent <= 50) {
    return "Negativas"
  } else if(percent <= 60) {
    return "Neutras"
  } else if(percent <= 85) {
    return "Positivas"
  } else if(percent > 85) {
    return "Extremanete positivas"
  }  
  return ""
}