import React from 'react'

class MatchPage extends React.Component {
  
  componentWillMount() {
    this.props.actions.fetchUserData();
  }
  // Fetch user data does not complete in the time that it takes
  // the component to actualy match
  componentDidMount() {
    // this.props.actions.fetchMatchData(this.props.userInfo)
  }
  
  render() {
    const { displayName, email } = this.props.userInfo
    // const { otherName, otherEmail } = this.props.matchInfo
    
    return (
      <div>
        <h3>Display Name: {displayName}</h3>
        <h3>Email: {email}</h3>
      </div>
    );
  }
}
export default MatchPage