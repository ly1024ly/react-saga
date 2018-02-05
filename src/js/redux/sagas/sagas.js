import { takeLatest, takeEvery } from 'redux-saga/effects';
import { searchfilesAsync,addfilesAsync,saveTabAsync,comfirmAsync,menuAsync } from './fileSearch.js';
import {SEARCH_FILE,ADD_FILE,SAVE_TAB,COMFIRM_ADD,MENU_URL} from '../action/fileSearch.js';
import {mycollectAsync} from './collect.js';
import {MYCOLLECT} from '../action/collect.js';
import {isCollectAsync,likeAsync,collectAsync} from './iframe.js';
import {IS_COLLECT,LIKE,COLLECT} from '../action/iframe.js';


export default function* rootSaga() {
  console.log("sagas")
  yield [
    takeLatest(SEARCH_FILE, searchfilesAsync),
    takeLatest(ADD_FILE,addfilesAsync),
    takeLatest(SAVE_TAB,saveTabAsync),
    takeLatest(COMFIRM_ADD,comfirmAsync),
    takeLatest(MENU_URL,menuAsync),
    takeLatest(MYCOLLECT,mycollectAsync),
    takeEvery(IS_COLLECT,isCollectAsync),
    takeLatest(LIKE,likeAsync),
    takeLatest(COLLECT,collectAsync)
  ]
}