import {select, put, call} from 'redux-saga/effects';
import {getIframe} from './selector.js';
import {isCollectAction,likeAction,collectAction} from '../action/iframe.js';
import {iscollect,like,collect} from './api.js';
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
    for(var i=0;i<arr.length;i++){
      if(param.topicid == arr[i].topicid){
        arr[i].json.luad = true;
        arr[i].json.luadnum = arr[i].json.luadnum + 1;
      }
    }
    yield put(likeAction(arr,!fetching))
  } else {
    yield put(likeAction(json.error,!fetching))
  }
}

export function* collectAsync () {
  const iframe = yield select(getIframe);
  const fetching = iframe.iscollect.fetching;
  if(fetching){
    return null
  }
  const param = iframe.iscollect.data;
  const json = yield call(collect,param);
  let ar = iframe.iscollect.data;
  if(json.result == "success") {
    for(var i=0;i<ar.length;i++){
      if(param.topicid == ar[i].topicid){
        ar[i].json.luad = true;
      }
    }
    yield put(collectAction(ar,!fetching))
  } else {
    yield put(collectAction(json.error,!fetching))
  }
}