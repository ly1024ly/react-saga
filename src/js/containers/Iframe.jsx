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
import Collect from './Collect.jsx';
import {  } from "../redux/action/fileSearch.js";
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/iframe.css");
import {isCollectAction,likeAction,collectAction,delcollectAction,getpageAction} from '../redux/action/iframe.js';
import {ajaxCollect} from '../redux/sagas/api.js';


class Iframe extends Component {
    static propTypes = {
        files:PropTypes.object,
        isCollectAction:PropTypes.func,
        likeAction:PropTypes.func,
        collectAction:PropTypes.func,
        delcollectAction:PropTypes.func,
        getpageAction:PropTypes.func
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
            pageY:0,
            two:"https://nccloud.weihong.com.cn/nchelp/booklist/维宏百问/xml/ts_自识别写号导致软件无法使用.html"
        }
        this.like = this.like.bind(this);
        this.collect = this.collect.bind(this);
        this.delcollect = this.delcollect.bind(this);
    }
    componentWillMount(){
        this.setState({fullpage_show: false})
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
               html =  res;
               let o = document.createElement("div");  
                o.innerHTML = res;
               let old = document.head.innerHTML;
               let body = that.parseDom(res);
               let img = body[body.length-1].querySelectorAll("img");
               for(var i =0;i<img.length;i++){
                img[i].src = that.state.url.split("xml")[0] + img[i].src.split("assets/")[1];
               }
               console.log(img)
               let dom = that.parseDom(res.split("<head>")[1].split("</head>")[0]);
               let all = "";
                for(var i=0;i<dom.length;i++){
                    if(dom[i].nodeName=='LINK'){
                        let href = that.state.url.split("xml")[0] + dom[i].href.split("assets/")[1];
                        dom[i].href = href;
                        all += dom[i].outerHTML; 
                    }else{
                        all += dom[i].outerHTML; 
                    }
                    if(dom[i].nodeName=='IMG'){
                        dom[i].src = that.state.url.split("xml")[0] + dom[i].src.split("../")[1];
                        console.log(dom[i])
                    }
                    console.log(dom[i])
                }

               let css = "<link rel='stylesheet' href='../css/prop.css' />";
               all = all + css;
               document.head.innerHTML = all;
            },
            error: function (res) {
                alert(res);
            }
        });
        return html
    }
    componentDidMount(){
        this.swiperChange("1")
        this.setState({
            head:document.head.innerHTML,
            url:decodeURIComponent(this.props.location.query.href)
        });
        let param = {
            title:this.props.location.query.title,
            bookid:this.props.location.query.bookid
        }
        this.props.getpageAction(param)
        let that = this;
        const {files} = this.props;
        console.log(files);
        if(files.menulist.data!==null){
            let arr = files.menulist.data;
            this.setState({
                one:arr,
                all:files.menulist.data
            })
            let html = [];
            for(var i = 0;i<arr.length;i++){
                let result = this.ajaxLoad(arr[i]);
                let topicid = result.split("body")[1].split(">")[0].split("=")[1].split("\"")[1];
                html.push(result);
                let obj = {
                    bookid:this.props.location.query.bookid,
                    topicid:topicid,
                    username:"yang6"
                }
                this.props.isCollectAction(obj)
            }
            this.setState({
                innerHtml:html
            })
        }
        let href = this.props.location.query.href;
        this.setState({
            url:href
        })
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
        let obj ={
                username:"yang6",
                topicid:id,
                ContentType:type,
                title:title,
                topicURL:decodeURIComponent(this.state.one[index]),
                book_keysjson:JSON.parse(this.props.location.query.message).book_keysjson,
                status:true 
            }
        this.props.collectAction(obj)

    }
    delcollect = (id,type,title,index) => {
        if(type===undefined){
            type = "其他";
        }
        let obj ={
                username:"yang6",
                topicid:id,
                ContentType:type,
                title:title,
                topicURL:decodeURIComponent(this.state.one[index]),
                book_keysjson:JSON.parse(this.props.location.query.message).book_keysjson,
                status:false 
            }
        this.props.delcollectAction(obj)
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
            
        }
    }
    closePop = () => {
        this.setState({fullpage_show: false})
    }
    parseDom(nodelist) {
      var objE = document.createElement("div");  
      objE.innerHTML = nodelist;
      return objE.childNodes;
    }
    like = (id,title) => {
        console.log("like")
        let obj = {
            username:"yang6",
            topicid:id,
            title:title,
            status:true,
            filename:this.props.location.query.filename
        }
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
    swiperChange(index){
        this.setState({demoIndex: index}) 
    }
    componentDidUpdate(){
        $(window).scrollTop(1000); 
    }
    tabMenu = e => {
        e.preventDefault();
        console.log(e)
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
        console.log(iframe)
        let height = (window.innerHeight - 30);
        let menuHeight = (window.innerHeight - 35) + "px";
        let iscollect = [];
        if(iframe.collect.data!==null&&iframe.collect.data.length>0){
            iscollect = iframe.collect;
        }else if(iframe.delcollect.data!==null&&iframe.delcollect.data.length>0){
            iscollect = iframe.delcollect
        }else{
            iscollect = iframe.iscollect;
        }
        
        return (
            <div className="iframe">
            <InfiniteLoader
                onLoadMore={ (resolve, finish) => {
                    //mock request
                    setTimeout( ()=> {
                        if(this.state.one.length >= this.state.all.length){
                            console.log("finish")
                            finish()
                        }else{
                            let len = this.state.one.length+6;
                            let arr = this.state.all.slice(this.state.one.length-1,len)
                            let html = this.state.innerHtml;
                            let id = "md"+(this.state.one.length-1).toString();
                            $(window).scrollTop(1000); 
                            for(var i = 0;i<arr.length;i++){
                                let result = this.ajaxLoad(arr[i]);
                                let topicid = result.split("body")[1].split(">")[0].split("=")[1].split("\"")[1];
                                html.push(result);
                                let obj = {
                                    bookid:this.props.location.query.bookid,
                                    topicid:topicid,
                                    username:"yang6"
                                }
                                this.props.isCollectAction(obj)
                            }

                            this.setState({
                                innerHtml:html
                            })
                            this.setState({
                                one: this.state.all.slice(0,len-1)
                            }, ()=> resolve())
                        }
                    }, 1000)
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
                                if(iscollect.data!==null&&iscollect.data.length>0){
                                    for(let i=0;i<iscollect.data.length;i++){
                                        if(iscollect.data[i].topicid == topicid&&iscollect.data[i].json.result=="success"){
                                            like = iscollect.data[i].json.luad;
                                            store = iscollect.data[i].json.store;
                                            num = iscollect.data[i].json.luadnum;
                                            return (
                                                <Article key={index} className="one" onClick={(e) => this.clickEvent(e,index)}>
                                                    <a id={"md"+index}>
                                                        <div dangerouslySetInnerHTML={{ __html:item}} ></div>
                                                    </a>
                                                    <div className="m">{num}
                                                        {like ? <i className="iconfont icon-yes">&#xe63a;</i> : <i className="iconfont icon-no" onClick={() => this.like(topicid,title)}>&#xe67f;</i>}
                                                        {store ? <i className="iconfont icon-yes" onClick={() => this.delcollect(topicid,ContentType,title,index)}>&#xe620;</i> : <i className="iconfont icon-no" onClick={() => this.collect(topicid,ContentType,title,index)}>&#xe616;</i> }
                                                        <i className="iconfont">&#xe619;</i>
                                                    </div>
                                                </Article>
                                            )
                                        }
                                    }
                                }
                            },this)
                        }
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
                                    <iframe src="https://nccloud.weihong.com.cn/nchelp/booklist/维宏百问/index.html" style={{height:menuHeight}} onClick={(e) => this.tabMenu(e)}></iframe>
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
  getpageAction
})(Iframe)

