const months = [
  "janeiro", 
  "fevereiro", 
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
]

const DateFormater = (dateString: string): string => {

  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();

  const formatedDate = `${day} de ${months[Number(month) - 1]} de ${year}`;


  return formatedDate;
}

export const DateFormaterBar = (dateString: string): string => {

  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();

  const formatedDate = `${day}/${Number(month) - 1}/${year}`;


  return formatedDate;
}

export default DateFormater