import 'whatwg-fetch';
require('jquery');
import axios from 'axios';
const getURL = (url) => "https://nccloud.weihong.com.cn/nccloudOLhelp/" + url;

export const searchFile = (param) =>{
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

export const addFile = (param) => {
  return fetch(getURL(`search/getCatalogIndex?bookid=${param.bookid}&bookname=${param.bookname}`),{
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing failed' ,ex));
}

export const comFile = (param) => {
  return fetch(getURL(`search/saveCatalog?`),{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(param)
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing faild',ex));
}

export const myCollect = (param) => {
  return fetch(getURL(`search/mystore?username=${param.username}`),{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('faild',ex));
}

//iframe******************************

export const iscollect = (param) => {
  return fetch(getURL(`search//filename/allstatus?username=${param.username}&topicid=${param.topicid}&bookid=${param.bookid}`),{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('faild',ex))
}

export const ajaxCollect = (param) => {
  let result;
  $.ajax({
    type:'get',
    url:'https://nccloud.weihong.com.cn/nccloudOLhelp/search//filename/allstatus?username='+param.username+ '&topicid=' + param.topicid + '&bookid=' + param.bookid,
    async:false,
    success:function(res){
      result = res
    },
    error:function(err){
      result = err
    }
  })
  return result
}

export const like = (param) => {
  return fetch(getURL(`search/laud?`),{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(param)
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing faild',ex));
}

export const collect = (param) => {
  return fetch(getURL(`search/storeup?`),{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(param)
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing faild',ex));
}

export const getpage = (param) => {
  return fetch(getURL(`search/getTopicPages?title=${param.title}&bookid=${param.bookid}&topicid=${param.topicid}`),{
    method:'GET',
    
  }).then(res => res.json())
    .then(json => {
      return json
    })
    .catch(ex => console.log('parsing faild',ex));
}


export const wechatapi = (param) => {
  console.log("wechat")
  const body = {
    url:location.href.split("#")[0]
  };
  return fetch("https://nccloud.weihong.com.cn/weixin/jssdksignature",{
    method:'POST',
    headers:{
      'Accept':'application',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body),
  }).then(res => res.json())
    .then(json => {
      console.log(json)
      return json
    })
  .catch(ex => console.log('parsing faild',ex));
}

export const searchCollect = param => {
  return fetch(getURL(`search/searchMystore?username=${param.username}&string=${param.string}`),{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(json => {
    return json
  })
}

export const filterapi = param => {
  return fetch(getURL("search/filter?"),{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(param)
  }).then(res => res.json())
  .then(json => {
    return json
  })
  .catch(ex => console.log('parsing faild',ex));
}

export const brandapi = param => {
  return fetch(getURL("search/type/product/base?"),{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(json => {
    return json
  })
}

export const allbooks = param => {
  return fetch(getURL("search/type/product/base?"),{
    method:'GET',
  }).then(res => res.json())
  .then(json => {
    return json
  })
}