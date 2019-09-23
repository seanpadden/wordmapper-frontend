export const addWord = (word) => {
  return {
    type: "ADD_WORD",
    payload: word
  }
}

export const addCoordinates = (coordinates) => {
  return {
    type: "ADD_COORDINATES",
    payload: coordinates
  }
}

