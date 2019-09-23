import { createUser } from './userActions'


// THUNK CREATORS \\

export const userPostFetch = (user) => {
  return dispatch => {
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.token = data.token
        dispatch(createUser(data.user))
      }
    })}
}