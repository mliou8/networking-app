import React from 'react'

class MatchPage extends React.Component {
  
  componentWillMount() {
    if(this.props.userInfo) {
      this.props.actions.fetchMatchData(this.props.userInfo)
    }
  }
    
  render() {
    const { displayName, email } = this.props.userInfo
    let match = {}
    if (this.props.matchInfo) {
      match = this.props.matchInfo
    }
    
    return (
      <div>
      Hey Welcome to the app innit, today your first match is here:
        <h1> This is You innit </h1>
        <h3>Display Name: {displayName}</h3>
        <h3>Email: {email}</h3>
          
      These are the Match Innit. Fetch the Data
      <h1> This is them innit</h1> { match.displayName }
      <h3></h3>
      </div>
    );
  }
}
export default MatchPage