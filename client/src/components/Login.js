import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    text-decoration: none;
`

export default class Login extends Component {
    state = {
        users: [],
        newUser: {
            userName:''
        }
    }

    componentDidMount = async () => {
        const response = await axios.get('/api/users')
        this.setState({ users: response.data }) 
    }

    handleChange = (event) => {
        const newUser = {...this.state.newUser}
        newUser[event.target.name] = event.target.value
        this.setState({ newUser })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const response = await axios.post('/api/users', this.state.newUser)
        const users = [...this.state.users]
        users.push(response.data)
        this.setState({users})
    }

  render() {
      const usersList = this.state.users.map((user, i) => {
          return (
          <div key={i}>
            <StyledLink to={`/users/${user._id}`}>
                Name: {user.userName}
            </StyledLink>
          </div>
          )
      })
    return (
      <div>
        <h1>Login Page</h1>
        {usersList}
        <form onSubmit={this.handleSubmit}>
            <input type='text' name='userName' value={this.state.newUser.userName} onChange={this.handleChange}/>
            <input type='submit' value='Create New User'/>
        </form>
      </div>
    )
  }
}
