export const validateWord = (word) => {
  let regex = /[0-9]|`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\_|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g
  if (regex.test(word)) { 
    alert("No numbers or special characters!")
    return false
  }
  return true 
}