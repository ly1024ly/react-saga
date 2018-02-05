import {MYCOLLECT} from '../action/collect.js'


const initialState = {
  mycollect:{
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
    default:
      return state
  }
}