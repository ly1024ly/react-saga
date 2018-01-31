import { takeLatest, takeEvery } from 'redux-saga/effects';
import { searchfiles } from './fileSearch.js';
import {SEARCH_FILE} from '../action/fileSearch.js';


export default function* rootSaga() {
  console.log("sagas")
  yield [
    takeLatest(SEARCH_FILE, searchfiles)
  ]
}