import React from 'react'

class MatchPage extends React.Component {
  constructor() {
    super()
    this.state = {
      submitVote: false
    }
  }
  
  componentWillMount() {
    if(this.props.userInfo) {
    }
  }
  
  updatePair(currentUser, otherUser, action) {
    this.setState({submitVote: true})
    this.props.actions.updatePair(currentUser, otherUser, action)
    this.props.actions.fetchMatchData(this.props.userInfo)
  }
  
  render() {
    const { displayName, email } = this.props.userInfo.data
    let matchData
    const { data } = this.props.matchInfo
    matchData = data || ''
    return (
      <div>
      Hey Welcome to the app innit, today your first match is here:
        <h1> This is You innit </h1>
        <h3>Display Name: {displayName}</h3>
        <h3>Email: {email}</h3>
      These are the Match Innit. Fetch the Data
      <h1> This is them innit </h1>
        <h3>Display Name: {matchData.displayName || 'N/A' } </h3>
        <h3>Email: {matchData.email || 'N/A' } </h3>
          <div>
            <button onClick={() => this.props.actions.fetchMatchData(this.props.userInfo)}>Lets fetch the match</button>
          </div>
      </div>
    );
  }
}
export default MatchPage