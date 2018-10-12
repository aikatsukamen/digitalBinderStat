import { call, put, fork, take, select } from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../api';

/**
 * デジタルバインダー読み込み
 */
function* handleGetList() {
  while (true) {
    const action = yield take(actions.REQUEST_LIST);
    const url = action.payload;

    try {
      // 最新弾のリストを取得
      const { data, error } = yield call(API.getBinder, url);
      if (error) throw error;

      yield put(actions.successList(data.statInfo));
      const versionIds = data.selectableVersion;
      yield put(actions.updateSelectableVersions(versionIds));

      yield put(actions.closeNotify());
      yield put(actions.openNotify({ message: `${data.statInfo.version.name}を取得しました。`, variant: 'success' }));

      // 他の弾のリストも取得
      for (let i = 1; i < versionIds.length; i++) {
        const url = `${action.payload}${versionIds[i].id}`;
        // 最新弾のリストを取得
        const { data, error } = yield call(API.getBinder, url);
        if (error) throw error;
        yield put(actions.successList(data.statInfo));
        yield put(actions.closeNotify());
        yield put(actions.openNotify({ message: `${data.statInfo.version.name}を取得しました。`, variant: 'success' }));
      }
      yield put(actions.closeNotify());
      yield put(actions.openNotify({ message: '全ての弾情報を取得しました。', variant: 'success' }));
    } catch (error) {
      yield put(actions.failureList({ error }));
      yield put(actions.openNotify({ message: error.message, variant: 'error' }));
    }
  }
}

function* handleGetCardInfoList() {
  try {
    // 最新弾のリストを取得
    const { data, error } = yield call(API.getCardInfoList);
    if (error) throw error;
    yield put(actions.updateCardInfoList(data));
  } catch (error) {
    yield put(actions.closeNotify());
    yield put(actions.openNotify({ message: 'カードリスト取得エラー', variant: 'error' }));
  }
}

/**
 * デジタルバインダーID保存時、初回読み込みとlocalstorage保存
 */
function* handleDigitalBinderInit() {
  while (true) {
    const action = yield take(actions.BINDER_ID_SUBMIT);
    localStorage.setItem('binderId', action.payload);
    yield put(actions.requestList(action.payload));
    yield put(actions.binderIdSave(action.payload));
  }
}

/**
 * ローカルストレージからstateに読み込む
 */
function* handleLoad() {
  const binderId = localStorage.getItem('binderId');

  if (binderId) {
    yield put(actions.binderIdSave(binderId));
    yield put(actions.requestList(binderId));
  }
}

export default function* rootSaga() {
  yield fork(handleGetList);
  yield fork(handleDigitalBinderInit);
  yield call(handleLoad);
  yield call(handleGetCardInfoList);
}
