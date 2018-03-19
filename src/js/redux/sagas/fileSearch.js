import {select, put, call} from 'redux-saga/effects';
import {getFile} from "./selector.js";
import { findFileAction,addFileAction,saveTabAction,comfirmFileAction,menuurlAction,filterAction,brandAction,saveAction,bookAction } from "../action/fileSearch.js";
import { searchFile,addFile,comFile,filterapi,brandapi,allbooks } from './api.js';

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
    yield put(findFileAction(json,!fetching));
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
    yield put(addFileAction(json,!fetching))
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
  console.log(param)
  const json = yield call(comFile, param);
  if(json.result == "success") {
    yield put(comfirmFileAction(json,!fetching))
  } else {
    yield put(comfirmFileAction(json,!fetching))
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

export function* filterAsync() {
  const files = yield select(getFile);
  let fetching = files.filter.fetching;
  if(fetching){
    return null
  }
  let param = files.filter.data;
  const json = yield call(filterapi,param);
  console.log(json);
  if(json.result == "success"){
    let myfile = files.fileList.data;
    files.fileList.data = {
      result:"success",
      message:json.message
    }
    yield put(filterAction(json,!fetching))
  }else {
    yield put(filterAction(json,!fetching))
  }
}

export function* brandAsync(){
  const files = yield select(getFile);
  let fetching = files.brand.fetching;
  if(fetching) {
    return null
  }
  let param = files.brand.data;
  const json = yield call(brandapi,param);
  if(json.result == "success"){
    yield put(brandAction(json,!fetching))
  }else{
    yield put(brandAction(json,!fetching))
  }
}

export function* iniframeAsync(){
  const files = yield select(getFile);
  let fetching = files.save.fetching;
  if(fetching){
    return null
  }
  let json = files.save.data;
  yield put(saveAction(json,!fetching))
}

export function* bookAsync() {
  const files = yield select(getFile);
  let fetching = files.books.fetching;
  if(fetching){
    return null
  }
  let param = files.books.data;
  let json = yield call(allbooks,param);
  if(json.result == "success"){
    yield put(bookAction(json,!fetching))
  } else {
    yield put(bookAction(json,!fetching))
  }

}