import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../actions';

class Header extends React.Component {
  handleSignOut() {
    this.props.signOutUser();
  }
  renderAuthLinks() {
    if (this.props.authenticated){
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/profile"> Profile </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/matchpage"> Match Page </Link>
        </li>,
        <li className="nav-item" key={3}>
          <a className="nav-link" href="#" onClick={() => this.handleSignOut()}>Sign Out</a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/linkedin">Linkedin</Link>
        </li>
      ]
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">ReferralBuddy</Link>
            </div>
             <ul className="nav navbar-nav navbar-right">
               { this.renderAuthLinks() }
             </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, Actions)(Header);
