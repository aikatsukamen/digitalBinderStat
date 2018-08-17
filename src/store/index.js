import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
  // const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
