import {select,put,call} from 'redux-saga/effects';
import {getMaintenance} from './selector.js';
import {subAction} from '../action/maintenance.js';

export function* subAsync() {
  const main = select(getMaintenance);
  const fetching = main.submit.fetching;
  if(fetching) {
    return null
  }
  const param = main.submit.data;
  
}