export const IS_COLLECT = 'IS_COLLECT'
export const LIKE = 'LIKE'
export const COLLECT = 'COLLECT'
export const DELCOLLECT = 'DELCOLLECT'
export const GET_PAGE = 'GET_PAGE'
export const SAVE_VALUE = 'SAVE_VALUE'
export const WECHAT = 'WECHAT'

export const isCollectAction = (param,fetching) => {
  return {
    type:IS_COLLECT,
    data:param,
    fetching:fetching
  }
}

export const likeAction = (param,fetching) => {
  return {
    type:LIKE,
    data:param,
    fetching:fetching
  }
}

export const collectAction = (param,fetching) => {
  console.log("action===")
  return {
    type:COLLECT,
    data:param,
    fetching:fetching
  }
}

export const delcollectAction = (param,fetching) => {
  return {
    type:DELCOLLECT,
    data:param,
    fetching:fetching
  }
}

export const getpageAction = (param,fetching) => {
  return {
    type:GET_PAGE,
    data:param,
    fetching:fetching
  }
}

export const saveValAction = (param,fetching) => {
  return {
    type:SAVE_VALUE,
    data:param,
    fetching:fetching
  }
}

export const wechatAction = (param,fetching) => {
  console.log("action"+param)
  return {
    type:WECHAT,
    data:param,
    fetching:fetching
  }
}