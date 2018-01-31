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
require("../../css/addfile.css");

class AddFile extends Component {
    constructor(props,context){
        super(props,context)
    }
    render(){
        return (
            <Page className="addfile">
                <div className="title">Ncstudio 编程手册</div>
                <iframe ></iframe>
                <div className="add">收藏至"手册"</div>
            </Page>
        )
    }
}

export default AddFile