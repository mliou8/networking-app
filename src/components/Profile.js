import React from 'react';


class Profile extends React.Component {
  constructor() {
    super()
  }
  
  render() {
    const {displayName, email} = this.props.userInfo.data 
    return (
      <div>
        <div>This is your displayName {displayName} </div>
        <div>This is your email {email} </div>
      </div>
    );
  }
}

export default Profile