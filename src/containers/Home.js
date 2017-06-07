import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Profile from '../components/Profile'
import '../styles/App.css';

class Home extends React.Component {
  render() {
    
    const userInfo = {
      displayName: 'Michael Liou', 
      photoUrl: '',
      bio: 'Hi! I made this tool so you could connect w/ the people you were supposed to meet.'
    }
    
    return (
      <div>
        This is the Landing Page. Michael's face introduces you to the site.
        <Profile userInfo={userInfo}>Hello</Profile>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.user.userData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
