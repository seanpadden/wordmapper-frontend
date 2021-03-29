export const validateWord = (word) => {
  let regex = /[0-9]|`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\_|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g
  if (regex.test(word)) { 
    alert("No numbers or special characters!")
    return false
  }
  return true 
}

export const cleanUpEtymologyStr = (etyString) => {
  const regex = /{(.*?)}/g
  if (regex.test(etyString)){
    return etyString.replace(regex, "")
  } 
  else alert("No origin locations found for this word's etymology")
}