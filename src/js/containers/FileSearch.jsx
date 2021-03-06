import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/fileSearch.css");
import { is } from 'immutable';
let Iconsearch = require("../../img/search.png");
let Iconar = require("../../img/ar.png");
let Iconman = require("../../img/nman.png");
let Iconcn = require("../../img/collectno.png");
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
    SearchBar,
    FlexItem   
} from "react-weui";
import Accordion from './accordion.js';
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
var jQuery = require('jquery');
import {findFileAction,addFileAction,saveTabAction,filterAction,brandAction,saveAction,bookAction} from "../redux/action/fileSearch.js";
import Collect from './Collect.jsx';


class FileSearch extends Component {
  static propTypes = {
    files:PropTypes.object,
    findFileAction:PropTypes.func,
    addFileAction:PropTypes.func,
    filterAction:PropTypes.func,
    brandAction:PropTypes.func,
    saveAction:PropTypes.func,
    bookAction:PropTypes.func
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
        tag:'page',
        page:1,
        brand:[],
        product:[],
        type:[],
        user:{},
        typ:"",
        addFile:{
        }
        
    };
  }
  componentDidMount(){
   let flag = false;
    if(sessionStorage.user){
      this.setState({
        user:JSON.parse(sessionStorage.user)
      })
      let user = JSON.parse(sessionStorage.user);

      if(typeof(user.q)!=="undefined"){
        let q = decodeURI(user.q);
        flag = true;
        this.setState({
          val:q,
          page:1,
          typ:"",
          search:true
        });
        let o = {
          q:q,
          page:1,
          type:""
        }
        this.props.findFileAction(o);
        delete user.q;
        sessionStorage.user = JSON.stringify(user);
      }
    }else{
      let url = window.location.href;
      url = url.split("view")[0]+"view/prop.html";
      //window.location.href=url;
    }
    document.title = "维宏云"; 
    var menubox = document.getElementById("file");
    this.props.brandAction();
    let that = this;
    this.props.bookAction();
    const { files } = this.props;
    //离开页面时记住页面的数据；
    if(files.save.data!==null){
      this.setState({
        search:true,
        val:files.save.data.val,
        page:files.save.data.page,
        typ:files.save.data.type
      });
      if(files.save.data.type=="doc"){
      //保存是筛选的数据
        let obj = {
          q:files.save.data.val,
          page:files.save.data.page,
          type:"doc",
          filterWorld:files.save.data.filter
        };
        this.setState({
          type:files.save.data.filter.Type,
          brand:files.save.data.filter.base,
          product:files.save.data.filter.product
        });
        this.props.filterAction(obj);
      } else {
      //保存搜索的结果
        let o = {
          q:files.save.data.val,
          page:files.save.data.page,
          type:""
        }
        this.props.findFileAction(o);
      }
    } else if(flag){
      this.setState({
        search:true
      })
    }else {
    //如果没有保存数据
      this.setState({
        search:false
      })
    }
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
    //当input框值为空将保存的值设置为空
      this.setState({
        search:false
      });
      this.props.files.save.data = null
    }
  }
  closePop = () => {
    this.setState({fullpage_show: false})
  }
  openPop = () => {
    this.setState({fullpage_show: true})
  }
  shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
     
    return true;
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
    let that = this;
    
  }
  hide(){
    this.setState({
      bottom_show: false,
      fullpage_show: false,
    })
  }
  //进入分享页面并保存数据
  goiframe = (obj) => {
    let data = {
      href:obj.url,
      bookname:obj.bookname,
      bookid:obj.bookid,
      topicid:obj.topicid,
      title:obj.title.replace(/”/,"\""),
      message:JSON.stringify(obj)
    }
    let o = {};
    if(this.state.typ=="doc"){
      o.val = this.state.val;
      o.page = this.state.page;
      o.type = "doc";
      o.filter = {
        Type:this.state.type,
        base:this.state.brand,
        product:this.state.product
      }
    } else {
      o.val = this.state.val;
      o.page = this.state.page;
      o.type = ""; 
    }
    this.props.saveAction(o);
    let path = {
      pathname:"iframe",
      query:data
    }
    hashHistory.push(path)
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
  //筛选按钮
  finish(res){
    if(res.class=="重置"){
      this.setState({
        brand:[],
        product:[],
        type:[]
      })
    } else if(res.class=="完成"){
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
      this.setState({
        typ:"doc",
        page:1,
        fullpage_show: false,
      });
      if(this.state.val!==""){
        this.props.filterAction(obj);
      }
    }
    this.setState({
      class:res.class
    })
  }
  //选择搜索和筛选
  checkVal=(res) => {
    if(this.state.val!==""){
      if(res=="all"){
        this.setState({fullpage_show: true});
      }else{
        this.setState({
          typ:"",
          page:1
        });
        this.props.findFileAction({q:this.state.val,page:1,type:""})
      }
      this.setState({
        search:true,
        tag:res,
        hint:false
      })
    }
  }
  //筛选的复选框
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
  //进入目录页面
  inaddFile = res => {
    let data = {
      href:res.bookUrl,
      message:JSON.stringify(res)
    }
    let o = {};
    if(this.state.typ=="doc"){
      o.val = this.state.val;
      o.page = this.state.page;
      o.type = "doc";
      o.filter = {
        Type:this.state.type,
        base:this.state.brand,
        product:this.state.product
      }
    } else {
      o.val = this.state.val;
      o.page = this.state.page;
      o.type = ""; 
    }
    this.props.saveAction(o);
    let path = {
      pathname:"addfile",
      query:data
    }
    hashHistory.push(path)
  }
  //自定义菜单栏
  contextMenus = (ev,res) => {
    ev.preventDefault(); 
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
  allbook = res => {
    this.setState({
      val:res,
      typ:"",
      page:1,
      tab:1,
      search:true,
      tag:"page"
    });
    this.props.findFileAction({
      q:res,
      page:1,
      type:""
    })
  }
  //分页
  pageChange(res){
    this.setState({
      page:res
    })
    let o = {};
    if(this.state.typ == "doc"){
      o.q = this.state.val;
      o.page = res;
      o.type = "doc";
      o.filterWorld ={
        Type:this.state.type,
        base:this.state.brand,
        product:this.state.product
      }
      this.props.filterAction(o);
    } else {
      this.props.findFileAction({q:this.state.val,page:res,type:""})
    }
  }
  render() {
    let display = this.state.style;
    const { files } = this.props;
    let page;
    let book = [];
    let hbook = [];
    let all = [];
    console.log(this.state.search)
    if(files.books.data!==null&&files.books.data.result){
      all = [...files.books.data.message[0].product,...files.books.data.message[0].type];
    }
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
    <div className="searchs">
      <div id="file" onClick={() => {this.toAddfile()}}>添加至"手册"</div>
      <Tab>
        <section>
              <div style={{display:this.state.fullpage_show ? "block" : "none"}} className="popup">
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
              </section>
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
                <i className="iconfont icondel" style={{display:this.state.val=="" ? "none" : "block"}} onClick={() => this.setState({val:"",search:false})}>&#xe638;</i>
              </div>
              <div className="search-btn">
                <label type="button" className={this.state.tag=='page' ? "btn tag" : "btn"} onClick={() => this.checkVal("page")}
                >搜索</label>
                <label className={this.state.tag=='all' ? "btn tag" : "btn"} onClick={() => this.checkVal("all")} style={{background:this.state.tag=='all' ? "#ff9900" : "#eee"}}>筛选</label>
              </div>
            </div>
          </div>
          <Article style={{display:this.state.search ? "none" : "block"}}>
            <div className="o">猜你喜欢</div>
            <section>
              <Cells>
                {
                  all.map(function(item,index){
                    return (
                      <Cell href="javascript:;" access onClick={() => {this.allbook(item)}} key={index} >
                        <CellBody>
                          <h3>{item}</h3>
                        </CellBody>
                      </Cell>
                    )
                  },this)
                }
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
                      <Cell href="javascript:;" access onClick={() => {this.goiframe(item)}} key={index} >
                        <CellBody>
                          <h3>{item.title}</h3>
                          <div>{item.body.slice(0,40)}</div>
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
                      <Cell key={index} href="javascript:;" access onContextMenu={(e) => this.contextMenus(e,item)} value={item} onClick={() => this.inaddFile(item)} >
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
        </TabBody>
        <div className="holder" style={{display:display,zIndex:"1"}}>
          <nav role="navigation">
            <ul className="cd-pagination">
              <li className="s" onClick={() =>this.pageChange(1)}>首页</li>
              <li className="button1" onClick={() => this.pageChange(this.state.page-1>0 ? this.state.page-1 : 1)}>上页</li>
              
              <li className="button2" onClick={() => this.pageChange(this.state.page+1<=page ? this.state.page+1 : page)}>下页</li>
              <li className="e" onClick={() => this.pageChange(page)}>尾页</li>
            </ul>
          </nav> 
          </div>
        <TabBar className="footer" >
          <TabBarItem
            onClick={() =>this.context.router.push("collect")}
          >
            <TabBarIcon>
              <img src={Iconcn}/>
            </TabBarIcon>
            <TabBarLabel>我的收藏</TabBarLabel>
          </TabBarItem>
          <TabBarItem >
            <TabBarIcon>
              <img src={Iconsearch}/>
            </TabBarIcon>
            <TabBarLabel>帮助文档</TabBarLabel>
          </TabBarItem>
          <TabBarItem>
            <TabBarIcon>
              <img src={Iconar}/>
            </TabBarIcon>
            <TabBarLabel>扫码求助</TabBarLabel>
          </TabBarItem>
          <TabBarItem style={{background:"#eee",color:"#eee",display:"none"}}>
            <TabBarIcon>
              <img src={Iconman}/>
            </TabBarIcon>
            <TabBarLabel style={{color:"#eee"}}>用户社区</TabBarLabel>
          </TabBarItem>
        </TabBar>
      </Tab>

    </div>
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
  brandAction,
  saveAction,
  bookAction
})(FileSearch)