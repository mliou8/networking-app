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
function createUser(userId, name, email) {
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
        dispatch(fetchUserData());
      }).then(response => {
        browserHistory.push('/profile-complete');
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
        payload: {id: snapshot.key, data: snapshot.val()}
      })
    });
  }
}

// Fetch their Match And Display It
export function fetchMatchData(currentUser) {
  let suitableUsers = [];
  return function(dispatch) {
      const { data } = currentUser
      const { displayName, email, usersPaired } = data
      Firebase.database().ref('users/').once('value', allUsers => {
          allUsers.forEach((user) => {
            if (usersPaired.indexOf(user.key) === -1) {
              suitableUsers.push({id: user.key, data: user.val()});
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

// Register their opinion about a match
// Update both users w/ the other user in their usersPaired
// Register the one way binding in the database table
// Helper function to check if there's a match
export function updatePair(currentUser, otherUser, action) {
  return function (dispatch) {
    currentUser.data.usersPaired.push(otherUser.id)
    otherUser.data.usersPaired.push(currentUser.id)
    const newPair = {
      hashID: [currentUser.id, otherUser.id],
      action: action,
      match: null
    }
    const newPairKey = Firebase.database().ref().child('pairRecords').push().key;
    let updates = {};
    updates['/pairRecords/' + newPairKey] = newPair;
    updates['/users/' + currentUser.id + '/usersPaired'] = currentUser.data.usersPaired
    Firebase.database().ref().update(updates)
    .then(response => {
      if (action === 'yes') {
        checkMatch(currentUser.id, otherUser.id)
      }
    })
  }
}

//This updates the current user with the object/keys and overrides whats already there.
export function updateUser(data) {
  return function (dispatch) {
    const userUid = Firebase.auth().currentUser.uid
    let updates = {};
    Object.keys(data).forEach((key) => {
      updates[`/users/${userUid}/${key}`] = data[key]
    })
    Firebase.database().ref().update(updates)
  }
}

function createUser(userId, name, email) {
  Firebase.database().ref('users/' + userId).set({
    displayName: name,
    email: email,
    usersPaired: [userId],
  });
}

//Check for Match on both sides
function checkMatch(userOne, userTwo) {
  let updates = {};
  let match = false;
  Firebase.database().ref().child('pairRecords').once('value', allPairs => {
    allPairs.forEach((pair) =>  {
      if(pair.val().hashID[0] === userTwo && pair.val().hashID[1] === userOne && pair.val().action == 'yes') {
        match = true;
        let newPair = pair.val();
        newPair.match = true;
        updates['/pairRecords/' + pair.key ] = newPair
      }
      if(pair.val().hashID[0] === userOne && pair.val().hashID[1] === userTwo && match) {
        let newPair = pair.val();
        newPair.match = true;
        updates['/pairRecords/' + pair.key] = newPair
        updates['/users/' + userOne + '/usersMatched']
        updates['/users/' + userTwo + '/usersMatched']
      }
    })
    Firebase.database().ref().update(updates)
  })
} 

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
  console.log("Authenticating the User")
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

