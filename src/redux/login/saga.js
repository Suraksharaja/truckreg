import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './action';

export function* login(userInfo) {
  yield takeEvery(actions.LOGIN_SUCCESS, function*() {});
}
export function* logout(userInfo) {
  yield takeEvery(actions.LOGIN_PENDING, function*() {});
}
export function* loginError(userInfo) {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}
export default function* rootSaga() {
  yield all([fork(addContact), fork(logout), fork(loginError)]);
}
