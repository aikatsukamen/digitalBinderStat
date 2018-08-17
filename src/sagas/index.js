import { call, put, fork, take, select } from 'redux-saga/effects';
import { requestList, REQUEST_LIST, successList, failureList, BINDER_ID_SUBMIT, binderIdSave } from '../actions';
import API from '../api';

/**
 * デジタルバインダー読み込み
 */
function* handleGetList() {
  while (true) {
    const action = yield take(REQUEST_LIST);
    const { data, error } = yield call(API.getBinder, action.payload);

    if (data && !error) {
      yield put(successList(data));
    } else {
      yield put(failureList({ error }));
      alert(error.message);
    }
  }
}

/**
 * デジタルバインダーID保存時、初回読み込みとlocalstorage保存
 */
function* handleDigitalBinderInit() {
  while (true) {
    const action = yield take(BINDER_ID_SUBMIT);
    localStorage.setItem('binderId', action.payload);
    yield put(requestList(action.payload));
    yield put(binderIdSave(action.payload));
  }
}

/**
 * ローカルストレージからstateに読み込む
 */
function* handleLoad() {
  const binderId = localStorage.getItem('binderId');
  if (binderId) {
    yield put(binderIdSave(binderId));
    yield put(requestList(binderId));
  }
}

export default function* rootSaga() {
  yield fork(handleGetList);
  yield fork(handleDigitalBinderInit);
  yield call(handleLoad);
}
