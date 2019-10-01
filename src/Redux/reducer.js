const initialState = {
  currentUser: {},
  word: '',
  date: 0,
  shortdef: '',
  etymology: [[]],
  languages: [],
  currentLocation: [{lat: 0, lng: 0}],
  mostCommonWord: ''
}

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case "ADD_WORD":
      return {...state, word: action.payload}
    case "REMOVE_WORD":
      return {...state, word: ""}
    case "ADD_COORDINATES": 
      return {...state, currentLocation: action.payload}
    case "ADD_ETYMOLOGY": 
      return {...state, etymology: action.payload}
    case "ADD_DATE": 
      return {...state, date: action.payload}
    case "ADD_DEFINITION": 
      return {...state, shortdef: action.payload}
    case "ADD_LANGUAGES":
      return {...state, languages: action.payload}
    case 'CREATE_USER':
      return {...state, currentUser: action.payload}
    case 'LOGIN_USER':
      return {...state, currentUser: action.payload}
    case 'LOGOUT_USER':
      return {...state, currentUser: {}}
    case 'ADD_MOST_COMMON_WORD':
      return {...state, mostCommonWord: action.payload}
    default: 
      return state
  }
}

export default reducer