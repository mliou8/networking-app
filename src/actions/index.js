import { browserHistory } from 'react-router';
import Firebase from 'firebase';
import {firebaseKey} from '../env_variables/api-keys.js'
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const FETCH_MATCH_DATA = 'FETCH_MATCH_DATA';

const config = firebaseKey;

Firebase.initializeApp(config);

//Create user in realtime db
function createUser(userId, name, email, imageUrl) {
  Firebase.database().ref('users/' + userId).set({
    displayName: name,
    email: email,
    usersPaired: [userId],
  });
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        createUser(response.uid, credentials.name, credentials.email)
      })
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/matchpage');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}  

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/matchpage');
      })
      .then(response => {
        dispatch(fetchUserData());
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signOutUser() {
  Firebase.auth().signOut();
  browserHistory.push('/');
  
  return {
    type: SIGN_OUT_USER
  }
}

// Find all data for the first user
export function fetchUserData() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid
    Firebase.database().ref('users/' + userUid).once('value', snapshot => {
      dispatch({
        type: FETCH_USER_DATA,
        payload: snapshot.val()
      })
    });
  }
}

// Fetch their Match
export function fetchMatchData(currentUser) {
  let suitableUsers = [];
  return function(dispatch) {
      const { displayName, usersPaired, userId } = currentUser
      Firebase.database().ref('users/').once('value', allUsers => {
          allUsers.forEach((user) => {
            if (usersPaired.indexOf(user.key) == -1) {
              suitableUsers.push(user.val());
            }
          })
      }).then(response => {
        dispatch({
          type: FETCH_MATCH_DATA,
          payload: suitableUsers[0]
        })
      })

  }
}

// // Need to update both Users with the fact that the match is going
// // to be queued up. Update a value?
// export function updateUsersPaired(incValue, currentValue, userId) {
//   const newVal = currentValue.push(incValue)
//   Firebase.database().ref('users/' + userId).set({
//     usersPaired: newVal
//   })
// }

export function verifyAuth() {
  return function (dispatch) {  
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

