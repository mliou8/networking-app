import { browserHistory } from 'react-router';
import Firebase from 'firebase';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_FAVORITED_JOBS = 'FETCH_FAVORITED_JOBS';

const config = {
  apiKey: "AIzaSyDO6D8JHajOU4Inp9ZKWgDuaohdm2PTiI4",
  authDomain: "referral-buddy.firebaseapp.com",
  databaseURL: "https://referral-buddy.firebaseio.com",
  storageBucket: "referral-buddy.appspot.com",
  messagingSenderId: "766913423082"
};


Firebase.initializeApp(config);


export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
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

export function favoriteJob({selectedJob}) {
  const userUid = Firebase.auth().currentUser.uid;
  const jobId = selectedJob.id;
  
  return dispatch => Firebase.database().ref(userUid).update({
    [jobId]: selectedJob
  });
}

export function unfavoriteJob({selectedJob}) {
  const userUid = Firebase.auth().currentUser.uid;
  const jobId = selectedJob.id;
  
  return dispatch => Firebase.database().ref(userUid).child(jobId).remove();
}

export function fetchFavoritedJobs() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;
    
    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_JOBS,
        payload: snapshot.val()
      })
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

export function openModal(job) {
  return {
    type: OPEN_MODAL,
    job
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

