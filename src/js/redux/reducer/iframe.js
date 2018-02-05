import {IS_COLLECT,LIKE,COLLECT} from '../action/iframe.js'

const initialState = {
  iscollect:{
    data:null,
    fetching:false
  },
  like:{
    data:null,
    fetching:false
  },
  
}

export const iframe = (state=initialState,action ={}) => {
  switch (action.type) {
    case IS_COLLECT:
      return {
        ...state,
        iscollect:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case LIKE:
      return{
        ...state,
        iscollect:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case COLLECT:
      return{
        ...state,
        iscollect:{
          data:action.data,
          fetching:action.fetching
        }
      }
    default:
      return state
  }
}