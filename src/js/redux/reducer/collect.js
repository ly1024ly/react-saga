import {MYCOLLECT,DELTHEME,DELBOOK,SEARCH_COLLECT} from '../action/collect.js'


const initialState = {
  mycollect:{
    data:null,
    fetching:false
  },
  deltheme:{
    data:null,
    fetching:false
  },
  delbook:{
    data:null,
    fetching:false
  },
  search:{
    data:null,
    fetching:false
  }
}
export const collects = (state = initialState, action={}) => {
  switch (action.type) {
    case MYCOLLECT:
      return{
        ...state,
        mycollect:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case DELTHEME:
      return {
        ...state,
        deltheme:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case DELBOOK:
      return {
        ...state,
        delbook:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case SEARCH_COLLECT:
      return{
        ...state,
        search:{
          data:action.data,
          fetching:action.fetching
        }
      }
    default:
      return state
  }
}