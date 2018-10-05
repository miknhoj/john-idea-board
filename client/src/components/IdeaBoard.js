import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'


// Styled Components
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
  max-width: 200px;
  max-height: 300px;
  margin: 10px;
  padding: 10px;
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
  flex-wrap: wrap;
`
const StyledNav = styled.div`
  display: flex;
  font-size: 15px;
  height: 40px;
  margin: 10px;
`
const StyledSort = styled.div`
  font-size: 15px;
  height: 40px;
  font-weight: bold;
`

const StyledTitle = styled.input`
  font-weight: bold;
  background-color: transparent;
  border: 0px;
`
const StyledDescription = styled.textarea`
  background-color: transparent;
  border: 0px;
`
const StyledDelete = styled.div`
  font-size: .5em;
`
export default class IdeaBoard extends Component {
  state = {
    user: {},
    ideas: []
  }
// I forget what's going on here - I think we are calling the backend using axios to
// get the userId so that we can reference it on the front end.
  getUser = async () => {
    const userId = this.props.match.params.userId
    const response = await axios.get(`/api/users/${userId}`)
    this.setState({
      user: response.data,
      ideas: response.data.ideas.reverse()
    })
  }

// ??? Component mounts to get the User ID
  componentDidMount = () => [
    this.getUser()
  ]

// This function is run when triggered by the onClick for New Idea is  - makes a call to the backend and
// creates a new user in the database(?)
  handleNew = async () => {
    const userId = this.props.match.params.userId
    const newIdea = await axios.post(`/api/users/${userId}/ideas`)
    console.log(newIdea)
    await this.getUser()
  }

// Delete function - sends server request to delete Idea that is deleted. 
  handleDelete = async (ideaId) => {
    const userId = this.props.match.params.userId
    await axios.delete(`/api/users/${userId}/ideas/${ideaId}`)
    await this.getUser()
  }

// Handles the change that is occuring when user changes the input on title and description
  handleChange = (event, i) => {
    const ideas = [...this.state.ideas]
    ideas[i][event.target.name] = event.target.value
    this.setState({ ideas })
  }

// Handles updating by calling the server and sending the updated data for idea
  updateIdea = async (i) => {
    const userId = this.props.match.params.userId
    const updatedIdea = this.state.ideas[i]
    await axios.put(`/api/users/${userId}/ideas/${updatedIdea._id}`, updatedIdea)

  }

  render() {
  
  // Goes through the array of ideas and puts them into the format below
    const ideasList = this.state.ideas.map((idea, i) => {
      return (<StyledIdea key={i}>
        <StyledDelete onClick={() => this.handleDelete(idea._id)}>
          X
      </StyledDelete>

        <StyledTitle type='text' name='title' value={idea.title}
          onChange={(event) => this.handleChange(event, i)}
          onBlur={() => this.updateIdea(i)} />

        <StyledDescription type='text' name='description' value={idea.description}
          onChange={(event) => this.handleChange(event, i)}
          onBlur={() => this.updateIdea(i)} />
      </StyledIdea>
      )
    })

    return (
    
// Displays the contents of the component on the page
      <div>
        <StyledHeader>
          <h1>{this.state.user.userName}'s Idea Board</h1>
        </StyledHeader>
        <StyledNav>
          <StyledButton onClick={this.handleNew}>New Idea</StyledButton>
          <StyledSort>Sort Ideas By:</StyledSort>
        </StyledNav>
        <StyledIdeaList>{ideasList}</StyledIdeaList>
      </div>
    )
  }
}
