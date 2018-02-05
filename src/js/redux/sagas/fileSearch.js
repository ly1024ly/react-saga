import {select, put, call} from 'redux-saga/effects';
import {getFile} from "./selector.js";
import { findFileAction,addFileAction,saveTabAction,comfirmFileAction,menuurlAction } from "../action/fileSearch.js";
import { searchFile,addFile,comFile } from './api.js';

export function* searchfilesAsync() {
  const files = yield select(getFile);
  let fetching = files.fileList.fetching;
  if (fetching) {
    return null;
  }
  const param = files.fileList.data;
  const json = yield call(searchFile , param);
  if(json.result == "success") {
    yield put(findFileAction(json,!fetching))
  } else {
    yield put(findFileAction(json.error,!fetching));
  }
}

export function* addfilesAsync() {
  const files = yield select(getFile)
  console.log(files)
  let fetching = files.addfile.fetching;
  if(fetching) {
    return null;
  }
  const param = files.addfile.data;
  const json = yield call(addFile , param);
  console.log(json)
  if(json.result == "success") {
    yield put(addFileAction(json,!fetching))
  } else {
    yield put(addFileAction(json.error,!fetching))
  }
}

export function* saveTabAsync() {
  console.log("sagas")
  const files = yield select(getFile)
  let fetching = files.savetab.data;
  if(fetching) {
    return null;
  }
  const param = files.savetab.data;
  yield put(saveTabAction(param,!fetching))
}

export function* comfirmAsync() {
  const files = yield select(getFile)
  let fetching = files.comfirmfile.fetching;
  if(fetching){
    return null;
  }
  const param = files.comfirmfile.data;
  const json = yield call(comFile, param);
  if(json.result == "success") {
    yield put(comfirmFileAction(json,!fetching))
  } else {
    yield put(comfirmFileAction(json.error,!fetching))
  }
}

export function* menuAsync() {
  const files = yield select(getFile)
  let fetching = files.menulist.fetching;
  if(fetching){
    return null
  }
  const param = files.menulist.data;
  yield put(menuurlAction(param,!fetching))
}