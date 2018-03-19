export const SEARCH_FILE = 'SEARCH_FILE'
export const ADD_FILE = 'ADD_FILE'
export const SAVE_TAB = 'SAVE_TAB'
export const COMFIRM_ADD = 'COMFIRM_ADD'
export const MENU_URL = 'MENU_URL'
export const FILTER = 'FILTER'
export const BRAND = 'BRAND'
export const SAVE_VAL = 'SAVE_VAL'
export const ALL_BOOK = 'ALL_BOOK'

export const findFileAction = (param,fetching) => {
  return {
    type:SEARCH_FILE,
    data:param,
    fetching:fetching
  }
}

export const addFileAction = (param,fetching) => {
  console.log("hhhhhhhhhhhhh")
  return {
    type:ADD_FILE,
    data:param,
    fetching:fetching
  }
}

export const saveTabAction = (param,fetching) => {
  return {
    type:SAVE_TAB,
    data:param,
    fetching:fetching
  }
}

export const comfirmFileAction = (param,fetching) => {
  console.log(fetching)
  return {
    type:COMFIRM_ADD,
    data:param,
    fetching:fetching
  }
}

export const menuurlAction = (param,fetching) => {
  return {
    type:MENU_URL,
    data:param,
    fetching:fetching
  }
}

export const filterAction = (param,fetching) => {
  return {
    type:FILTER,
    data:param,
    fetching:fetching
  }
}

export const brandAction = (param=null,fetching) => {
  return {
    type:BRAND,
    data:param,
    fetching:fetching
  }
}

export const saveAction = (param,fetching) => {
  return {
    type:SAVE_VAL,
    data:param,
    fetching:fetching
  }
}

export const bookAction = (param=null,fetching) => {
  return {
    type:ALL_BOOK,
    data:param,
    fetching:fetching
  }
}