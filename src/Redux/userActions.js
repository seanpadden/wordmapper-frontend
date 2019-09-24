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
      .then(data => console.log(data)
      //   {
      //   if (data.message) {
      //     alert(data.message)
      //     // Here you should have logic to handle invalid creation of a user.
      //     // This assumes your Rails API will return a JSON object with a key of
      //     // 'message' if there is an error with creating the user, i.e. invalid username
      //   } else {
      //     localStorage.setItem("token", data.jwt)
      //     dispatch(createUser(data.user))
      //     debugger
      //     history.push('/profile')
      //   }
      // }
      )
  }
}

const createUser = userObj => ({
    type: 'CREATE_USER',
    payload: userObj
})