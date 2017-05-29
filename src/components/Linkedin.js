import React from 'react';
import {Helmet} from 'react-helmet';
import {linkedinKey} from '../env_variables/api-keys';

class Linkedin extends React.Component {
  
  constructor() {
    super()
    this.LIlogin = this.LIlogin.bind(this)
    this.getProfileData = this.getProfileData.bind(this)
  }


  LIlogin() {
    window.IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place()
    window.IN.Event.on(window.IN, 'auth', this.getProfileData);
  }
  
  getProfileData(){
    window.IN.API.Profile("me").fields("id,firstName,lastName,email-address,picture-urls::(original),public-profile-url,location:(name)")
    .result((me) => {
      console.log('me ', me.values[0])
      const { emailAddress, firstName, lastName } = me.values[0]
      const password = 'test123'
      const name = firstName + ' ' + lastName
      const userObject = {email: emailAddress, password: password, name: name }
      this.props.actions.signUpUser(userObject)
    });
  };
  
  render() {
    return (
      <div className="container">
        <Helmet>
          <script type="text/javascript" src="//platform.linkedin.com/in.js">
            {
              `api_key: ${linkedinKey}`
            }
          </script>f
        </Helmet>
        Welcome to Linkedin page
        <button onClick={()=> this.LIlogin()}> Sign in with LinkedIn It could Be Mandatory</button>
      </div>
    );
  }
}

export default Linkedin
