const initialState = {
  currentUser: {},
  wordObj: {},
  languages: [],
  currentLocation: [{lat: 0, lng: 0}],
  mostCommonWord: '',
  userMap: {
    user_id: null,
    word_name: '',
    etymology: '',
    coordinates: {}
  }
}

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case "ADD_WORD":
      return {...state, wordObj: {
          word: action.payload,
          etymology: action.data.et,
          date: action.data.date,
          shortdef: action.data.shortdef
        }
      }
    case "REMOVE_WORD":
      return {...state, wordObj: {}}
    case "ADD_COORDINATES": 
      return {...state, currentLocation: action.payload}
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
    case 'SAVE_MAP':
      return {...state, userMap: action.payload}
    default: 
      return state
  }
}

export default reducer