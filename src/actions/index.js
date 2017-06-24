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
        dispatch(fetchUserData());
      })
      .then(response => {
        browserHistory.push('/matchpage');
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
              if (checkMatch(currentUser.data.tags, user.data.tags )) {
                suitableUsers.push({id: user.key, data: user.val()});                  
              }
            }
          })
      }).then(response => {
        updatePair(currentUser, suitableUsers[0])
      })
  }
}
// Friendly: 
// true
//  FullstackAlumni: 
// true
//  GivingBack: 
// false
//  LookingForWork: 
// false
//  Networking: 
// false
//  DiversityforAll:
//  SupportWomeninTech: 
// false

// Check if tags are compatible
function checkMatch (objOne, objTwo) {
  let match = true
  // Right now always return true LOL
  return match
}

// Register their opinion about a match
// Update both users w/ the other user in their usersPaired
// Register the one way binding in the database table
// Helper function to check if there's a match
function updatePair(currentUser, otherUser) {
  return function (dispatch) {
    currentUser.data.usersPaired.push(otherUser.id)
    otherUser.data.usersPaired.push(currentUser.id)
    // const newPair = {
    //   hashID: [currentUser.id, otherUser.id],
    //   action: action,
    //   match: null
    // }
    // const newPairKey = Firebase.database().ref().child('pairRecords').push().key;
    let updates = {};
    // updates['/pairRecords/' + newPairKey] = newPair;
    updates['/users/' + currentUser.id + '/usersPaired'] = currentUser.data.usersPaired
    updates['/users/' + otherUser.id + '/usersPaired'] = otherUser.data.usersPaired
    updates['/users/' + currentUser.id + '/currentMatch'] = otherUser.data
    updates['/users/' + otherUser.id + '/currenMatch'] = currentUser.data
    Firebase.database().ref().update(updates)
    .then(response => {
      console.log("Users have been shown to each other")
      })
  }
}

//This updates the current user with the object/keys and overrides whats already there.
export function completeUser(data) {
  return function (dispatch) {
    const userUid = Firebase.auth().currentUser.uid
    let updates = {};
    Object.keys(data).forEach((key) => {
      updates[`/users/${userUid}/${key}`] = data[key]
    })
    Firebase.database().ref().update(updates)
    .then(response => {
      dispatch(fetchUserData());
      browserHistory.push('/matchpage');
    })
  }
}

//Same function as completeUser except without the reroute :-/
export function updateUser(data) {
  return function (dispatch) {
    const userUid = Firebase.auth().currentUser.uid
    let updates = {};
    Object.keys(data).forEach((key) => {
      updates[`/users/${userUid}/${key}`] = data[key]
    })
    Firebase.database().ref().update(updates)
    .then(response => {
      dispatch(fetchUserData());
    })
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
// function checkMatch(userOne, userTwo) {
//   let updates = {};
//   let match = false;
//   Firebase.database().ref().child('pairRecords').once('value', allPairs => {
//     allPairs.forEach((pair) =>  {
//       if(pair.val().hashID[0] === userTwo && pair.val().hashID[1] === userOne && pair.val().action == 'yes') {
//         match = true;
//         let newPair = pair.val();
//         newPair.match = true;
//         updates['/pairRecords/' + pair.key ] = newPair
//       }
//       if(pair.val().hashID[0] === userOne && pair.val().hashID[1] === userTwo && match) {
//         let newPair = pair.val();
//         newPair.match = true;
//         updates['/pairRecords/' + pair.key] = newPair
//         updates['/users/' + userOne + '/usersMatched']
//         updates['/users/' + userTwo + '/usersMatched']
//       }
//     })
//     Firebase.database().ref().update(updates)
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
