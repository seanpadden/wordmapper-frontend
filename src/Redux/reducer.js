const initialState = {
  currentUser: {},
  word: '',
  etymology: [[]],
  languages: [],
  currentLocation: [{lat: 0, lng: 0}]
}

const reducer = (state = initialState, action ) => {
  console.log('INIT STATE: ', state, 'ACTION ', action)
  switch (action.type) {
    case "ADD_WORD":
      return {...state, word: action.payload}
    case "ADD_COORDINATES": 
      return {...state, currentLocation: action.payload}
    case "ADD_ETYMOLOGY": 
      return {...state, etymology: action.payload}
    case 'CREATE_USER':
      console.log("HERE IS THE CURRENT USER:", action.payload)
      return {...state, currentUser: action.payload}
    default: 
      return state
  }
}

export default reducer