import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledHeader = styled.div`
  text-align: center;
`
const StyledIdea = styled.div`
  background-color: rgb(255, 255, 136);
  border: 1px solid black;
  /* height: 30vw;
  width: 30vw; */
  min-width: 200px;
  min-height: 200px;
  max-width: 300px;
  max-height: 300px;
  margin: 10px;
  padding: 10px;
`
const StyledTitle = styled.div`
  font-weight: bold;
`
const StyledButton = styled.button`
  background-color: blue;
  color: white;
  font-size: 15px;
  height: 40px;
  font-weight: bold;
`
const StyledIdeaList = styled.div` 
  display: flex;
  font-size: 3vw;
`
const StyledNav = styled.div `
  display: flex;
  font-size: 15px;
  height: 40px;
`
const StyledSort = styled.div`
  font-size: 15px;
  height: 40px;
  font-weight: bold;
`

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
      return (<StyledIdea key={i}>
      <StyledTitle>{idea.title}</StyledTitle>
      <div>{idea.description}</div>
      </StyledIdea>
      )
    })

    return (
      <div>
      <StyledHeader>
        <h1>{this.state.user.userName}'s Idea Board</h1>
      </StyledHeader>
      <StyledNav >
        <StyledButton>New Idea</StyledButton>
        <StyledSort>Sort Ideas By:</StyledSort>
      </StyledNav>
        <StyledIdeaList>{ideasList}</StyledIdeaList>
      </div>
    )
  }
}
