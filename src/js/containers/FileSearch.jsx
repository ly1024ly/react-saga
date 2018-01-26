import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
import {
    Page,
    Tab,
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
    FlexItem   
} from "react-weui";
import Accordion from './accordion.js';
import { createStore,bindActionCreators } from 'redux';
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
require("../../css/fileSearch.css")

const menus = [
    {
        name: 'View',
        items: [
            {
                label: 'Collect',
                to: '/collect'
            }
        ]
    }
]

class FileSearch extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
        bottom_show: false,
        fullpage_show: false,
        class:"完成",
        val:''
    };
  }
  componentDidMount(){
    document.body.addEventListener("touchstart",this.touchstart)
    document.body.addEventListener("touchmove",this.touchmove)
  }
  saveValue = e => {
    this.setState({
      val:e.target.value
    })
  }
  touchmove = e => {
    e.stopPropagation();
    console.log("ooooooooooooooooo")
    console.log(this.state.clientx,e.changedTouches[0].clientX)
    let clientx = e.changedTouches[0].clientX;
    if(clientx+30<this.state.clientx){
      this.setState({fullpage_show: true})
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
    hide(){
        this.setState({
            bottom_show: false,
            fullpage_show: false,
        })
    }

    render() {
      return (
      <Page className="searchs">
        <Tab>
          <TabBody>
            <div className="content searchs">
              <div className="search-box" >
                <div className="search-input"> 
                  <input type="text" 
                    placeholder="关键字" 
                    className="search"
                    value={this.state.val}
                    onChange={this.saveValue}
                  />
                </div>
                <div className="search-btn">
                  <label type="button" className="btn"
                  >搜本页</label>
                  <label className="btn">筛选</label>
                </div>
              </div>
            </div>
            <Article>
              <section>
                <Cells>
                  <Cell href="javascript:;" access>
                    <CellBody>
                      <div>进给速度</div>
                      <span>dsfaa</span>
                    </CellBody>
                  </Cell>
                  <Cell access>
                    <CellBody>
                      <div>主周</div>
                      <span>dsfaa</span>
                    </CellBody>
                  </Cell>
                </Cells>
              </section>
            </Article>  
                <div style = {{display:this.state.fullpage_show?"block":"none"}} className="popup">
                    <div className="select">
                      <div className="hide"><i className="iconfont" onClick={e=>this.setState({fullpage_show: false})}>&#xe638;</i></div>
                      <div>
                        <ul>
                           
                          <li >
                              <Accordion
                                  header={
                                    <Flex className="li">
                                      <FlexItem component="p">
                                          品牌
                                      </FlexItem>
                                      <i className="iconfont" >&#xe600;</i>
                                    </Flex>
                                  }
                              >
                              <div className="uu">
                              <Flex>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                              </Flex>
                              <Flex>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                                  <FlexItem>
                                      <div className="placeholder">weui</div>
                                  </FlexItem>
                              </Flex> 
                            </div>                                                                          
                              </Accordion>
                          </li>
                           
                        </ul>
                      </div>
                      <div className="ok">
                        <div className={this.state.class=="重置" ? "press" :""} onClick={()=>{this.setState({class:"重置"})}}>重置
                        </div>
                        <div className={this.state.class=="完成" ? "press" :""} onClick={()=>{this.setState({class:"完成"})}}>完成
                        </div>
                      </div>
                    </div>
                </div>
          </TabBody>
            <TabBar className="footer">
              <TabBarItem
                  icon={<i className="iconfont icon-collect" >&#xe616;</i>}
                  label="我的收藏"
                  onClick={() =>this.context.router.push("collect")}
              />
              <TabBarItem >
                <Link to="filesearch">
                  <TabBarIcon>
                   icon={<i className="iconfont icon-title" style={{color:"orange"}}>&#xe656;</i>}  
                  </TabBarIcon>
                  <TabBarLabel>帮助文档</TabBarLabel>
                </Link>
              </TabBarItem>
              <TabBarItem
                  icon={<i className="iconfont icon-help">&#xe60b;</i>}
                  label="扫码求助"
              />
              <TabBarItem
                  icon={<i className="iconfont icon-r" style={{color:"#ddd"}}>&#xe6fd;</i>}
                  label="用户社区"
              />
          </TabBar>
        </Tab>
      </Page>
        );
    }
}
FileSearch.contextTypes={
    router: React.PropTypes.object.isRequired
}


export default FileSearch