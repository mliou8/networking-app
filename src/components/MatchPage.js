import React from 'react'

class MatchPage extends React.Component {
  constructor() {
    super()
    this.state = {
      submitVote: false
    }
    this.updatePair = this.updatePair.bind(this)
  }
  
  componentWillMount() {
    if(this.props.userInfo) {
      this.props.actions.fetchMatchData(this.props.userInfo)
    }
  }
  
  updatePair(currentUser, otherUser, action) {
    this.setState({submitVote: true})
    this.props.actions.updatePair(currentUser, otherUser, action)
  }
  
  render() {
    const { displayName, email } = this.props.userInfo.data
    const { data, id } = this.props.matchInfo
    
    return (
      <div>
      Hey Welcome to the app innit, today your first match is here:
        <h1> This is You innit </h1>
        <h3>Display Name: {displayName}</h3>
        <h3>Email: {email}</h3>
      These are the Match Innit. Fetch the Data
      <h1> This is them innit </h1>
        <h3>Display Name: {data.displayName}</h3>
        <h3>Email: {data.email}</h3>
        {!this.state.submitVote ? 
          <button onClick={() => this.updatePair(this.props.userInfo, this.props.matchInfo, 'yes')}>This is the action that you are seeking.</button>
          : <div>Thanks for letting us know! Check back in tomorrow</div>
        } 
      </div>
    );
  }
}
export default MatchPage