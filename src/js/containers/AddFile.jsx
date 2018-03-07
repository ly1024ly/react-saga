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
            message:""
        }
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
                let a = framecont.contentWindow.document.body.querySelectorAll("a");
                let url = [];
                for(var i=0;i<a.length;i++){
                    url.push(a[i].href)
                }
                that.props.menuurlAction(url);
                e.preventDefault();
                let hrefs;
                let title;
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
                document.title = title;
                if(hrefs!==""){
                    let data = {
                        href:hrefs,
                        bookid:topicid,
                        filename:filename,
                        title:title,
                        message:JSON.stringify(message),
                        _id:"eeeeeeeeeeeeeeee"
                    }
                    let path = {
                        pathname:'iframe',
                        query:data
                    }

                    if(hrefs){
                        hashHistory.push(path);
                    }
                }
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
    comfirAdd=()=>{
        console.log(this.state.book);
        let book = this.state.book;
        let obj ={
            username:"yang4",
            bookid:book.bookid,
            bookname:book.bookname,
            book_keysjson:book.book_keysjson,
            status:true,
            ifsecrecy:book.outputclass == "公开" ? true : false
        }
        this.props.comfirmFileAction(obj)
    }
    render(){
        const {files} = this.props;
        let height = window.innerHeight - 90 + "px";
        let url = this.props.location.query.href;

        return (
            <Page className="addfile">
                <Toast icon="success-no-circle" show={this.state.showToast}>{this.state.message}</Toast>
                <div className="title">Ncstudio 编程手册</div>
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
