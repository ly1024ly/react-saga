import {select, put, call} from 'redux-saga/effects';
import {getCollect} from './selector.js';
import {mycollectAction} from '../action/collect.js';
import {myCollect} from './api.js';


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