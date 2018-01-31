import {SEARCH_FILE} from '../action/fileSearch.js';

const initialState = {
  fileList:null,
  fetching:false
}

export const files = (state = initialState,action = {}) => {
  console.log("reducer")
  switch (action.type) {
    case SEARCH_FILE:
      return {
        ...state,
        fetching:action.fetching,
        fileList:action
      }
    default:
      return state
  }
}