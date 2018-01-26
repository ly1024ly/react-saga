import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory,
  history
} from 'react-router';
import WeUI from 'react-weui';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/collect.css");

var History = require('react-router').History;
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
    CellFooter   
} from "react-weui";


class Collect extends Component {
  mixins:[History]
  constructor(props,context){
    super(props,context)
    this.state = {
      border:["书签","手册","帖子"],
      tab:0,
      val:''
    }
  }
  componentDidMount(){
    let width = window.screen.width+"px";
      $(".a").css("width",width)
      $(".react-weui-infiniteloader__content").css("width",width)
      
  }
  saveValue = (e) => {
    this.setState({
      val:e.target.value
    })
  }
  tabChange = (e) => {
    console.log(e.target);
    let arr = e.target.parentElement.children;
    for(var i=0;i<arr.length;i++){
      arr[i].setAttribute("class","weui-navbar__item")
    }
    e.target.setAttribute("class","weui-navbar__item weui_bar__item_on");
    console.log(e.target.innerText)
  }
  render(){
    return (
      <Page className="collect">
        <Tab>
          <TabBody>
            <div className="content searchs">
              <div className="search-box" >
                <div className="search-input"> 
                  <input type="text" 
                    placeholder="关键字" 
                    value={this.state.val}
                    className="search" 
                    onChange={this.saveValue}
                  />
                </div>
                <div className="search-btn">
                  <label type="button" className="btn"
                  >搜本页</label>
                  <label className="btn">添加</label>
                </div>
              </div>
            </div>
            <TabBar className="changeType">
              <TabBarItem
                  active={this.state.tab == 0}
                  onClick={e=>this.setState({tab:0})}
                  label="主题"
              />
              <TabBarItem 
                active={this.state.tab == 1} 
                onClick={e=>this.setState({tab:1})}
                label="手册"
              />
              <TabBarItem
                  active={this.state.tab == 2}
                  onClick={e=>this.setState({tab:2})}
                  label="帖子"
              />
          </TabBar>
          <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
            <section>
              <Cells>
                <Cell href="javascript:;" access>
                  <CellBody>
                    进给速度
                  </CellBody>
                  <CellFooter>
                  </CellFooter>
                </Cell>
                <Cell access>
                  <CellBody>
                     主周
                  </CellBody>
                  <CellFooter>
                </CellFooter>
                </Cell>
              </Cells>
            </section>
          </Article>
                  <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
                     <section>
                      <Cells>
                        <Cell href="javascript:;" access>
                          <CellBody>
                            进给速度
                          </CellBody>
                          <CellFooter>
                          </CellFooter>
                        </Cell>
                        <Cell access>
                          <CellBody>
                             主周
                          </CellBody>
                          <CellFooter>
                        </CellFooter>
                        </Cell>
                      </Cells>
                    </section>
                    </Article>
                    
          </TabBody>
            <TabBar className="footer">
              <TabBarItem
                  icon={<i className="iconfont icon-collect" style={{color:"orange"}}>&#xe616;</i>}
                  label="我的收藏"
              />
              <TabBarItem >
                <Link to="filesearch">
                  <TabBarIcon>
                   icon={<i className="iconfont icon-title" >&#xe656;</i>}  
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
    )
  }
}
Collect.contextTypes={
    router: React.PropTypes.object.isRequired
}

export default Collect