export const userPostFetch = (user, history) => {
  return dispatch => {
    return fetch("https://wordmapper-backend.herokuapp.com/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.message) {
          localStorage.setItem("token", data.jwt)
          dispatch(createUser(data.user))
          history.push('/input')
        } 
        else {
          alert("Username already exists. Please try again")
        }
      }
      )
  }
}

export const userLoginFetch = (user, history) => {
  return dispatch => {
    fetch('https://wordmapper-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data => {
      if (!data.message) {
        localStorage.token = data.jwt
        dispatch(loginUser(data.user))
        history.push('/input')
      }
      else  {
        alert("Wrong username or password!")
        localStorage.clear()
      }
    })
  } 
}

const createUser = (userObj) => ({
  type: 'CREATE_USER',
  payload: userObj
})

const loginUser = (userObj) => ({
  type: 'LOGIN_USER',
  payload: userObj
})

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
    payload: ""
  }
}