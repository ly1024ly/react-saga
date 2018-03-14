export const SUBMIT = 'SUBMIT'
export const TIME = 'TIME'
export const WECHAT = 'WECHAT'
export const IMAGE = 'IMAGE'
export const CLEARDATA = 'CLEARDATA'

export const subAction = (param,fetching) => {
  return {
    type:SUBMIT,
    data:param,
    fetching:fetching
  }
}

export const timeAction = (param,fetching) => {
  return {
    type:TIME,
    data:param,
    fetching:fetching
  }
}

export const wechatAction = (param=null,fetching) => {
  return {
    type:WECHAT,
    data:param,
    fetching:fetching
  }
}

export const imageAction = (param,fetching) => {
  return {
    type:IMAGE,
    data:param,
    fetching:fetching
  }
}

export const clearAction = (param,fetching) => {
  return {
    type:CLEARDATA,
    data:param,
    fetching:fetching
  }
}