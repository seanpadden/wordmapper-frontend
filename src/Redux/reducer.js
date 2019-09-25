const initialState = {
  currentUser: "",
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
    case "REMOVE_WORD":
      return {...state, word: ""}
    case "ADD_COORDINATES": 
      return {...state, currentLocation: action.payload}
    case "ADD_ETYMOLOGY": 
      return {...state, etymology: action.payload}
    case "ADD_LANGUAGES":
      return {...state, languages: action.payload}
    case 'CREATE_USER':
      return {...state, currentUser: action.payload}
    case 'LOGIN_USER':
      return {...state, currentUser: action.payload}
    case 'LOGOUT_USER':
      return {...state, currentUser: ""}
    default: 
      return state
  }
}

export default reducer