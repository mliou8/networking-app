import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../styles/App.css';

class MyStuff extends React.Component {
  
  componentDidMount() {
    this.props.actions.fetchUserData();
    this.props.actions.fetchMatchData();
  }
  
  render() {
    const {displayName, email} = this.props.userInfo
    return (
      <div>
        <h3>Display Name: {displayName}</h3>
        <h3>Email: {email}</h3>
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

  export default connect(mapStateToProps, mapDispatchToProps)(MyStuff);

