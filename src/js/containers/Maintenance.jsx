import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  hashHistory
} from 'react-router';
import { createStore,bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
require('jquery');
import 'react-weui/build/packages/react-weui.css';
require("../../font/iconfont.css");
require("../../css/common.css");
require("../../css/maintenance.css");
import {subAction,timeAction,wechatAction,imageAction,clearAction} from '../redux/action/maintenance.js';



class Maintenance extends Component{
  static propTypes = {
    subAction:PropTypes.func,
    timeAction:PropTypes.func,
    wechatAction:PropTypes.func,
    imageAction:PropTypes.func,
    clearAction:PropTypes.func
  }
  constructor(props,context){
    super(props,context)
    this.state={
      work:'木工',
      name:'',
      phone:'',
      time:'',
      componey:"",
      email:'',
      version:'',
      subscrib:'',
      click:false,
      user:'',
      hardwareMsg:'',
      factoryname:'',
      MaintainerName:'',
      MaintainerPhone:'',
      remark:'',
      imgArr:[],
      hash:""
    }
    this.context.router;
    this.changeWork = this.changeWork.bind(this)
  }
  componentDidUpdate(){
    
    $(".picker-button.close-picker").css('display','none');
    $(".weui-dialog__ft .weui-dialog__btn.primary").html("确定");
  }
  componentWillUnmount(){
    this.props.maintenance.submit={};
  }
  componentDidMount(){
    document.title = '维修申请';
    $(window).scrollTop(0);
    this.setState({
      hash:window.location.hash
    })
    let a = new Date();
    let error = this.props.params.error;
    this.setState({
      subscrib:error
    });
    let year = a.getFullYear().toString();
    let mon = (a.getMonth()+1).toString();
    let day = a.getDate().toString();
    let hour = a.getHours().toString();
    let min = a.getMinutes().toString();
    if(mon<=9){
      mon="0"+mon;
    }
    if(hour<=0){
      hour="0"+hour;
    }
    if(min<=9){
      min="0"+min;
    }
    if(day<=9){
      day="0"+day;
    }
    let date = year+"-"+mon+"-"+day+" "+hour+":"+min;
    this.props.timeAction(date);
    $(".toolbar").css("display","none");
    var that = this;
    if(sessionStorage.user){
      let user = JSON.parse(sessionStorage.user);
            this.setState({
                user:JSON.parse(sessionStorage.user),
                phone:user.phone,
                name:user.username
            })
        }else{
            let url = window.location.href;
            url = url.split("view")[0]+"view/prop.html";
            
        }
      this.props.wechatAction();
    
  }
  changeWork(e){
    this.setState({
      work:e.target.value
    })
  }
  name(e){
    this.setState({
      name:$.trim(e.target.value)
    })
  }
  phoneChange(e){
    this.setState({
      phone:$.trim(e.target.value)
    })
    
  }
  componeyChange(e){
    this.setState({
      componey:$.trim(e.target.value)
    })      
  }
  email(e){
    
    this.setState({
      email:$.trim(e.target.value)
    })
    
      
  }
  version(e){
    this.setState({
      version:$.trim(e.target.value)
    })      
  }
  subscrib(e){
    this.setState({
      subscrib:$.trim(e.target.value)
    })  
  }
  factoryname(e){
    this.setState({
      factoryname:$.trim(e.target.value)
    })
  }
  hardwareMsg(e){
    this.setState({
      hardwareMsg:$.trim(e.target.value)
    })
  }
  MaintainerName(e){
    this.setState({
      MaintainerName:$.trim(e.target.value)
    })
  }
  MaintainerPhone(e){
    this.setState({
      MaintainerPhone:$.trim(e.target.value)
    })
  }
  remark(e){
    this.setState({
      remark:$.trim(e.target.value)
    })
  }
  
  submit(){
    console.log(this.state.imgArr);
    const mobile = /^1[34578]\d{9}$/;
    $("#warn").css('display','none');
    const reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(!mobile.test(this.state.phone)){
      this.setState({
        phone:''
      })
    }
    if(!reg.test(this.state.email)){
      this.setState({
        email:''
      })
    }
    this.setState({
      click:true
    })
    if(this.state.email!==""&&this.state.subscrib!==""&&this.state.company!==""&&this.state.work!==""&&this.state.version!==""){
      let obj = {};
      obj.names = this.state.name;
      obj.phone = this.state.phone;
      obj.time = this.props.maintenance.time;
      obj.company = this.state.componey;
      obj.email = this.state.email;
      obj.factoryname = this.state.factoryname;
      obj.industry = this.state.work;
      obj.softversion = this.state.version;
      obj.hardwareMsg = this.state.hardwareMsg;
      obj.description = this.state.subscrib;
      obj.MaintainerName = this.state.MaintainerName;
      obj.MaintainerPhone = this.state.MaintainerPhone;
      obj.remark = this.state.remark;
      obj.imgage = this.state.imgArr;
      this.props.subAction(obj);
      $(".weui-loadmore").css("display","block");
      $(".load").css("display","block");
    }else{

    }
  }
  
  uploadChange(event){
    var that = this;
    let imgArr = [];
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];  
      // 1024KB，也就是 1MB  
      var maxSize = 2048 * 2048;  
      // 图片最大宽度  
      var maxWidth = 100000;  
      // 最大上传图片数量  
      var maxCount = 6;  
      var files = event.target.files; 
      // 如果没有选中文件，直接返回  
        if (files.length === 0) {  
          return;  
        } 
        //$("#warn").css('display','inline-block'); 
        var reader = new FileReader();  
        for (var i = 0, len = files.length; i < len; i++) {  
          console.log("2");
            var file = files[i];  
        
          // 如果类型不在允许的类型范围内  
          if (allowTypes.indexOf(file.type) === -1) {  
              $.alert("该类型不允许上传！", "警告！");              
              continue;  
          }  
          if (file.size > maxSize) {  
            $.alert({text: '图片太大，不允许上传'});
              $.alert("图片太大，不允许上传", "警告！");              
              continue;  
          }  
            if ($('.weui-uploader__file').length >= maxCount) {  
              $.alert({text: '最多只能上传' + maxCount + '张图片'});  
              $(".weui-uploader__input-box").css("display","none");
              $("#warn").css("display","none");
              return;  
            }  
            reader.readAsDataURL(file); 
            reader.onloadstart = function(){
              $("#warn").css("display","inline-block");
              $("#warn").text("图片上传中...");
            }

            reader.onload = function (e) {
                var img = new Image(); 
                img.src = e.target.result;   
                img.onload = function () {  
                    // 不要超出最大宽度  
                    var w = Math.min(maxWidth, img.width);  
                    // 高度按比例计算  
                    var h = img.height * (w / img.width);  
                    var canvas = document.createElement('canvas');  
                    var ctx = canvas.getContext('2d');  
                    // 设置 canvas 的宽度和高度  
                    canvas.width = w;  
                    canvas.height = h;  
                    ctx.drawImage(img, 0, 0, w, h); 
                    // 插入到预览区  
                    var $preview = $('<li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(' + img.src + ')" ><div class="weui-uploader__file-content"></div></li>');  
                    $('#uploaderFiles').append($preview);  
                    var num = $('.weui-uploader__file').length; 
                    $('.weui-uploader__info').text(num / maxCount); 
                  var formData = new FormData();
                    formData.append("whimg", file);
                $.ajax({
                  //url:"http://172.16.11.70:3008/search/saveimg?",
                  url:"https://nccloud.weihong.com.cn/nccloudOLhelp/search/saveimg?",
                  type:"POST",
                  data:formData,
                  contentType:false,
                            processData:false,
                            dataType:"JSON",
                  success:function(msg){
                    console.log(msg)
                    if(msg.result=="success"){
                      let imgArr = that.state.imgArr;
                      let obj = {};
                      obj.filename = msg.message.filename;
                      obj.path = msg.message.path;
                      imgArr.push(obj);
                      that.setState({
                        imgArr:imgArr
                      });
                      $(".change").css('animation','myfirst '+ e.total+"ms");
                            $('head').append("<style>.weui-uploader__file_status::before{animation:myfirst "+1000+"ms;animation-fill-mode:forwards }</style>");
                            $("#warn").text("上传成功！");
                            setTimeout(function(){$("#warn").css("display","none")},1500)
                    }else{
                      $("ul li:last-child").remove();
                
                            $("#warn").text("上传失败！");
                            setTimeout(function(){$("#warn").css("display","none")},1500)
                    }

                  },
                  error:function(XMLHttpRequest, textStatus, errorThrown){
                    if(textStatus=="error"){
                      $("ul li:last-child").remove();
                            $("#warn").text("上传失败！");
                            
                    }
                  }

                })
                  };  
                      
                                    
                };

                    
            }  
  }
  render(){
    console.log(this.props.maintenance)
    if(this.props.maintenance.submit.result=="success"){
      $.alert(this.props.maintenance.submit.message);
      $(".weui-loadmore").css("display","none");
      $(".load").css("display","none");
      var that = this;
      $(".weui-dialog__btn.primary").on("click",function(){
        var str = that.state.hash.split("?")[1];
        console.log(str)
        if(str.indexOf("more=")>=0){
          
          window.location.href="https://nccloud.weihong.com.cn/nccloudmoreservice/server.html";
        }else{

          that.context.router.push("/")
        }
      })
    }else if(this.props.maintenance.submit.result=="fail"){
      $.alert(this.props.maintenance.submit.message);
      this.props.clearAction();
      $(".weui-loadmore").css("display","none");
      $(".load").css("display","none");
    }
    $(".weui-dialog__ft .weui-dialog__btn.primary").html("确定");
    $(".weui-dialog__btn.primary").text("确定");
            //初始化微信接口
    let wechat = this.props.maintenance.wechat;
        if (JSON.stringify(wechat)!=="{}") {
            wx.config({
                debug: false,
                appId: wechat.values.appId,
                timestamp: wechat.values.timestamp,
                nonceStr: wechat.values.nonceStr,
                signature: wechat.values.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone',
                    'showMenuItems',
                    "showOptionMenu"
                ],

            });
        }
    return (
      <div className="maintenance">
        <img src="http://pcdn.mikecrm.com/ugc_2_e/pub/70/707662fa1d3de9acce7210f912af7dbd/form/image/52507530ca79f9fdd9ae4c34366deedc.png" style={{width:"100%"}}/>
        <div className="group" style={{margin:'10px auto'}}>
          <div className="head">说 明</div>
          <span className="explain">尊敬的客户/用户，请将您在维宏软件操作途中遇到的问题按照表格的填写完整，我们会及时处理您的反馈，保持手机通畅。谢谢！</span>
        </div>
        <div className="load"></div>
        <div className="weui-loadmore" style={{display:'none'}}>
          <i className="weui-loading"></i>
          <span className="weui-loadmore__tips">正在发送</span>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">联系人</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.name==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox">
              <i className="iconfont">&#xe72c;</i>
              <input type="text" value={this.state.name} onChange={this.name.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">联系方式</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.phone==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox">
              <i className="iconfont">&#xe615;</i>
              <input type="text" value={this.state.phone} onChange={this.phoneChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">反馈时间</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.props.maintenance.time==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox">
              <i className="iconfont">&#xe609;</i>
              <input type="text" id='datetime-picker' 
              value={this.props.maintenance.time} readOnly/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">公司</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.componey==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox">
              <i className="iconfont">&#xe72a;</i>
              <input type="text" onChange={this.componeyChange.bind(this)} value={this.state.componey}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">邮箱</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.email==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.email} onChange={this.email.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">机械厂家名称</span>
            </p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.factoryname} onChange={this.factoryname.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">所属行业</span>
              <span className="star">*</span>
            </p>
          </div>
          <div>
            <div className="inputbox other">
              <i className="iconfont arror" >&#xe600;</i>
              <select name="work" id="work" value={this.state.work} onChange={this.changeWork}>
                <option value='木工'>木工</option>
                      <option value='水切割'>水切割</option>
                      <option value='激光'>激光</option>
                      <option value='3c'>3C</option>
                      <option value='其他'>其他</option>
              </select>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">软件版本</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.version==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.version} onChange={this.version.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">硬件信息</span>
            </p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.hardwareMsg} onChange={this.hardwareMsg.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">问题描述</span>
              <span className="star">*</span>
            </p>
            <p className="error" style={{display:this.state.subscrib==""&&this.state.click ? "block" : "none"}}>输入为空或格式错误，请您重新填写</p>
          </div>
          <div>
            <div className="inputbox other textarea">
              <textarea type="text" value={this.state.subscrib} onChange={this.subscrib.bind(this)}></textarea>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">维宏技术维护人员姓名</span>
            </p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.MaintainerName} onChange={this.MaintainerName.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">维宏技术维护人员联系方式</span>
            </p>
          </div>
          <div>
            <div className="inputbox other">
              <input type="text" value={this.state.MaintainerPhone} onChange={this.MaintainerPhone.bind(this)}/>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="text">
            <p className="fbc_title">
              <span className="name">备注</span>
            </p>
          </div>
          <div>
            <div className="inputbox other textarea">
              <textarea type="text" value={this.state.remark} onChange={this.remark.bind(this)}></textarea>
            </div>
          </div>
        </div>
        <div className="group attachment">
          <div className="text" >
            <p className="fbc_title">
              <span className="name">附件</span>
            </p>
            <p>
              <span className="file">请将您所有的文件以图片的格式上传
              </span>
            </p>
          </div>
          <div className="fbc_ufContent">
            <div className="weui-cells weui-cells_form" >
              <div className="weui-cell">
                <div className="weui-cell__bd">
                  <div className="weui-uploader">
                    <div className="weui-uploader__hd">
                      <p className="weui-uploader__title">图片上传
                        &nbsp;<span id="warn">ttututt</span>
                      </p>
                    
                    </div>
                    <div className="weui-uploader__bd">
                      <ul className="weui-uploader__files" id="uploaderFiles">
                         
                      </ul>
                      <div className="weui-uploader__input-box">
                        <input id="uploaderInput" className="weui-uploader__input" type="file" accept="image/*" multiple="" onChange={this.uploadChange.bind(this)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="submitWrapper">
              <div className="submit">
                <a className="fb_submitBtn" onClick={this.submit.bind(this)}>提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Maintenance.contextTypes = {
  router: React.PropTypes.object,
}
function mapStateToProps(state) {
    return {
        maintenance:state.maintenance,

    }
}


export default connect(
    mapStateToProps,
    subAction,
    timeAction,
    wechatAction,
    imageAction,
    clearAction
)(Maintenance);