import {IS_COLLECT,LIKE,COLLECT,DELCOLLECT,GET_PAGE} from '../action/iframe.js'

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
      console.log("reducer==============");
      console.log(action)
      console.log()
      return{
        ...state,
        like:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case COLLECT:
      return{
        ...state,
        collect:{
          data:action.data,
          fetching:action.fetching
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
        collect:{
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
        }
      }
    default:
      return state
  }
}