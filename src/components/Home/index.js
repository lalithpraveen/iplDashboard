// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, iplDashboard: []}

  componentDidMount() {
    this.getIplDashboard()
  }

  setIplDashboard = (updatedData, loadingStatus) => {
    this.setState({
      iplDashboard: updatedData,
      isLoading: loadingStatus,
    })
  }

  getIplDashboard = async () => {
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const updateData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))
    this.setIplDashboard(updateData, false)
  }

  renderIplDashboard = () => {
    const {iplDashboard} = this.state

    return (
      <ul className="teams-list">
        {iplDashboard.map(team => (
          <TeamCard teamData={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="teams-list-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="logo-img"
              alt="ipl-logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderIplDashboard()}
        </div>
      </div>
    )
  }
}

export default Home
