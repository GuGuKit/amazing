/**
 * 
 * 论文中AJAX实现登录功能代码 参考牛利兵论文
 * 
 */

if(window.XMLHttpRequest){
	//非Microsoft浏览器，如Firefox、Opera。
	req = new XMLHttpRequest();
	
}
else if(window.ActiveXObject){
	//Microsoft浏览器，如IE
	req=new ActiveXObject("Microsoft.XMLHTTP");
	
}

if(req){
	//第一个参数：HTTP请求方式--GET
	//第二个参数：发送给Web服务器的关键字，关键字包括密码pw；
	//第三个参数：请求是否为异步模式，如果是true，
	//JavaScript函数将继续执行，而不等待服务器相应。
	req.open("GET","/login?"+pw+"&id="+Math.random(),true);
	req.onreadystatechange=loginComplete;
	req.send(null);	
}

//告诉HTTP请求对象用哪一个函数处理响应，对象onreadystatechange
//属性设置为要使用的JavaScript的函数名。
req.onreadystatechange=loginComplete;
function loginComplete(){
	//检查请求的状态，XMLHttpRequest提供了readyState属性来对服务器响应进行
	//判断，只有当readyState=4时，表明函数可以处理响应。
	if(req.readyState==4){
		//函数会检查HTTP服务器响应的状态值。当HTTP服务器响应的值为200时，
		//表示状态正常
		if(req.status==200){
			if(req.responseText=="OK"){
				setCookie("pw",pw);
				window.location.replace("set.html");				
			}else{
				alert("输入密码错误");
			}
		}
	}
	
}

//通过responseText属性来取回服务器返回的数据。
if(req.responseText=="OK"){
	//建立网页Cookie文件，使网页只能从主页登录。
	setCookie("pw",pw);
	//密码正确，转到set.html页面
	window.location.replace("set.html");
}