import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory,
  history
} from 'react-router';
import WeUI from 'react-weui';
import { connect } from 'react-redux';
import { createStore,bindActionCreators } from 'redux';
import {mycollectAction} from '../redux/action/collect.js';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/collect.css");
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
  static propTypes = {
    collects:PropTypes.object,
    mycollectAction:PropTypes.func
  }
  constructor(props,context){
    super(props,context)
    this.state = {
      border:["书签","手册","帖子"],
      tab:0,
      val:'',
      style:"none",
      hint:false,
      tag:"all"
    }
  }
  componentDidMount(){
    let width = window.screen.width+"px";
      $(".a").css("width",width)
      $(".react-weui-infiniteloader__content").css("width",width)
      var obox = document.getElementById("collect");
    let that = this;
    this.props.mycollectAction({username:"yang6"})
    //document.oncontextmenu =  function(ev){
     // ev.preventDefault();  
     // var e = ev||window.event;
     // var x = e.clientX;
     // var y = e.clientY;
     // obox.style.cssText = "display:block;top:"+y+"px;left:"+x+"px;";
     // return false;
    //};
    /*点击空白处隐藏*/
    document.onclick = function(){
        obox.style.display = "none";
    };
      
  }
  saveValue = (e) => {
    this.setState({
      val:e.target.value,
      hint:true
    })
  }
  checkVal = (res) => {
    this.setState({
      tag:res
    })
  }
  changeTab =(res) => {
    console.log(res)
    this.setState({
        tab:res.tab
    })
  }
  contextMenu(ev,res){
    ev.preventDefault(); 
    var obox = document.getElementById("collect");
    var e = ev||window.event;
    var x = e.clientX;
    var y = e.clientY;
    obox.style.cssText = "display:block;top:"+y+"px;left:"+x+"px;";
    alert(JSON.stringify(res))
    return false;
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
    let display = this.state.style;
    const {collects} = this.props;
    console.log(collects)
    let topic = [];
    let book = [];
    if(collects.mycollect.data!==null&&collects.mycollect.data.result=="success"){
      topic = collects.mycollect.data.message.topics;
      book = collects.mycollect.data.message.books;
    }
    return (
      <Page className="collect">
        <div id="collect" >删除</div>
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
                  <label type="button" className="btn tag" className={this.state.tag=='page' ? "btn tag" : "btn"} onClick={() => this.checkVal("page")}
                  >搜本页</label>
                  <label className="btn" className={this.state.tag=='all' ? "btn tag" : "btn"} onClick={() => this.checkVal("all")}>添加</label>
                </div>
                <div className="hint" id="hint" style={{display:this.state.hint ? "block" : "none"}} >
                  <ul >
                    <li>dsfd</li>
                    <li>fdsgafg</li>
                  </ul>
                </div>
              </div>
            </div>
          <TabBar className="changeType">
            <TabBarItem
                active={this.state.tab == 0}
                onClick={() => this.changeTab({tab:0})}
                label="主题"
            />
            <TabBarItem 
              active={this.state.tab == 1} 
              onClick={() => this.changeTab({tab:1})}
              label="手册"
            />
            <TabBarItem
                active={this.state.tab == 2}
                onClick={() => this.changeTab({tab:2})}
                label="帖子"
            />
          </TabBar>
          <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
            <section>
              <Cells>
                {
                  topic.map(function(item,index){
                  let key = item.result.book_keysjson;
                  console.log(key)
                    return (
                      <Cell href="javascript:;" access key={index} onContextMenu={(e) => this.contextMenu(e,item)}>
                        <CellBody>
                          <h3>{item.result.title}</h3>
                          <span>{key.base+" | "+key.product+" | "+key.type}</span>
                        </CellBody>
                        <CellFooter>
                        </CellFooter>
                      </Cell>
                    )
                  })
                }
              </Cells>
            </section>
          </Article>
          <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
             <section>
              <Cells>
                {
                  book.map(function(item,index){
                  let key = item.book_keysjson;
                    return (
                      <Cell href="javascript:;" access key={index}>
                        <CellBody>
                          <h3>{item.bookname}</h3>
                          <span>{key.base+" | "+key.product+" | "+key.type}</span>
                        </CellBody>
                        <CellFooter>
                        </CellFooter>
                      </Cell>
                    )
                  })
                }
              </Cells>
            </section>
          </Article>
                    
          </TabBody>
            <TabBar className="footer">
              <TabBarItem
                  icon={<i className="iconfont icon-collect" style={{color:"#ff9900"}}>&#xe616;</i>}
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
          <div className="holder">
               <section>
                <nav role="navigation">
                  <ul className="cd-pagination">
                    <li className="s" onClick={() =>this.pageChange(this,1)}>首页</li>
                    <li className="button1" onClick={() => this.pageChange(this,"pre")}>上页</li>
                    
                    <li className="button2" onClick={() => this.pageChange(this,"next")}>下页</li>
                    <li className="e" onClick={() => this.pageChange(this,max)}>尾页</li>
                  </ul>
                </nav> 
              </section>
            </div>
        </Tab>
      </Page>
    )
  }
}
Collect.contextTypes={
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    collects:state.collects
  }
}

export default connect(mapStateToProps,{
  mycollectAction
})(Collect)