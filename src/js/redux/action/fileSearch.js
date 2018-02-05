export const SEARCH_FILE = 'SEARCH_FILE'
export const ADD_FILE = 'ADD_FILE'
export const SAVE_TAB = 'SAVE_TAB'
export const COMFIRM_ADD = 'COMFIRM_ADD'
export const MENU_URL = 'MENU_URL'

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