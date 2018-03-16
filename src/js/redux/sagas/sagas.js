import { takeLatest, takeEvery } from 'redux-saga/effects';
import {SEARCH_FILE,ADD_FILE,SAVE_TAB,COMFIRM_ADD,MENU_URL,FILTER,BRAND,SAVE_VAL,ALL_BOOK} from '../action/fileSearch.js';
import {IS_COLLECT,LIKE,COLLECT,DELCOLLECT,GET_PAGE,SAVE_VALUE,WECHAT} from '../action/iframe.js';
import {MYCOLLECT,DELTHEME,DELBOOK,SEARCH_COLLECT} from '../action/collect.js';
//import {SUBMIT} from '../action/maintenance.js';

import {mycollectAsync,delthemeAsync,delbookAsync,searchAsync} from './collect.js';
import {isCollectAsync,likeAsync,collectAsync,delcollectAsync,pageAsync,saveAsync,wechatAsync} from './iframe.js';
import { searchfilesAsync,addfilesAsync,saveTabAsync,comfirmAsync,menuAsync,filterAsync,brandAsync,iniframeAsync,bookAsync } from './fileSearch.js';
//import {subAsync} from './maintenance.js'

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
    takeEvery(COLLECT,collectAsync),
    takeEvery(DELCOLLECT,delcollectAsync),
    takeLatest(GET_PAGE,pageAsync),
    takeEvery(SAVE_VALUE,saveAsync),
    takeLatest(WECHAT,wechatAsync),
    takeEvery(DELTHEME,delthemeAsync),
    takeEvery(DELBOOK,delbookAsync),
    takeEvery(SEARCH_COLLECT,searchAsync),
    takeEvery(FILTER,filterAsync),
    takeEvery(BRAND,brandAsync),
    takeLatest(SAVE_VAL,iniframeAsync),
    takeLatest(ALL_BOOK,bookAsync)
  ]
}