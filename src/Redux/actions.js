export const addWord = (word) => {
  return {
    type: "ADD_WORD",
    payload: word
  }
}

export const removeWord = () => {
  return {
    type: "REMOVE_WORD",
    payload: ""
  }
}

export const addLanguages = (languages) => {
  return {
    type: "ADD_LANGUAGES",
    payload: languages
  }
}

export const addCoordinates = (coordinates) => {
  return {
    type: "ADD_COORDINATES",
    payload: coordinates
  }
}

export const addEtymology = (etymology) => {
  return {
    type: "ADD_ETYMOLOGY",
    payload: etymology 
  }
}

export const addDate = (date) => {
  return {
    type: "ADD_DATE",
    payload: date 
  }
}
export const addDefinition = (definition) => {
  return {
    type: "ADD_DEFINITION",
    payload: definition 
  }
}
