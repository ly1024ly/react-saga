import { combineReducers } from 'redux';
import {collect} from './collect.js';
import {files} from './fileSearch.js';

const reducer = combineReducers ({
  collect,
  files
});

export default reducer;