export const userPostFetch = (user, history) => {
  return dispatch => {
    return fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          alert(data.message)
        } 
        else {
          localStorage.setItem("token", data.jwt)
          dispatch(createUser(data.user.username))
          history.push('/input')
        }
      }
      )
  }
}

export const userLoginFetch = (user, history) => {
  return dispatch => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        debugger 
        if (data.errors) {
          alert("Wrong username or password.")
        } 
        else  {
        localStorage.token = data.token
        dispatch(loginUser(data.user.username))
        history.push('/input')
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