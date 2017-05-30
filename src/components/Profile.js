import React from 'react';

class Profile extends React.Component {
  render() {
    const {displayName, email, photoUrl} = this.props.userInfo
    
    return (
      <div>
        <div>This is your Name {displayName} </div>
        <div>This is your email {email} </div>
      </div>
    );
  }
}

export default Profile