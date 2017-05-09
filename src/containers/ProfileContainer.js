import { connect } from 'react-redux';
import Profile from '../components/Profile'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

  
function mapStateToProps(state) {
  return {
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
)(Profile);

