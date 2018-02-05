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
import {isCollectAction,likeAction,collectAction} from '../redux/action/iframe.js';
import {ajaxCollect} from '../redux/sagas/api.js';


class Iframe extends Component {
    static propTypes = {
        files:PropTypes.object,
        isCollectAction:PropTypes.func,
        likeAction:PropTypes.func,
        collectAction:PropTypes.func
    }
    constructor(props,context){
        super(props,context)
        this.state ={
            fullpage_show: false,
            demoIndex:0,
            url:'',
            x:0,
            head:"",
            baseUrl:"",
            one:[],
            innerHtml:[],
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
        let that = this;
        const {files} = this.props;
        console.log(files);
        if(files.menulist.data!==null){
            let arr = files.menulist.data.slice(0,5);
            this.setState({
                one:arr
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
    collect =(id,type,title,index) => {
        if(type===undefined){
            type = "其他";
        }
        console.log(this.props.location.query.message)
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
    delcollect = () => {

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
    }
    swiperChange(index){
        this.setState({demoIndex: index}) 
    }
    render(){
        let success = false;
        let collect = false;
        const { files,iframe } = this.props;
        let height = (window.innerHeight - 30);
        let menuHeight = (window.innerHeight - 35) + "px";
       console.log(iframe)
        return (
            <div className="iframe">
            <InfiniteLoader
                onLoadMore={ (resolve, finish) => {
                    //mock request
                    setTimeout( ()=> {
                        if(this.state.one.length > 6){
                            finish()
                        }else{
                            this.setState({
                                one: this.state.one.concat([this.state.one.length])
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
                                if(iframe.iscollect.data!==null&&iframe.iscollect.data.length>0){
                                    for(let i=0;i<iframe.iscollect.data.length;i++){
                                        if(iframe.iscollect.data[i].topicid == topicid&&iframe.iscollect.data[i].json.result=="success"){
                                            like = iframe.iscollect.data[i].json.luad;
                                            store = iframe.iscollect.data[i].json.store;
                                            num = iframe.iscollect.data[i].json.luadnum;
                                            return (
                                                <Article key={index} className="one" onClick={(e) => this.clickEvent(e,index)}>
                                                    <div dangerouslySetInnerHTML={{ __html:item}}></div>
                                                    <div className="m">同行点赞{num}
                                                        {like ? <i className="iconfont icon-yes">&#xe63a;</i> : <i className="iconfont icon-no" onClick={() => this.like(topicid,title)}>&#xe67f;</i>}
                                                        {store ? <i className="iconfont icon-yes">&#xe620;</i> : <i className="iconfont icon-no" onClick={() => this.collect(topicid,ContentType,title,index)}>&#xe616;</i> }
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
                    <footer>
                        <div className="upPage">
                            <div className="left">
                                <i className="iconfont" >&#xe602;</i>T:道具
                            </div>
                            <div className="right">
                                T:道具<i className="iconfont">&#xe603;</i>
                            </div>
                        </div>
                    </footer>
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
                                    <iframe src="https://nccloud.weihong.com.cn/nchelp/booklist/维宏百问/index.html" style={{height:menuHeight}}></iframe>
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
  collectAction
})(Iframe)

