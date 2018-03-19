import React, { Component,PropTypes } from 'react';
import { createStore,bindActionCreators } from 'redux';
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
    FlexItem,
    Toast   
} from "react-weui";
import { connect } from 'react-redux';
import WeUI from 'react-weui';
var wx = require("weixin-js-sdk");
//import styles
import 'weui';
require('jquery');
import { is } from 'immutable';
import Collect from './Collect.jsx';
import {comfirmFileAction,menuurlAction} from '../redux/action/fileSearch.js';
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/addfile.css");

class AddFile extends Component {
    static propTypes = {
        files:PropTypes.object,
        comfirmFileAction:PropTypes.func,
        menuurlAction:PropTypes.func
    }
    constructor(props,context){
        super(props,context)
        this.state = {
            book:{},
            showToast:false,
            message:"",
            user:{},
            title:""
        }
    }
    ajaxLoad(res){
        let that = this;
        let obj = {};
        $.ajax({
            url: res,
            data: null,
            type: "GET",
            async:false,
            contentType: "text/html",
            success: function (res) {
              let topicid = res.split("<body id=\"")[1];
              if(topicid){
                topicid = topicid.split("\">")[0];
              }
              let title = res.split("<title>")[1].split("</title>")[0];
              obj.title = title;
              obj.topicid = topicid;
            },
            error: function (res) {
                try{
                    throw new Error(res)
                }catch(e){
                    alert(e)
                }
            }
        });
        return obj
    }
    componentDidMount(){
        let message = JSON.parse(this.props.location.query.message);
        this.setState({
            book:message
        })
        console.log(message)
        const {files} = this.props;
        let framecont = document.getElementById("iframecontent");
        let doc = framecont.contentWindow;
        let that = this;
        console.log("ttttttttttttttttttttttttttttttttt")
        framecont.onload = function(e){
            doc.addEventListener('click',function(e){
                let topicid = framecont.contentWindow.document.body.getAttribute("id");
                e.cancelBubble = true;
                console.log(e)
                let a = framecont.contentWindow.document.body.querySelectorAll("a");
                let url = [];
                for(var i=0;i<a.length;i++){
                    url.push(a[i].href)
                }
                that.props.menuurlAction(url);
                e.preventDefault();
                let hrefs;
                let title;
                let obj ={};
                let filename;
                if(e.target.children[0]){
                    hrefs = e.target.children[0].href;
                    filename = e.target.children[0].text;
                    title = e.target.children[0].innerText;
                }else{
                    hrefs = e.target.href;
                    filename = e.target.filename;
                    title = e.target.innerText;
                }
                obj = that.ajaxLoad(hrefs);
                title = title.replace(/”/,"\"");
                document.title = title;
                if(hrefs!==""){
                    let data = {
                        href:hrefs,
                        bookid:message.bookid,
                        filename:filename,
                        title:obj.title,
                        topicid:obj.topicid,
                        bookname:that.state.book.bookname,
                        message:JSON.stringify(message),
                        _id:"eeeeeeeeeeeeeeee"
                    }
                    let path = {
                        pathname:'iframe',
                        query:data
                    }
                    console.log(hrefs)
                    if(hrefs){
                        hashHistory.push(path);
                    }
                }
              
                //title = title.replace(/”/,"\"");
                
            },false)  
        }
    }
    showToast() {
        this.setState({showToast: true});

        this.state.toastTimer = setTimeout(()=> {
            this.setState({showToast: false});
        }, 1000);
    }
    componentWillUnmount(){
        if(sessionStorage.user){
            this.setState({
                user:JSON.parse(sessionStorage.user)
            })
        }else{
            let url = window.location.href;
            url = url.split("view")[0]+"view/prop.html";
            //window.location.href=url;
        }
        this.props.files.comfirmfile.data = null;
        window.clearTimeout(this.state.toastTimer)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.files.comfirmfile.data!==null&&nextProps.files.comfirmfile.data.result&&nextProps.files.comfirmfile.data.result == "success"){
            this.setState({
                message:"收藏成功！"
            })
            this.showToast()
        }else if(nextProps.files.comfirmfile.data!==null&&nextProps.files.comfirmfile.data.result&&nextProps.files.comfirmfile.data.result == "faild"){
            this.setState({
                message:"收藏失败！"
            })
            this.showToast()
        }
    }
    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
       const thisProps = this.props || {}, thisState = this.state || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }
      return false;
    }
    comfirAdd=()=>{
        console.log(this.state.book);
        let book = this.state.book;
        let obj ={
            username:"yang1",
            bookid:book.bookid,
            bookname:book.bookname,
            book_keysjson:book.book_keysjson,
            status:true,
            bookUrl:this.props.location.query.href,
            ifsecrecy:book.outputclass == "公开" ? true : false
        }
        this.props.comfirmFileAction(obj)
    }
    render(){
        const {files} = this.props;
        let height = window.innerHeight + "px";
        let url = this.props.location.query.href;

        return (
            <Page className="addfile">
                <Toast icon="success-no-circle" show={this.state.showToast}>{this.state.message}</Toast>
                <iframe src={this.props.location.query.href} style={{height:height,overFlow:'auto'}} id="iframecontent"></iframe>
                <div className="add" onClick={() =>this.comfirAdd()}>收藏至"手册"</div>
            </Page>
        )
    }
}

function mapStateToProps(state) {
  return {
    files:state.files
  }
}

export default connect(mapStateToProps,{
    comfirmFileAction,
    menuurlAction
})(AddFile)
