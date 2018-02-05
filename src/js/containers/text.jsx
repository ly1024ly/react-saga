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
import {isCollectAction} from '../redux/action/iframe.js';
import {ajaxCollect} from '../redux/sagas/api.js';


class Iframe extends Component {
    static propTypes = {
        files:PropTypes.object,
        isCollectAction:PropTypes.func
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
        }
        let href = this.props.location.query.href;
        this.setState({
            url:href
        })
    }
    collect =() => {
        console.log("collect")
        let obj ={
                username:"yang6",
                bookid:this.props.location.query.bookid,
                topicid:"12345678"
            }
        
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
    loadHtml =(res) => {
        let result = this.ajaxLoad(res);
        let like = false;
        let collect = false;
        let num = 0;
        if(result.indexOf("body")>=0){
            let topicid = result.split("body")[1].split(">")[0].split("=")[1].split("\"")[1];
            console.log(topicid)
            let obj ={
                username:"yang6",
                bookid:this.props.location.query.bookid,
                topicid:topicid
            }
            console.log(obj)
            const json = ajaxCollect(obj);
            console.log(json)
            if(json&&json.result == "success"){
                like = json.luad;
                collect = json.store;
                num = json.luadnum;
            }
        }
        let append = `<div class="m">同行点赞${num}
                        ${like ? `<i class="iconfont icon-yes">&#xe63a;</i>` :`<i class="iconfont icon-no" onClick=${this.like()}>&#xe67f;</i>`}
                        ${collect ? `<i class="iconfont icon-yes">&#xe620;</i>` : `<i class="iconfont icon-no" onClick=${this.collect()}>&#xe616;</i>`}
                        <i class="iconfont">&#xe619;</i>
                    </div>`;
                    result = result + append;
        return {__html: result};
    }
    like = () => {
        console.log("like")
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
                            this.state.one.map(function(item,index){
                                return (
                                    <Article key={index} className="one" dangerouslySetInnerHTML={this.loadHtml(item)} onClick={(e) => this.clickEvent(e,index)}>
                                        
                                    </Article>
                                )
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
                                    <iframe src="" style={{height:menuHeight}}></iframe>
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
  isCollectAction
})(Iframe)

