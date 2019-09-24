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
          history.push('/profile')
        }
      }
      )
  }
}

const createUser = userObj => ({
    type: 'CREATE_USER',
    payload: userObj
})