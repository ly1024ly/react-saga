import React, { Component,PropTypes } from 'react';
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
import {findFileAction,addFileAction,saveTabAction,filterAction,brandAction} from "../redux/action/fileSearch.js";
import Collect from './Collect.jsx';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/fileSearch.css");



class FileSearch extends Component {
  static propTypes = {
    files:PropTypes.object,
    findFileAction:PropTypes.func,
    addFileAction:PropTypes.func,
    filterAction:PropTypes.func,
    brandAction:PropTypes.func
  }
  constructor(props,context){
    super(props,context)
    this.state = {
        bottom_show: false,
        fullpage_show: false,
        class:"完成",
        val:'',
        tab:0,
        hint:false,
        search:false,
        touchTime:0,
        tag:'all',
        page:1,
        brand:[],
        product:[],
        type:[],
        addFile:{
          bookid:"id17BRF0V03GB",
          ifsecrecy:"公开",
          username:"yang6",
          bookname:"维宏百问",
          status:true,  
          audience:"通用",
          book_keysjson:{
              base:"维宏",
              product:"通用",
              type:"故障排查手册"
          },
          deliveryTarget:"wh"
        }
        
    };
  }
  componentDidMount(){
    document.body.addEventListener("touchstart",this.touchstart)
    document.body.addEventListener("touchmove",this.touchmove)
    document.body.addEventListener("touchend",this.touchend)
    var menubox = document.getElementById("file");
    this.props.brandAction();
    let that = this;
  //**********************text************************************
  //window.document.oncontextmenu =  function(ev){
      //var e = ev||window.event;
      //var x = e.clientX;
      //var y = e.clientY;
      //obox.style.cssText = "display:block;top:"+y+"px;left:"+x+"px;";
      //let obj = {
       // bookid:"id17BRF0V03GB",
       // bookname:"维宏百问"
      //}
      //that.setState({
        //search:true
      //})
      //that.props.addFileAction(obj);
      //return false;
   // };
  //***********************************************************
    /*点击空白处隐藏*/
    document.onclick = function(){
        menubox.style.display = "none";
    };
  }
  saveValue = e => {
    this.setState({
      val:e.target.value,
      hint:true
    })
    if(e.target.value==""){
      this.setState({
        search:false
      })
    }
  }
  closePop = () => {
    this.setState({fullpage_show: false})
  }
  openPop = () => {
    this.setState({fullpage_show: true})
  }
  touchmove = e => {
    e.stopPropagation();
    let clientx = e.changedTouches[0].clientX;
    if(clientx+30<this.state.clientx){
      this.setState({fullpage_show: true})
    }
  }
  touchstart = e => {
    this.setState({
      clientx:e.targetTouches[0].clientX,
      clienty:e.targetTouches[0].clientY
    })
    let that = this;
    this.inter = setInterval(that.interval(e.changedTouches[0].clientX,e.changedTouches[0].clientY),1000)
  }
  interval = (x,y) => {
    let time = this.state.touchTime;
    this.setState({
      touchTime:time + 1
    })
    if(this.state.touchTime>=3){

      clearInterval(this.inter)
    }
  }
  touchend = e =>{
    e.stopPropagation();
    this.setState({
      touchTime:0
    })
    clearInterval(this.inter)
  }
  componentWillMount(){
    const { files } = this.props;
    let tab = 0;
    if(files.savetab&&files.savetab.data!==null){
      tab = files.savetab.data;
    }
    if(files.addfile!==null){
      this.setState({
        search:true,
        tab:tab
      })
    }
  }
  componentWillUnmount(){
    document.body.removeEventListener('touchstart',this.touchstart);
    document.body.removeEventListener('touchmove',this.touchmove);
    document.body.removeEventListener('touchend',this.touchend);
    
  }
  hide(){
    this.setState({
      bottom_show: false,
      fullpage_show: false,
    })
  }
  goiframe = (obj) => {
    let data = {
      href:obj.url
    }
    let path = {
      pathname:"iframe",
      query:data
    }
    //hashHistory.push(path)
  }
  toAddfile = () => {
    const { files } = this.props;
    if(files.addfile&&files.addfile.data.result == "success"){
      this.props.saveTabAction(this.state.tab)
      let data = {
        href:files.addfile.data.message,
        message:JSON.stringify(this.state.addFile)
      }
      let path = {
        pathname:"addfile",
        query:data
      }
      hashHistory.push(path)
    }
  }
  componentDidUpdate(){
    
  }
  changeTab =(res) => {
    this.setState({
        tab:res.tab
    })
  }
  finish(res){
    if(res.class=="重置"){

      this.setState({
        brand:[],
        product:[],
        type:[]
      })
    } else if(res.class=="完成"){
      this.setState({
        fullpage_show: false,
      })
    }
    this.setState({
        class:res.class
    })
  }
  checkVal=(res) => {
    if(res=="all"){
    console.log(res)
      let obj = {
        q:this.state.val,
        page:1,
        type:"doc",
        filterWorld:{
          Type:this.state.type,
          product:this.state.product,
          base:this.state.brand
        }
      }
      this.props.filterAction(obj)
    }else{
      this.props.findFileAction({q:this.state.val,page:1,type:""})
      this.setState({
        search:true,
        tag:res,
        hint:false
      })
    }
  }
  choosePro = res => {
    let arr = this.state.product;
    let re = arr.find((val) => {
      return val==res
    })
    if(re){

    }else{
      arr.push(res);
    }
    this.setState({
      product:arr
    })
  }
  chooseBrand(res){
    let arr = this.state.brand;
    let re = arr.find((val) => {
      return val==res
    })
    if(re){

    }else{
      arr.push(res);
    }
    this.setState({
      brand:arr
    })
  }
  chooseType = res => {
    let arr = this.state.type;
    let re = arr.find((val) => {
      return val==res
    })
    if(re){

    }else{
      arr.push(res);
    }
    this.setState({
      type:arr
    })
  }
  contextMenus = (ev,res) => {
    ev.preventDefault(); 
    console.log(ev)
    var menubox = document.getElementById("file");
    var e = ev||window.event;
    var x = e.clientX;
    var y = e.clientY;
    menubox.style.cssText = "display:block;top:"+y+"px;left:"+x+"px;";
    this.setState({
      addFile:res
    })
    let obj = {
      bookid:res.bookid,
      bookname:res.bookname
    }
    this.props.addFileAction(obj);
    return false;
  }

  pageChange(res){
    this.setState({
      page:res
    })
    this.props.findFileAction({q:this.state.val,page:res,type:""})
  }
  render() {
    let display = this.state.style;
    const { files } = this.props;
    let page;
    let book = [];
    let hbook = [];
    console.log(files)
    if(files.fileList&&files.fileList.data!==null&&files.fileList.data.result){
      page = files.fileList.data.message.Maxpage;
      //手册
      hbook = files.fileList.data.message.bookMsg;
      //主题
      book = files.fileList.data.message.objArray;
    }

    let brand = [];
    let product = [];
    let type = [];
    if(files.brand.data!==null&&files.brand.data.result=="success"){
      brand = files.brand.data.message[0].base;
      product = files.brand.data.message[0].product;
      type = files.brand.data.message[0].type;
    }
    return (
    <Page className="searchs">
      <div id="file" onClick={() => {this.toAddfile()}}>添加至"手册"</div>
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
                <label type="button" className={this.state.tag=='page' ? "btn tag" : "btn"} onClick={() => this.checkVal("page")}
                >搜索</label>
                <label className={this.state.tag=='all' ? "btn tag" : "btn"} onClick={() => this.checkVal("all")}>筛选</label>
              </div>
              <div className="hint" id="hint" style={{display:this.state.hint ? "block" : "none"}} >
                <ul >
                  <li>dsfd</li>
                  <li>fdsgafg</li>
                </ul>
              </div>
            </div>
          </div>
          <Article style={{display:this.state.search ? "none" : "block"}}>
            <div className="o">猜你喜欢</div>
            <section>
              <Cells>
                <Cell href="javascript:;" access onClick={() => this.goiframe()} >
                  <CellBody>
                    <div>进给速度</div>
                    <span>dsfaa</span>
                  </CellBody>
                </Cell>
                <Cell access >
                  <CellBody>
                    <div>主周</div>
                    <span>dsfaa</span>
                  </CellBody>
                </Cell>
              </Cells>
            </section>
          </Article>  
          <Article style={{display:this.state.search ? "block" :"none"}} className="ss">
            <TabBar className="whichType">
              <TabBarItem
                  active={this.state.tab == 0}
                  onClick={() =>this.changeTab({tab:0})}
                  label="主题"
              />
              <TabBarItem 
                active={this.state.tab == 1} 
                onClick={() =>this.changeTab({tab:1})}
                label="手册"
              />
              <TabBarItem
                 
                  
                 
              />
            </TabBar>
          <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
            <section>
              <Cells>
              {
                book ? book.map(function(item,index){
                  let key = item.book_keysjson;
                  return (
                    <Cell href="javascript:;" access onClick={() => {this.goiframe(item)}} key={index} onContextMenu={(e) => this.contextMenus(e,item)}>
                      <CellBody>
                        <h3>{item.title}</h3>
                        <div>{item.body.slice(0,20)}</div>
                        <span>{key.base+" | "+key.product+" | "+key.type}</span>
                      </CellBody>
                      <CellFooter>
                      </CellFooter>
                    </Cell>
                  )
                },this) : ""
              }
              </Cells>
            </section>
          </Article>
          <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
             <section>
              <Cells>
              {
                hbook ? hbook.map(function(item,index){
                  let key = item.book_keysjson;
                  return (
                    <Cell key={index} href="javascript:;" access onContextMenu={(e) => this.contextMenus(e,item)} value={item}>
                      <CellBody >
                        <h3>{item.bookname}</h3>
                        {item.outputclass=="私密" ? <span className="secret">密</span> : ""}
                        <span>{key.base+" | "+key.product+" | "+key.type}</span>
                      </CellBody>
                      <CellFooter>
                      </CellFooter>
                    </Cell>
                  )
                },this) : ""
              }
              </Cells>
            </section>
          </Article>
          </Article>
              <div style = {{display:this.state.fullpage_show?"block":"none"}} className="popup">
                  <div className="close" onClick={()=>this.closePop()}></div>
                  <div className="select">
                    <div className="hide"><i className="iconfont" onClick={()=>this.closePop()}>&#xe638;</i></div>
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
                                {
                                  brand.map(function(item,index){
                                    let className = this.state.brand.find(val => {
                                      return val == item
                                    });
                                    if(className) {
                                      className = "choose";
                                    }
                                    let choose = {
                                      border:"1px solid #ff9900",
                                      background: "#fff3e8"
                                    }
                                    choose = className ? choose : {};
                                    return (
                                      <FlexItem key={index} >
                                        <div className="placeholder" style={choose} onClick={() => this.chooseBrand(item)}>{item}</div>
                                      </FlexItem>
                                    )
                                  },this)
                                }
                              </Flex>
                          </div>                                                                          
                            </Accordion>
                        </li>
                        <li >
                            <Accordion
                                header={
                                  <Flex className="li">
                                    <FlexItem component="p">
                                        产品
                                    </FlexItem>
                                    <i className="iconfont" >&#xe600;</i>
                                  </Flex>
                                }
                            >
                            <div className="uu">
                            <Flex>
                              {
                                product.map((item,index) => {
                                  let className = this.state.product.find(val => {
                                      return val == item
                                    });
                                    if(className) {
                                      className = "choose";
                                    }
                                    let choose = {
                                      border:"1px solid #ff9900",
                                      background: "#fff3e8"
                                    }
                                    choose = className ? choose : {};
                                  return (
                                    <FlexItem key={index}>
                                      <div className="placeholder" style={choose} onClick={() => this.choosePro(item)}>{item}</div>
                                    </FlexItem>
                                  )
                                },this)
                              }
                            </Flex>
                          </div>                                                                          
                            </Accordion>
                        </li>   
                        <li >
                            <Accordion
                                header={
                                  <Flex className="li">
                                    <FlexItem component="p">
                                        手册类型
                                    </FlexItem>
                                    <i className="iconfont" >&#xe600;</i>
                                  </Flex>
                                }
                            >
                            <div className="uu">
                            <Flex>
                                {
                                  type.map((item,index) => {
                                    let className = this.state.type.find(val => {
                                      return val == item
                                    });
                                    if(className) {
                                      className = "choose";
                                    }
                                    let choose = {
                                      border:"1px solid #ff9900",
                                      background: "#fff3e8"
                                    }
                                    choose = className ? choose : {};
                                    return (
                                      <FlexItem key={index}>
                                        <div className="placeholder" style={choose} onClick={() => {this.chooseType(item)}}>{item}</div>
                                      </FlexItem>
                                    )
                                  })
                                }
                            </Flex>
                          </div>                                                                          
                            </Accordion>
                        </li>                                        
                      </ul>
                    </div>
                    <div className="ok">
                      <div className={this.state.class=="重置" ? "press" :""} onClick={()=>{this.finish({class:"重置"})}}>重置
                      </div>
                      <div className={this.state.class=="完成" ? "press" :""} onClick={()=>{this.finish({class:"完成"})}}>完成
                      </div>
                    </div>
                  </div>
              </div>
        </TabBody>
        <div className="holder" style={{display:display}}>
             <section>
              <nav role="navigation">
                <ul className="cd-pagination">
                  <li className="s" onClick={() =>this.pageChange(1)}>首页</li>
                  <li className="button1" onClick={() => this.pageChange(this.state.page-1>=0 ? this.state.page-1 : 0)}>上页</li>
                  
                  <li className="button2" onClick={() => this.pageChange(this.state.page+1<=page ? this.state.page+1 : page)}>下页</li>
                  <li className="e" onClick={() => this.pageChange(page)}>尾页</li>
                </ul>
              </nav> 
            </section>
          </div>
        <TabBar className="footer">
          <TabBarItem
              icon={<i className="iconfont icon-collect" >&#xe616;</i>}
              label="我的收藏"
              onClick={() =>this.context.router.push("collect")}
          />
          <TabBarItem >
            <Link to="filesearch">
              <TabBarIcon>
               icon={<i className="iconfont icon-title" style={{color:"#ff9900"}}>&#xe656;</i>}  
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

function mapStateToProps(state) {
  return {
    files:state.files
  }
}


export default connect(mapStateToProps,{
  findFileAction,
  addFileAction,
  saveTabAction,
  filterAction,
  brandAction
})(FileSearch)