import { combineReducers } from 'redux';
import * as Actions from '../actions';

const initial = {
  status: 'init',
  error: false,
  list: {},
  binderId: '',
  selectedVersionId: '',
  versionIds: [],
  cardInfo: [],
  notify: {
    isOpen: false,
    variant: 'info',
    message: ''
  }
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    // 通信中
    case Actions.REQUEST_LIST: {
      return { ...state, status: 'loading', error: false };
    }
    // 取得結果を反映
    case Actions.SUCCESS_LIST: {
      return {
        ...state,
        status: 'done',
        error: false,
        list: { ...state.list, [action.payload.version.id]: action.payload }
      };
    }
    // 通信失敗
    case Actions.FAILURE_LIST: {
      return { ...state, status: 'error', error: true };
    }
    // バインダーのIDを反映
    case Actions.BINDER_ID_SAVE: {
      return { ...state, binderId: action.payload };
    }
    // 選択可能弾を更新
    case Actions.UPDATE_SELECTABLE_VERSIONS: {
      return { ...state, versionIds: action.payload, selectedVersionId: action.payload[0].id };
    }
    // 選択弾を変更
    case Actions.SELECT_VERSION: {
      return { ...state, selectedVersionId: action.payload };
    }
    case Actions.OPEN_NOTIFY: {
      return { ...state, notify: { ...action.payload, isOpen: true } };
    }
    case Actions.CLOSE_NOTIFY: {
      return { ...state, notify: { isOpen: false, message: '', variant: 'info' } };
    }
    case Actions.UPDATE_CARD_INFO_LIST: {
      return { ...state, cardInfo: action.payload };
    }
    default:
      return state;
  }
};

export default combineReducers({ reducer });
