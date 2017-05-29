import { connect } from 'react-redux';
import Linkedin from '../components/Linkedin'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
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
)(Linkedin);

