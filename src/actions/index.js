import { createAction } from 'redux-actions';
// リストの取得
export const REQUEST_LIST = 'REQUEST_LIST';
export const SUCCESS_LIST = 'SUCCESS_LIST';
export const FAILURE_LIST = 'FAILURE_LIST';
export const requestList = createAction(REQUEST_LIST);
export const successList = createAction(SUCCESS_LIST);
export const failureList = createAction(FAILURE_LIST);

// ナビゲーションの選択
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const changeView = createAction(CHANGE_VIEW);

// localStorageからデータのセーブとロード
export const LOAD_DATA = 'LOAD_DATA';
export const loadData = createAction(LOAD_DATA);
export const SAVE_DATA = 'SAVE_DATA';
export const saveData = createAction(SAVE_DATA);

// 所持リストの更新
export const UPDATE_HAVE_LIST = 'UPDATE_HAVE_LIST';
export const updateHaveList = createAction(UPDATE_HAVE_LIST);

// バインダーIDの入力
export const BINDER_ID_SUBMIT = 'BINDER_ID_SUBMIT';
export const binderIdSubmit = createAction(BINDER_ID_SUBMIT);

// バインダーID保存
export const BINDER_ID_SAVE = 'BINDER_ID_SAVE';
export const binderIdSave = createAction(BINDER_ID_SAVE);
