import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        users: [{
            "_id": "5bb4ee8e3bbfec67a1b1efc1",
            "userName": "elon",
            "password": "spaceisdope",
            "__v": 0
        }]
    }
  render() {
      const usersList = this.state.users.map((user, i) => {
          return <div>Name: {user.userName}</div>
      })
    return (
      <div>
        <h1>Login Page</h1>
        {usersList}
      </div>
    )
  }
}
