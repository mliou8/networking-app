import { connect } from 'react-redux';
import MatchedPairs from '../components/MatchPage'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.user.userData,
    matchInfo: state.user.matchArr || ''
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchedPairs);
