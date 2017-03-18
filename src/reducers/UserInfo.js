import { FETCH_USER_DATA } from '../actions';
import { FETCH_MATCH_DATA } from '../actions';

const initialState =  {
  userData: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state, 
        userData: action.payload
      };
      
    case FETCH_MATCH_DATA:    
      return {
        ...state,
        match: action.payload.match
      }
      
    default:
      return state;
  }
}