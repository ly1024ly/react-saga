import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Using ES6 syntax
import WeUI from 'react-weui';
require("../util/jquery-weui.min.js");
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
require('jquery');

import 'weui/dist/style/weui.min.css';
import 'react-weui/build/packages/react-weui.css';
require("../../css/jquery-weui.css");
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/fileSearch.css");

class FileSearch extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
      clientx:0
    }
  }
  componentDidMount(){
    let that = this;
    document.body.addEventListener("touchstart",this.touchstart)
    document.body.addEventListener("touchmove",this.touchmove)

  }
  showPanel(e){
    console.log(e)
  
  }
  touchmove = e => {
    e.stopPropagation();
    console.log("ooooooooooooooooo")
    console.log(this.state.clientx,e.changedTouches[0].clientX)
    let clientx = e.changedTouches[0].clientX;
    if(clientx+10<this.state.clientx){
      $("#search").popup()
    }
  }
  touchstart = e => {
    console.log(e.changedTouches[0].clientX)
    e.stopPropagation();
    this.setState({
      clientx:e.changedTouches[0].clientX
    })
  }

  componentWillUnmount(){
    document.body.removeEventListener('touchstart',this.touchstart);
    document.body.removeEventListener('touchmove',this.touchmove);
  }
  render(){
    return (
      <div>
        <div id="search" className="weui-popup-container popup-bottom">
          <div className="weui-popup-overlay">gdht</div>
          <div className="weui-popup-modal">
            <div className="hide close-popup"><i className="iconfont close-popup" >&#xe638;</i></div>
            <div>fdsgfdg</div>
            <div>
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content searchs">
          <div className="search-box" >
            <div className="search-input"> 
              <input type="text" placeholder="关键字" className="search" />
            </div>
            <div className="search-btn">
              <label type="button" className="btn"
              >搜本页</label>
              <label className="btn">筛选</label>
            </div>
          </div>
        </div>
        <span style={{marginLeft:"15px",color:"#b2b2b2",fontSize:"12px"}}>猜你喜欢</span>
        <div className="weui-panel weui-panel_access">
          <div className="weui-panel__bd">
            <a href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg">
              <div className="weui-media-box__bd">
                <h4 className="weui-media-box__title">NcStudio V0 雕刻系统操作手册</h4>
                <p className="weui-media-box__desc">维宏|ncstudio V10 |操作手册。</p>
              </div>
            </a>
          </div>
          <div className="weui-panel__bd">
            <a href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg">
              <div className="weui-media-box__bd">
                <h4 className="weui-media-box__title">NcStudio V0 雕刻系统操作手册</h4>
                <p className="weui-media-box__desc">维宏|ncstudio V10 |操作手册。</p>
              </div>
            </a>
          </div>
          <div className="weui-panel__bd">
            <a href="javascript:void(0);" className="weui-media-box weui-media-box_appmsg">
              <div className="weui-media-box__bd">
                <h4 className="weui-media-box__title">NcStudio V0 雕刻系统操作手册</h4>
                <p className="weui-media-box__desc">维宏|ncstudio V10 |操作手册。</p>
              </div>
            </a>
          </div>
        </div>
        <footer>
           <div className="weui-tabbar">
              <Link to="collect" className="weui-tabbar__item" >
                <div className="weui-tabbar__icon">
                  <i className="iconfont icon-collect">&#xe616;</i>
                </div>
                <p className="weui-tabbar__label">我的收藏</p>
              </Link>
              <Link to="filesearch" className="weui-tabbar__item weui-bar__item--on" >
                <div className="weui-tabbar__icon">
                  <i className="iconfont icon-title" style={{color:"orange"}}>&#xe656;</i>
                </div>
                  <p className="weui-tabbar__label">帮助文档</p>
              </Link>
              <Link  className="weui-tabbar__item" >
                <div className="weui-tabbar__icon">
                  <i className="iconfont icon-help">&#xe60b;</i>
                </div>
                <p className="weui-tabbar__label">扫码求助</p>
              </Link>
              <a href="javascript:;" className="weui-tabbar__item" >
                <div className="weui-tabbar__icon">
                  <i className="iconfont icon-r" style={{color:"#ddd"}}>&#xe6fd;</i>
                </div>
                <p className="weui-tabbar__label">用户社区</p>
              </a>
            </div>
        </footer>
      </div>
    )
  }
}

export default FileSearch