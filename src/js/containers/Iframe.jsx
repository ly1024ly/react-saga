import React, { Component } from 'react';
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
    Button,
    Flex,
    FlexItem,
} from "react-weui";
import { connect } from 'react-redux';
import WeUI from 'react-weui';
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
require('jquery');
import Collect from './Collect.jsx';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/iframe.css");

class Iframe extends Component {
    constructor(props,context){
        super(props,context)
        this.state ={
            fullpage_show: false,
            demoIndex:1,
            url:'',
            x:0
        }
    }
    componentDidMount(){
        this.swiperChange("1")
        var framecont = document.getElementById("iframe");
        var doc = framecont.contentWindow;
        let that = this;
        framecont.onload = function(e){
            doc.addEventListener('touchstart',function(event){
                that.setState({
                    x:event.changedTouches[0].clientX
                })
            });
            doc.addEventListener('touchend',function(event){
                if(event.changedTouches[0].clientX+100<=that.state.x){
                    let path = {
                      pathname:"iframe",
                      query:{}
                    }
                    hashHistory.push(path)
                }else if(that.state.x+100<=event.changedTouches[0].clientX){
                    let path = {
                      pathname:"iframe",
                      query:{}
                    }
                    hashHistory.push(path)
                }
            });
        }
        //document.body.removeEventListener('touchstart',this.touchstart);
        //document.body.removeEventListener('touchend',this.touchend);
        let href = this.props.location.query.href;
        this.setState({
            url:href
        })
    }
    closePop = () => {
        this.setState({fullpage_show: false})
    }
    openPop = () => {
        this.setState({fullpage_show: true})
    }
    componentWillUnmount(){
        document.body.removeEventListener('touchstart',this.touchstart);
        document.body.removeEventListener('touchend',this.touchend);
    }
    swiperChange(index){
        console.log(typeof(index))
        this.setState({demoIndex: index}) 
    }
    render(){
        let success = false;
        let collect = false;
        let height = (window.innerHeight - 120);
        let menuHeight = (window.innerHeight - 35) + "px";
        return (
            <div className="iframe">
                <Panel>
                    <PanelHeader onClick={()=>this.openPop()}>
                        <i className="iconfont" >&#xe639;</i>
                    </PanelHeader>
                    <PanelBody>
                        <iframe src={this.state.url} style={{height:height }} id="iframe">
                        </iframe>
                    </PanelBody>
                    <footer>
                        <div className="iframe">
                            <div className="box">
                                {success ? <i className="iconfont icon-yes">&#xe63a;</i> : <i className="iconfont icon-no" >&#xe67f;</i>}
                                {collect ? <i className="iconfont icon-yes">&#xe620;</i> : <i className="iconfont icon-no">&#xe616;</i>}
                                <i className="iconfont" id="share_btn">&#xe619;</i>
                            </div>
                        </div>
                        <div className="upPage">
                            <div className="left">
                                <i className="iconfont">&#xe602;</i>T:道具
                            </div>
                            <div className="right">
                                T:道具<i className="iconfont">&#xe603;</i>
                            </div>
                        </div>
                    </footer>
                    </Panel>
                    <Popup
                        show={this.state.fullpage_show}
                        onRequestClose={()=>this.closePop()}
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
                    </Popup>
            </div>
            )
    }
}

export default Iframe