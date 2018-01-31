import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducer/reducer.js';

import rootSaga from '../sagas/sagas.js';

const sagaMiddleware = createSagaMiddleware();
console.log("store")
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;
