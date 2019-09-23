const initialState = {
  word: '',
  etymology: [[]],
  languages: [],
  currentLocation: 
  [{
    lat: 0, lng: 0
  }],
  count: 0
}

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case "ADD_WORD":
      return {...state, word: action.payload}
    case "ADD_COORDINATES": 
      return {...state, currentLocation: action.payload}
    default: 
      return state
  }
}

export default reducer