import {select, put, call} from 'redux-saga/effects';
import {getIframe} from './selector.js';
import {isCollectAction,likeAction,collectAction,delcollectAction,getpageAction,saveValAction,wechatAction} from '../action/iframe.js';
import {iscollect,like,collect,getpage,wechatapi} from './api.js';
let arr = [];

export function* isCollectAsync (){
  const iframe = yield select(getIframe);
  const fetching = iframe.iscollect.fetching;
  if(fetching) {
    return null
  }
  const param = iframe.iscollect.data;
  const json = yield call(iscollect,param);
  let obj = {
    topicid:param.topicid,
    json:json
  }
  arr.push(obj)
  if(json.result == "success") {
      yield put(isCollectAction(arr,!fetching))
  } else {
    yield put(isCollectAction(json.error,!fetching))
  }
}

export function* likeAsync () {
  const iframe = yield select(getIframe);
  const fetching = iframe.like.fetching;
  if(fetching) {
    return null
  }
  const param = iframe.like.data;
  const json = yield call(like,param);
  if(json.result == "success") {
    console.log(param)
    json.topicid = param.topicid;
    yield put(likeAction(json,!fetching))
  } else {
    yield put(likeAction(json.error,!fetching))
  }
}

export function* collectAsync () {
  const iframe = yield select(getIframe);
  const fetching = iframe.collect.fetching;
  if(fetching){
    return null
  }
  const param = iframe.collect.data;
  const json = yield call(collect,param);
  let arr = iframe.iscollect.data;
  if(json.result == "success") {
    json.topicid = param.topicid;
    yield put(collectAction(json,!fetching))
  } else {
    yield put(collectAction(json.error,!fetching))
  }
}

export function* delcollectAsync (){
  const iframe = yield select(getIframe);
  const fetching = iframe.delcollect.fetching;
  if(fetching){
    return null
  }
  const param = iframe.delcollect.data;
  const json = yield call(collect,param);
  let arr = iframe.iscollect.data;
  if(json.result == "success") {
    json.topicid = param.topicid;
    yield put(delcollectAction(json,!fetching))
  } else {
    yield put(delcollectAction(json.error,!fetching))
  }
}

export function* pageAsync (){
  const iframe = yield select(getIframe);
  const fetching = iframe.page.fetching;
  if(fetching) {
    return null
  }
  const param = iframe.page.data;
  const json = yield call(getpage,param);
  console.log("jjjjjjjjjjjjjjjjjjj");
  console.log(json)
  if(json.result == "success"){
    yield put(getpageAction(json,!fetching))
  } else {
    yield put(getpageAction(json,!fetching))
  }
}

export function* saveAsync(){
  const iframe = yield select(getIframe);
  const fetching = iframe.save.fetching;
  if(fetching) {
    return null
  }
  const param = iframe.save.data;
  yield put(saveValAction(param,!fetching))
}

export function* wechatAsync(){
  const iframe = yield select(getIframe);
  const fetching = iframe.wechat.fetching;
  if(fetching) {
    return null
  }
  const param = iframe.wechat.data;
  console.log(param)
  const json = yield call(wechatapi,param);
   
  yield put(wechatAction(json,!fetching))
  
}