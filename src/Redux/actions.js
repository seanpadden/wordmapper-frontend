export const addWord = (word, data) => {
  return {
    type: "ADD_WORD",
    payload: word, data
  }
}

export const removeWord = () => {
  return {
    type: "REMOVE_WORD"
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

export const wordPostFetch = (word) => {
  return dispatch => {
    return fetch("https://wordmapper-backend.herokuapp.com/words", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        word_name: word
      })
    })
      .then(resp => resp.json())
    }
}

export const addMostCommonWord = (word) => {
  return {
    type: "ADD_MOST_COMMON_WORD",
    payload: word 
  }
}


export const saveMapFetch = (word) => {
  return dispatch => {
    return fetch("https://wordmapper-backend.herokuapp.com/savemap", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: word.currentUser.id,
        word_name: word.word,
        etymology: word.etymology[0][1],
        coordinates: word.currentLocation
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error){
          alert("Saved! Check it out in your profile!")
          dispatch(saveMap(data))
        }
        else {
          alert("Sry, but you gotta be logged in to save a map")
        }
      })
  }
}

export const saveMap = (word) => {
  return {
    type: "SAVE_MAP",
    payload: word 
  }
}