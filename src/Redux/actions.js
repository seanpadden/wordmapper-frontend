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


export const saveMapFetch = (obj) => {
  debugger
  return dispatch => {
    return fetch("https://wordmapper-backend.herokuapp.com/savemap", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: obj.currentUser.id,
        word_name: obj.word.word,
        etymology: obj.word.etymology[0][1],
        coordinates: obj.currentLocation
      })
    })
      .then(resp => resp.json())
      .then(data => {
        debugger 
        if (!data.error){
          alert("Saved! Check it out in your profile!")
          dispatch(saveMap(data))
        }
        else alert("You need to be logged in to save a map!")
      })
  }
}

export const saveMap = (word) => {
  return {
    type: "SAVE_MAP",
    payload: word 
  }
}