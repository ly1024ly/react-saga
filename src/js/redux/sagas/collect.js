import {select, put, call} from 'redux-saga/effects';
import {getCollect} from './selector.js';
import {mycollectAction,delthemeAction,delbookAction,searchAction} from '../action/collect.js';
import {myCollect,collect,comFile,searchCollect} from './api.js';


export function* mycollectAsync() {
  const collect = yield select(getCollect);
  let fetching = collect.mycollect.fetching;
  if(fetching){
    return null
  }
  const param = collect.mycollect.data;
  const json = yield call(myCollect,param);
  
  if(json.result == "success") {
    yield put(mycollectAction(json,!fetching))
  }else{
    yield put(mycollectAction(json.error,!fetching))
  }
}


export function* delthemeAsync() {
  const collects = yield select(getCollect);
  let fetching = collects.deltheme.fetching;
  if(fetching){
    return null
  }
  const param = collects.deltheme.data;
  const json = yield call(collect,param);
  console.log(collects.mycollect.data);
  const mycollect = collects.mycollect.data;
  if(json.result == "success"){
    let arr = [];
    for(var i=0;i<mycollect.message.topics.length;i++){
      if(param.topicid == mycollect.message.topics[i].result.topicid){
        continue 
      } else {
        arr.push(mycollect.message.topics[i])
      }
    }
    mycollect.message.topics = arr;
    yield put(delthemeAction(mycollect,!fetching))
  }else {
    yield put(delthemeAction(json.error,!fetching))
  }
}

export function* delbookAsync(){
  const collects = yield select(getCollect);
  let fetching = collects.delbook.fetching;
  if(fetching){
    return null
  }
  const param = collects.delbook.data;
  const json = yield call(comFile,param);
  if(json.result == "success"){
    const mycollect = collects.mycollect.data;
    let arr = [];
    for(var i=0;i<mycollect.message.books.length;i++){
      if(param.bookid == mycollect.message.books[i].bookid){
        continue 
      } else {
        arr.push(mycollect.message.books[i])
      }
    }
    mycollect.message.books = arr;
    yield put(delbookAction(json,!fetching))
  } else {
    yield put(delbookAction(json.error,!fetching))
  }
}

export function* searchAsync(){
  const collects = yield select(getCollect);
  let fetching = collects.search.fetching;
  if(fetching){
    return null
  }
  const param = collects.search.data;
  const json = yield call(searchCollect,param);
  console.log(json)
  if(json.result == "success"){
    const mycollect = collects.mycollect.data;
    if(mycollect!==null&&mycollect.result&&mycollect.result=="success"){
      mycollect.message = json.message;
    }
    yield put(searchAction(json,!fetching))
  }else {
    yield put(searchAction(json.error,!fetching))
  }
}