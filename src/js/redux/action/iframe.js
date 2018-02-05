export const IS_COLLECT = 'IS_COLLECT'
export const LIKE = 'LIKE'
export const COLLECT = 'COLLECT'

export const isCollectAction = (param,fetching) => {
  return {
    type:IS_COLLECT,
    data:param,
    fetching:fetching
  }
}

export const likeAction = (param,fetching) => {
  return {
    type:'LIKE',
    data:param,
    fetching:fetching
  }
}

export const collectAction = (param,fetching) => {
  return {
    type:'COLLECT',
    data:param,
    fetching:fetching
  }
}