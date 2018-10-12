import { call, put, fork, take, select } from 'redux-saga/effects';
import { requestList, REQUEST_LIST, successList, failureList, BINDER_ID_SUBMIT, binderIdSave, updateSelectableVersions, closeNotify, openNotify } from '../actions';
import API from '../api';

/**
 * デジタルバインダー読み込み
 */
function* handleGetList() {
  while (true) {
    const action = yield take(REQUEST_LIST);
    const url = action.payload;
    let statInfoList = {};

    // 最新弾のリストを取得
    const { data, error } = yield call(API.getBinder, url);

    if (data && !error) {
      statInfoList[data.statInfo.version.id] = data.statInfo;
      const versionIds = data.selectableVersion;
      yield put(closeNotify());
      yield put(openNotify({ message: `${data.statInfo.version.name}を取得しました。`, variant: 'success' }));

      // 他の弾のリストも取得
      for (let i = 1; i < versionIds.length; i++) {
        const url = `${action.payload}${versionIds[i].id}`;
        // 最新弾のリストを取得
        const { data, error } = yield call(API.getBinder, url);
        statInfoList[data.statInfo.version.id] = data.statInfo;
        yield put(closeNotify());
        yield put(openNotify({ message: `${data.statInfo.version.name}を取得しました。`, variant: 'success' }));
      }

      yield put(successList(statInfoList));
      yield put(updateSelectableVersions(versionIds));
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
