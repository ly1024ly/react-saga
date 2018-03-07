import {IS_COLLECT,LIKE,COLLECT,DELCOLLECT,GET_PAGE,SAVE_VALUE,WECHAT} from '../action/iframe.js'

const initialState = {
  iscollect:{
    data:null,
    fetching:false
  },
  like:{
    data:null,
    fetching:false
  },
  collect:{
    data:null,
    fetching:false
  },
  delcollect:{
    data:null,
    fetching:false
  },
  page:{
    data:null,
    fetching:false
  },
  save:{
    data:null,
    fetching:false
  },
  wechat:{
    data:null,
    fetching:false
  }
}

export const iframe = (state=initialState,action ={}) => {
  switch (action.type) {
    case IS_COLLECT:
      return {
        ...state,
        iscollect:{
          data:action.data,
          fetching:action.fetching
        },
        collect:{
          data:null,
          fetching:false
        },
        delcollect:{
          data:null,
          fetching:false
        }
      }
    case LIKE:
      return{
        ...state,
        like:{
          data:action.data,
          fetching:action.fetching
        },
        collect:{
          data:null,
          fetching:false
        },
        delcollect:{
          data:null,
          fetching:false
        }
      }
    case COLLECT:
      return{
        ...state,
        collect:{
          data:action.data,
          fetching:action.fetching
        },
        like:{
          data:null,
          fetching:false
        },
        delcollect:{
          data:null,
          fetching:false
        },
      }
    case DELCOLLECT:

      return {
        ...state,
        delcollect:{
          data:action.data,
          fetching:action.fetching
        },
        like:{
          data:null,
          fetching:false
        },
        collect:{
          data:null,
          fetching:false
        }
      }
    case SAVE_VALUE:
      return {
        ...state,
        save:{
          data:action.data,
          fetching:action.fetching
        },
        page:{
          data:null,
          fetching:false
        }
      }
    case GET_PAGE:
      return {
        ...state,
        page:{
          data:action.data,
          fetching:action.fetching
        },
        save:{
          data:null,
          fetching:false
        }
      }
    case WECHAT:
      return {
        ...state,
        wechat:{
          data:action.data,
          fetching:action.fetching
        }
      }
    default:
      return state
  }
}