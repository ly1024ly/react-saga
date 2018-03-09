import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
import {
    Page,
    Tab,
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter,
    TabBody,
    TabBar,
    TabBarItem,
    TabBarIcon,
    TabBarLabel,
    Article,
    IconButton,
    Cells,
    Cell,
    CellBody,
    CellFooter,
    Popup,
    Swiper,
    Button,
    Flex,
    FlexItem,
    InfiniteLoader
} from "react-weui";
import { connect } from 'react-redux';
import WeUI from 'react-weui';
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
require('jquery');
var wx = require("weixin-js-sdk");
import Collect from './Collect.jsx';
import {  } from "../redux/action/fileSearch.js";
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/iframe.css");
import {
    isCollectAction,
    likeAction,
    collectAction,
    delcollectAction,
    getpageAction,
    saveValAction,
    wechatAction
} from '../redux/action/iframe.js';
import {ajaxCollect} from '../redux/sagas/api.js';
var firstGuid = require('../../img/share-it.png');
import { is } from 'immutable';

class Iframe extends Component {
    static propTypes = {
        files:PropTypes.object,
        isCollectAction:PropTypes.func,
        likeAction:PropTypes.func,
        collectAction:PropTypes.func,
        delcollectAction:PropTypes.func,
        getpageAction:PropTypes.func,
        saveValAction:PropTypes.func,
        wechatAction:PropTypes.func
    }
    constructor(props,context){
        super(props,context)
        this.state ={
            fullpage_show: false,
            demoIndex:0,
            url:this.props.location.query.href,
            x:0,
            head:"",
            baseUrl:"",
            one:[],
            innerHtml:[],
            all:[],
            show:"none",
            pageY:0,
            iscollect:[],
            id:[],
            searchTitle:'',
            shareTitle:"",
            message:null,
            two:"https://nccloud.weihong.com.cn/nchelp/booklist/维宏百问/xml/ts_自识别写号导致软件无法使用.html"
        }
        this.like = this.like.bind(this);
        this.collect = this.collect.bind(this);
        this.delcollect = this.delcollect.bind(this);
    }
    componentWillMount(){
        this.setState({fullpage_show: false});
    }
    iter = (arr) => {
        let newArr = [];
        let str = "";
        for(let i = 0;i<arr.length;i++){
            if(arr[i].nodeName == 'IMG'){
                arr[i].src = this.state.url.split("xml")[0] + "image" + arr[i].src.split("image")[1];
                str += arr[i].outerHTML;
                console.log("----------------------------")
                console.log(str)
            } else {
                //str += arr[i].cloneNode();
                console.log("++++++++++++++++++++++++++++++");
                console.log(str)
                if(arr[i].children.length>0){
                    this.iter(arr[i].children)
                }
            }
            
        }
        
        return str
    }
    ajaxLoad(res){
        let html = "";
        let that = this;
        $.ajax({
            url: res,
            data: null,
            type: "GET",
            async:false,
            contentType: "text/html",
            success: function (res) {
               let o = document.createElement("html");  
               o.innerHTML = res;
               let old = document.head.innerHTML;
               let body = that.parseDom("<body" + res.split("<body")[1].split("</html>")[0]);
               let dom = that.parseDom(res.split("<head>")[1].split("</head>")[0]);
               let all = "";
               res = res.replace(/...\image/g, that.props.location.query.href.split("xml")[0] + "image");
                for(var i=0;i<dom.length;i++){ 
                    if(dom[i].nodeName=='LINK'){
                        let href = that.props.location.query.href.split("xml")[0] + dom[i].href.split("assets/")[1];
                        dom[i].href = href;
                        all += dom[i].outerHTML; 
                    }else{
                        all += dom[i].outerHTML; 
                    }
                    
                }
                
               let css = "<link rel='stylesheet' href='../css/prop.css' />";
               all = all + css;
               all = all.split("<title>")[0] + all.split("</title>")[1];
               document.head.innerHTML = all;
             
               html = res;
            },
            error: function (res) {
                try{
                    throw new Error(res)
                }catch(e){
                    alert(e)
                }
            }
        });
        return html
    }
    componentWillMount(){
        this.props.wechatAction();
    }
    componentDidMount(){
        this.swiperChange("1");
        console.log(this.props.location.query)
        this.setState({
            head:document.head.innerHTML,
            searchTitle:this.props.location.query.title,
            url:decodeURIComponent(this.props.location.query.href)
        });
        let param = {
            title:this.props.location.query.title,
            bookid:this.props.location.query.bookid
        }
        //获得页面
        this.props.getpageAction(param)
        let that = this;
        const {files} = this.props;
        if(files.menulist.data!==null){
            let arr = files.menulist.data;
            this.setState({
                all:files.menulist.data
            })
        }
        let href = this.props.location.query.href;
        this.setState({
            url:href
        });
        var framecont = document.getElementById("menuiframe");
        var doc = framecont.contentWindow;
        framecont.onload = function(e){
            doc.addEventListener('click',function(event){
                if(event.target.tagName=='A'){
                    event.preventDefault();
                    event.stopPropagation();
                    let param = {
                        title:event.target.innerText,
                        bookid:that.props.location.query.bookid
                    };
                    that.props.getpageAction(param);
                    that.setState({
                        fullpage_show:false,
                        one:[],
                        idArr:[],
                        innerHtml:[],
                        is:[]
                    })
                }
                
            });
        }
        
    }
    onScrollHandle=(event)=>{
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop === scrollHeight)
        console.log(event)
        if (this.state.isScrollBottom !== isBottom) {
          this.contentNode.scrollTop = isBottom
        }
    }
    collect =(id,type,title,index) => {
        if(type===undefined){
            type = "其他";
        }
        let val = this.state.one.find((val) => {
            return val.topicid == id
        })
        let obj ={
            username:"yang4",
            topicid:id,
            ContentType:type,
            title:title,
            bookid:this.props.location.query.bookid,
            bookname:this.props.location.query.bookname,
            topicURL:decodeURIComponent(val.url),
            book_keysjson:JSON.parse(this.props.location.query.message).book_keysjson,
            status:true 
        }
        console.log(obj,this.state.one)
        this.props.collectAction(obj);
        let o = {
            html:this.state.innerHtml,
            iscollect:this.state.iscollect
        };
        this.props.saveValAction(o)

    }
    delcollect = (id,type,title,index) => {
        if(type===undefined){
            type = "其他";
        }
        let val = this.state.one.find((val) => {
            return val.topicid == id
        })
        let obj ={
                username:"yang4",
                topicid:id,
                ContentType:type,
                title:title,
                topicURL:decodeURIComponent(val.url),
                bookid:this.props.location.query.bookid,
                bookname:this.props.location.query.bookname,
                book_keysjson:JSON.parse(this.props.location.query.message).book_keysjson,
                status:false 
            }
        this.props.delcollectAction(obj)
        let o = {
            html:this.state.innerHtml,
            iscollect:this.state.iscollect
        }
        this.props.saveValAction(o)
    }
    clickEvent = (e,res) => {
        console.log(e)
        if(e.target.getAttribute("href")){
            e.preventDefault()
            let href = e.target.getAttribute("href").split("../")[1];
            href = this.state.url.split("xml")[0] + href;
            this.setState({
                one:href
            })
            let title = e.target.text;
            let obj = {
                title:title,
                bookid:this.props.location.query.bookid
            }
            this.setState({
                one:[],
                innerHtml:[],
                iscollect:[]
            });
            this.props.getpageAction(obj);
        }
    }
    closePop = () => {
        this.setState({fullpage_show: false})
    }
    componentWillUnmount(){
        this.setState({
            one:[],
            innerHtml:[],
            iscollect:[]
        })
    }
    parseDom(nodelist) {
      var objE = document.createElement("div");  
      objE.innerHTML = nodelist;
      return objE.childNodes;
    }
    like = (id,title) => {
        console.log("like")
        let obj = {
            username:"yang4",
            topicid:id,
            title:title,
            status:true,
            filename:this.props.location.query.filename
        }
        let o = {
            html:this.state.innerHtml,
            iscollect:this.state.iscollect
        }
        this.props.saveValAction(o)
        this.props.likeAction(obj)
    }
    openPop = () => {
        this.setState({fullpage_show: true})
    }
    componentWillUnmount(){
        document.head.innerHTML = this.state.head;
        if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
        }
    }
    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
       const thisProps = this.props || {}, thisState = this.state || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }
      return false;
    }
    swiperChange(index){
        this.setState({demoIndex: index}) 
    }
    componentDidUpdate(){
        $(window).scrollTop(1000); 
    }
    shouldComponentUpdate(nextProps = {},nextState = {}) {
        return true
    }
    componentWillReceiveProps(nextProps){
        let page = this.state.one;
        console.log("--------------------------------------------------")
        console.log(nextProps.iframe)
        let addPage = [];
        let that = this;
        if(nextProps.iframe.page.data!==null&&nextProps.iframe.page.data.result&&nextProps.iframe.page.data.result=="success"){
            if(page.length==0){
                addPage = nextProps.iframe.page.data.message[0].OtherPages.slice(2,5);
                page = page.concat(nextProps.iframe.page.data.message[0].OtherPages.slice(2,5));
            } else {
                if(page[page.length-1].title!==nextProps.iframe.page.data.message[0].OtherPages.slice(4,5)[0].title){
                    addPage = nextProps.iframe.page.data.message[0].OtherPages.slice(3,5);
                }
                page = page.concat(nextProps.iframe.page.data.message[0].OtherPages.slice(3,5));
            }
            this.setState({
                massage:null,

            })
        } else if(nextProps.iframe.page.data!==null&&nextProps.iframe.page.data.result == "fail"){
            this.setState({
                massage:nextProps.iframe.page.data.message
            })
        }
        let s = this.state.url.split("xml")[0]+"xml/";
        let html = this.state.innerHtml;
        let is = this.state.iscollect;
        let idArr = this.state.id;
        console.log("***************addPage*****************");
        console.log(addPage)
        if(addPage.length>0) {
            for(var i=0;i<addPage.length;i++){
                addPage[i].url = s + addPage[i].url.split("/").pop();
                let url = s + addPage[i].url.split("/").pop();
                let result = this.ajaxLoad(decodeURI(addPage[i].url));
                let topicid = result.split("body")[1].split(">")[0].split("=")[1].split("\"")[1];
                let o ={
                    title:addPage[i].title,
                    topicid:topicid
                }
                idArr.push(o)
                html.push(result);
                let obj = {
                    username:"yang4",
                    topicid:topicid,
                    bookid:this.props.location.query.bookid
                }
                let json = ajaxCollect(obj);
                if(json.result == "success"){
                    let obj ={
                        luad:json.luad,
                        store:json.store,
                        luadnum:json.luadnum,
                        topicid:topicid
                    }
                    is.push(obj)
                }
            };
            for(var i=0;i<page.length;i++){
                for(var j=0;j<idArr.length;j++){
                    if(page[i].title == idArr[j].title){
                        page[i].topicid = idArr[j].topicid;
                    }
                }
            }
            this.setState({
                iscollect:is
            });

            if(nextProps.iframe.collect.data!==null&&nextProps.iframe.collect.data.result=="success"){
                let a = this.state.iscollect;
                for(var i=0;i<a.length;i++){
                    if(a[i].topicid==nextProps.iframe.collect.data.topicid){
                        a[i].store = true;
                    }
                }
                this.setState({
                    iscollect:a
                }); 
            }
            if(nextProps.iframe.delcollect.data!==null&&nextProps.iframe.delcollect.data.result=="success"){
                let a = this.state.iscollect;
                for(var i=0;i<a.length;i++){
                    if(a[i].topicid==nextProps.iframe.delcollect.data.topicid){
                        a[i].store = false;
                    }
                }
                this.setState({
                    iscollect:a
                }); 
            }
            
        }
        let set = new Set(page);
        page = Array.from(set);
        if(nextProps.iframe.save.data!==null&&nextProps.iframe.save.data.html){
            let isc = nextProps.iframe.save.data.iscollect;
            if(nextProps.iframe.like.data!==null&&nextProps.iframe.like.data.result == "success"){
                for(var i=0;i<isc.length;i++){
                    if(isc[i].topicid == nextProps.iframe.like.data.topicid){
                        isc[i].luad = true;
                        isc[i].luadnum = isc[i].luadnum + 1;
                    }
                }
            }
            if(nextProps.iframe.collect.data!==null&&nextProps.iframe.collect.data.result == "success"){
                for(var i=0;i<isc.length;i++){
                    if(isc[i].topicid == nextProps.iframe.collect.data.topicid){
                        isc[i].store = true;
                        
                    }
                }
            }
            if(nextProps.iframe.delcollect.data!==null&&nextProps.iframe.delcollect.data.result == "success"){
                for(var i=0;i<isc.length;i++){
                    if(isc[i].topicid == nextProps.iframe.delcollect.data.topicid){
                        isc[i].store = false;
                        
                    }
                }
            }
            this.setState({
                innerHtml:nextProps.iframe.save.data.html,
                iscollect:isc
            })
        }else{
            this.setState({
                one:page,
                innerHtml:html
            })
        }
        let wechat;
        if(nextProps.iframe.wechat.data&&nextProps.iframe.wechat.data!==null&&nextProps.iframe.wechat.data.result=="success"){
            wechat = nextProps.iframe.wechat.data.values;
            wx.config({
                debug: false,
                appId: wechat.appId,
                timestamp: wechat.timestamp,
                nonceStr: wechat.nonceStr,
                signature: wechat.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone',
                    'showMenuItems',
                    "showOptionMenu"
                ],

            });
            let url = "";
            let topicid = '';
            for(var i=0;i<this.state.one.length;i++){
                if(this.state.one[i].title == this.state.shareTitle){
                    url = encodeURIComponent(this.state.one[i].url);
                    topicid = this.state.one[i].topicid
                }
            };
            wx.ready(() => {
                wx.showOptionMenu();
                var shareDate = {
                    title:"维宏云在线帮助：" + that.state.shareTitle,
                    link:"https://nccloud.weihong.com.cn/nchelp/share.html?topicid=" + topicid + "&shareUrl=" + url,
                    imgUrl: "https://nccloud.weihong.com.cn/img/share.jpg",
                    trigger: function(res) {
                    },
                    success: function(res) {
                        $("#share_btn").css("color","orange");
                    },
                    cancel: function(res) {
                       $("#share_btn").css("color","black");
                    }
                };

                wx.onMenuShareTimeline(shareDate);
                wx.onMenuShareAppMessage(shareDate);
                wx.onMenuShareQQ(shareDate);
                wx.onMenuShareQZone(shareDate);
            });
            wx.error(function(res) {
                console.log(res)
               
            });
        }        
       
    }
    hideFlow(param,title=""){
        console.log("ggg");
        console.log(title)
        this.setState({
            show:param,
            shareTitle:title
        })
    }
    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView(); }
        }
    }
    render(){
        let success = false;
        let collect = false;
        const { files,iframe } = this.props;
        let page = [];
        if(iframe.page.data!==null&&iframe.page.data.result=="success"){
            page = iframe.page.data.message.OtherPages;
        }
        let height = (window.innerHeight - 30);
        let menuHeight = (window.innerHeight - 35) + "px";
        let iscollect = this.state.iscollect;
        let show = this.state.show;

        return (
            <div className="iframe">
                <div id="shareit" style={{display:show}} onClick={(e) => this.hideFlow("none")}>
                    <img className="arrow" src= {firstGuid} />
                    <div  id="follow">
                        点击右上角按钮，开始分享
                    </div>
                </div>
            <InfiniteLoader
                onLoadMore={ (resolve, finish) => {
                    //mock request
                    
                        if(1==2){
                            console.log("finish")
                            finish()
                        }else{
                           
                            let obj = {
                                title:this.state.one[this.state.one.length-1].title,
                                bookid:this.props.location.query.bookid
                            }
                            console.log(obj,this.state.one,this.state.searchTitle)
                            if(this.state.one[this.state.one.length-1].title!==this.state.searchTitle){
                                this.props.getpageAction(obj);
                            }
                            this.setState({
                                searchTitle:this.state.one[this.state.one.length-1].title
                            })
                            this.setState({
                               searchTitle:this.state.one[this.state.one.length-1].title
                            }, ()=> resolve())
                        }
                   
                }}
            >
                <Panel>
                    <PanelHeader onClick={()=>this.openPop()}>
                        <i className="iconfont" >&#xe639;</i>
                    </PanelHeader>
                    <PanelBody>
                       <div style={{height:height,overFlow:"auto"}} id="frabox">
                        {
                           this.state.innerHtml.map(function(item,index){
                                let topicid = item.split("body")[1].split(">")[0].split("=")[1].split("\"")[1];
                                let title = item.split("h1")[1].split(">")[1].split("<")[0];
                                let ContentType;
                                if(item.indexOf("ContentType")>=0){
                                    ContentType = item.split("ContentType")[1].split("content=")[1].split(">")[0].split("\"")[1];
                                }
                                let like = false;
                                let store = false;
                                let num = 0;
                                if(iscollect.length>0){
                                    for(let i=0;i<iscollect.length;i++){
                                        if(iscollect[i].topicid == topicid){
                                            like = iscollect[i].luad;
                                            store = iscollect[i].store;
                                            num = iscollect[i].luadnum;
                                            return (
                                                <Article key={index} className="one" onClick={(e) => this.clickEvent(e,index)}>
                                                    <a id={"md"+index}>
                                                        <div dangerouslySetInnerHTML={{ __html:item}} ></div>
                                                    </a>
                                                    <div className="m">
                                                        {like ? <i className="iconfont icon-yes">&#xe63a;</i> : <i className="iconfont icon-no" onClick={() => this.like(topicid,title)}>&#xe67f;</i>}{num}
                                                        {store ? <i className="iconfont icon-yes" onClick={() => this.delcollect(topicid,ContentType,title,index)}>&#xe620;</i> : <i className="iconfont icon-no" onClick={() => this.collect(topicid,ContentType,title,index)}>&#xe616;</i> }
                                                        <i className="iconfont" onClick={(e) => this.hideFlow("block",title)}>&#xe619;</i>
                                                    </div>
                                                </Article>
                                            )
                                        }
                                    }
                                }
                            },this)
                        }
                        <div className="none" style={{display:this.state.message==null ? "none" : "block"}}>{this.state.message}</div>
                        </div>
                    </PanelBody>
                    </Panel>
                    <div
                        className="pop"
                        style={{display:this.state.fullpage_show ? "block" : "none"}}
                        onClick={()=>this.closePop()}
                    >
                        <div style={{height: '100vh', overflow: 'scroll'}}>
                            <Article>
                                <div className="menu">
                                    <i className="iconfont" onClick={()=>this.closePop()}>&#xe638;</i>
                                    <Link to="collect"><div>进入"我的收藏"</div></Link>
                                </div>
                                <div className="menuIframe">
                                    <iframe src="https://nccloud.weihong.com.cn/nchelp/booklist/维宏百问/index.html" style={{height:menuHeight}} id="menuiframe"></iframe>
                                </div>
                            </Article>
                        </div>
                    </div>
                 </InfiniteLoader>
            </div>
            )
    }
}

function mapStateToProps(state) {
  return {
    files:state.files,
    iframe:state.iframe
  }
}

export default connect(mapStateToProps,{
  isCollectAction,
  likeAction,
  collectAction,
  delcollectAction,
  getpageAction,
  saveValAction,
  wechatAction
})(Iframe)

