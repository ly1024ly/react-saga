import {select, put, call} from 'redux-saga/effects';
import {getFile} from "./selector.js";
import { findFileAction } from "../action/fileSearch.js";
import { searchFile } from './api.js';

let is = false;
export function* searchfiles() {
   const files = yield select(getFile);
   console.log("sagas" + files.fileList.fetching)
  let fetching = files.fileList.fetching;
  if (fetching) {
    return null;
  }
  is = true;
  const param = files.fileList.data;

  const json = yield call(searchFile , param);
  if(json.result == "success") {
    yield put(findFileAction(json,!fetching))
  } else {
    yield put(findFileAction(json.error));
  }
}