import { combineReducers } from 'redux';
import {collects} from './collect.js';
import {files} from './fileSearch.js';
import {iframe} from './iframe.js';

const reducer = combineReducers ({
  collects,
  files,
  iframe
});

export default reducer;