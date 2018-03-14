import {SUBMIT,TIME,WECHAT,IMAGE,CLEARDATA} from '../action/maintenance.js'

const initialState = {
  submit:{
    data:null,
    fetching:false
  },
  time:{
    data:null,
    fetching:false
  },
  wechat:{
    data:null,
    fetching:false
  },
  image:{
    data:null,
    fetching:false
  },
  clear:{
    data:null,
    fetching:false
  }
}

export const maintenance = (state = initialState,action = {}) => {
  switch (action.type){
    case SUBMIT:
      return{
        ...state,
        submit:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case TIME:
      return{
        ...state,
        time:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case WECHAT:
      return{
        ...state,
        wechat:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case IMAGE:
      return{
        ...state,
        image:{
          data:action.data,
          fetching:action.fetching
        }
      }
    case CLEARDATA:
      return{
        ...state,
        clear:{
          data:action.data,
          fetching:action.fetching
        }
      }
  }
}