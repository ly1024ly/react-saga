window.onload = function(){

function getUserInfo() {
	console.log(sessionStorage.user)
	var user = {};
	var userinfo = window.location.search.substr(1);
	var a = userinfo.split('&');
	for(var n = 0; n < a.length; n++) {
		user[a[n].split('=')[0]] = a[n].split('=')[1];
	}
	return user;
}

var user = getUserInfo();
	if ("username" in user && "password" in user && "openid" in user && "token" in user) {
		// ok
		if("q" in user){
			var url3 = window.location.href;
			var url4 = url3.substring(0, url3.indexOf("home.html")) + "view/index.html#/filesearch?_k=xev9nr";
			window.location.href=url4;
		} else {
			sessionStorage.user = JSON.stringify(user);
			var url1 = window.location.href;
			var url2 = url1.substring(0, url1.indexOf("home.html")) + "view/index.html#/collect?_k=dy4ej5";
			window.location.href=url2;
		}
		// lo
	} else {
		// error
		var url = window.location.href;
		var aurl = url.substring(0, url.indexOf("home.html")) + "view/prop.html";
		if ("more" in user) {

		}else {
			//window.location.href=aurl;
			var url1 = window.location.href;
			var url2 = url1.substring(0, url1.indexOf("home.html")) + "view/index.html#/collect?_k=dy4ej5";
			window.location.href=url2;
		}

	}
}