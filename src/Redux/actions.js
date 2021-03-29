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

export const addCoordinates = (coordinates, history) => {
  return {
    type: "ADD_COORDINATES",
    payload: coordinates, history
  }
}

export const getLanguageCoordinates = (originLanguages, history) => {
  let locations = []
  return dispatch => {
    return fetch('https://wordmapper-backend.herokuapp.com/languages')
    .then(resp => resp.json())
    .then(languages => {
      originLanguages.forEach(word => {
        languages.forEach(language => {
          if (word === language.name) {
            locations.push(language.locations[0])
          }
        })
      })
      if (locations.length > 0) {
        dispatch(addCoordinates(locations))
        history.push('/loading')
      }
      else {
        alert("No origin locations found for this word's etymology")
      }
    })
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


export const saveMapFetch = (state) => {
  return dispatch => {
    return fetch("https://wordmapper-backend.herokuapp.com/savemap", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: state.currentUser.id,
        word_name: state.wordObj.word,
        etymology: state.wordObj.etymology[0][1],
        coordinates: state.currentLocation
      })
    })
      .then(resp => resp.json())
      .then(data => {
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