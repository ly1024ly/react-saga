export const MYCOLLECT = 'MYCOLLECT'

export const mycollectAction = (param,fetching) => {
  return {
    type:MYCOLLECT,
    data:param,
    fetching:fetching
  }
}