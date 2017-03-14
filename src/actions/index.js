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
    usersPaired: [],
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
        browserHistory.push('/myStuff');
      })
      .catch(error => {
        console.log("this is the error isn't it", error);
        dispatch(authError(error));
      });
  }
}  

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/myStuff');
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

// Find all user data for first user.
// Find all users in an array
// Run a function on all those users, that if they are not the first user,
// Then randomly select one and return it as the "match"

export function fetchMatchData() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid
    Firebase.database().ref('users/' + userUid).once('value', snapshot => {
      const { displayName } = snapshot.val()
      Firebase.database().ref('users/').once('value', snapshotSecond => {
        console.log("snapshotSecond ", snapshotSecond)
        snapshotSecond.forEach((childSnapshot) => {
          if (userUid !== childSnapshot.key) {
            console.log("potential match ", childSnapshot)
            // if (usersPaired.indexOf(childSnapshot.key !== -1)) {
              // matchPairs.push(childSnapshot)
            // }
          }
        })
      })
    })
  }
}

export function verifyAuth() {
  return function (dispatch) {  
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user authenticated")
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

