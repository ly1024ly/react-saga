import 'whatwg-fetch';

const getURL = (url) => "http://172.16.11.71:3008/" + url;

export const searchFile = (param) =>{
  console.log(param)
  return fetch(getURL(`search/getTitleAndHtmlUrl?q=${param.q}&page=${param.page}&type=${param.type}`),{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing failed', ex));
}