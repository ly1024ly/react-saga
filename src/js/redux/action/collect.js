export const MYCOLLECT = 'MYCOLLECT'
export const DELTHEME = 'DELTHEME'
export const DELBOOK = 'DELBOOK'
export const SEARCH_COLLECT = 'SEARCH_COLLECT'

export const mycollectAction = (param,fetching) => {
  return {
    type:MYCOLLECT,
    data:param,
    fetching:fetching
  }
}

export const delthemeAction = (param,fetching) => {
  return {
      type:DELTHEME,
      data:param,
      fetching:fetching
  }
}

export const delbookAction =(param,fetching) => {
  return {
    type:DELBOOK,
    data:param,
    fetching:fetching
  }
}

export const searchAction = (param,fetching) => {
  return {
    type:SEARCH_COLLECT,
    data:param,
    fetching:fetching
  }
}