import {SEARCH_FILE,ADD_FILE,SAVE_TAB,COMFIRM_ADD,MENU_URL} from '../action/fileSearch.js';

const initialState = {
  fileList:{
    data:null,
    fetching:false
  },
  fetching:false,
  addfile:{
    data:null,
    fetching:false
  },
  sabetab:{
    data:null,
    fetching:false
  },
  comfirmfile:{
    data:null,
    fetching:false
  },
  menulist:{
    data:null,
    fetching:false
  }
}

export const files = (state = initialState,action = {}) => {
  console.log("reducer")
  switch (action.type) {
    case SEARCH_FILE:
      return {
        ...state,
        fileList:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case ADD_FILE:
      return {
        ...state,
        addfile:{
          fetching:action.fetching,
          data:action.data
        }
      }
    case SAVE_TAB:
      return {
          ...state,
        savetab:{
          fetching:action.fetching,
          data:action.data
        }
      }
    case COMFIRM_ADD:
        return {
          ...state,
          comfirmfile:{
            fetching:action.fetching,
            data:action.data
          }
        }
    case MENU_URL:
      return {
        ...state,
        menulist:{
          fetching:action.fetching,
          data:action.data
        }
      }
    default:
      return state
  }
}