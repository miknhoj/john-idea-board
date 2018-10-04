import React, { Component } from 'react'
import axios from 'axios'

export default class IdeaBoard extends Component {
    state = {
        user: {},
        ideas: []
    }

    getUser = async() => {
      const userId = this.props.match.params.userId
      const response = await axios.get(`/api/users/${userId}`)
      this.setState({ 
        user: response.data,
        ideas: response.data.ideas
      })
    }

    componentDidMount = () => [
      this.getUser()
    ]

  render() {
    const ideasList = this.state.ideas.map((idea, i) => {
      return (<div key={i}>
      <div>{idea.title}</div>
      <div>{idea.description}</div>
      </div>
      )
    })

    return (
      <div>
        <h1>{this.state.user.userName}'s Idea Board</h1>
        {ideasList}
        

      </div>
    )
  }
}
