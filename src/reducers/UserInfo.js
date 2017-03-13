import { FETCH_USER_DATA } from '../actions';

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
    default:
      return state;
  }
}