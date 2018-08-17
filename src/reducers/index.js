import { combineReducers } from 'redux';
import { REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST, BINDER_ID_SAVE } from '../actions';

const initial = {
  status: 'init',
  error: false,
  list: {},
  binderId: '',
  selectedVersionId: '14'
};

const reducer = (state = initial, action) => {
  switch (action.type) {
  case REQUEST_LIST: {
    return { ...state, status: 'loading', error: false };
  }
  case SUCCESS_LIST: {
    return {
      ...state,
      status: 'done',
      error: false,
      list: { ...state.list, [action.payload.version.id]: action.payload }
    };
  }
  case FAILURE_LIST: {
    return { ...state, status: 'error', error: true };
  }
  case BINDER_ID_SAVE: {
    return { ...state, binderId: action.payload };
  }
  default:
    return state;
  }
};

export default combineReducers({ reducer });
