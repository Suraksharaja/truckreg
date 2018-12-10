import { Map } from 'immutable';
import actions from './action';

const initState = new Map({
payload: [],
isLoginPending: [],
loginError: '',
viewError: ''

});

export default function loginReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.LOGIN_PENDING: {
     
      return state     
        .set('isLoginPending', action.isLoginPending);
    }
    case actions.LOGIN_SUCCESS: {
     
      return state
        .set('userInfo', action.payload)
    }
    case actions.USER_LOGGEDIN: {
      return state
        .set('userInfo', action.payload)
    }
    case actions.LOGIN_ERROR: {
      return state.set('loginError', action.loginError);
    }
    case actions.VIEW_ERROR: {
        return state.set('ViewError', action.viewError);
      }
    default:
      return state;
  }
}
