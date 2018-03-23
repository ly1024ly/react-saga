require("../css/share.css");

window.onload = function() {
    function getUserMsg() {
        var user = {};
        var userinfo = window.location.search.substr(1);
        var a = userinfo.split('&');
        for (var n = 0; n < a.length; n++) {
            user[a[n].split('=')[0]] = a[n].split('=')[1];
        }
        return user;
    }
    //检测是否支持localhost
    if (typeof localStorage === 'object') {
        try {
            localStorage.setItem('localStorage', 1);
            localStorage.removeItem('localStorage');
        } catch (e) {
            Storage.prototype._setItem = Storage.prototype.setItem;
            Storage.prototype.setItem = function() {};
            alert('您的web浏览器不支持在本地存储设置。请关闭浏览器无痕模式，在试一次');
            return;
        }
    }
    var user = getUserMsg();
    var titles;
    var tid = user.topicid;
    $.ajax({
        type:'get',
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        url: 'https://nccloud.weihong.com.cn/nccloudOLhelp/search/getkeyworlds?topicid=' + tid,
        success:function(msg){
            if(msg.result=="success"&&msg.message.length>0){
                var temp = '';
                for(var i=0;i<msg.message[0].keyworlds.length;i++){
                    if(i<3){
                        temp += '<li>'+msg.message[0].keyworlds[i] +'</li>';
                    }
                }
                $(".keyword ul").append(temp);
            }else{
                $(".keyword").css("display","none");
            }
        },
       error:function(err){
       }
    })
    //验证当前设备是否是第一次进入
    if (localStorage.getItem('firstUse')) {
        $("#shareit").hide();
    } else {
        $("#shareit").show();
        localStorage.firstUse = true;
    }
    $(".content").load(decodeURIComponent(user.shareUrl), function() {
        $(".content").find("ul li").css({
            "listStyle": "none",
            "padding": "10px 0"
        });
        titles = $(".content").find("h1").html();
        $(this).parent().parent().prev('head').find("title").html(titles);
    });
    //分享
    //立即分享到微信朋友圈点击事件
    $("#shareit").on("click", function() {
        $("#shareit").hide();
    })
}