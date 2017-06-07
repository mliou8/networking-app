import React from 'react';
import {Helmet} from 'react-helmet';
import {linkedinKey} from '../env_variables/api-keys';

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('public_profile');
provider.setCustomParameters({
  'display': 'popup'
});

class Facebook extends React.Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <script type="text/javascript">
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '1128155697328241',
                xfbml      : true,
                version    : 'v2.9'
              });
              FB.AppEvents.logPageView();
            };
          </script>,
          <script>
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "//connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
          </script>
        </Helmet>
        Welcome to Facebook page
        <button onClick={()=> this.LIlogin()}> Shorten the Process with Facebook</button>
      </div>
    );
  }
}

export default Facebook

