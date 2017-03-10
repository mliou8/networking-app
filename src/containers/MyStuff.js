import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../styles/App.css';

class MyStuff extends React.Component {

  render() {
    return (
      <div>
        {this.props.authenticated ? <p>This is authenticated </p> : <p>this is not authenticated</p>}
      </div>
    );
  }
}
  
  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Actions, dispatch)
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MyStuff);

