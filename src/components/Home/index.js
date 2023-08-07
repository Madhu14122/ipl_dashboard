import React from 'react'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()
    console.log(fetchedData);
    const updatedData = fetchedData.teams.map(eachData => ({
      name: eachData.name,
      imageUrl: eachData.team_image_url,
      id: eachData.id,
    }))

    this.setState({teamsData: updatedData, isLoading: false})
  }

  

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(team => (
          <TeamCard teamData={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {

    
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              className="ipl-logo"
              alt="ipl logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
