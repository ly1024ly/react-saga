export const SEARCH_FILE = 'SEARCH_FILE'

export const findFileAction = (param,fetching) => {
  console.log("kkkkkkkkkkkkkkkkkkkkkk")

  return {
    type:SEARCH_FILE,
    data:param,
    fetching:fetching
  }
}