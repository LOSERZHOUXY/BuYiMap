var lan = $('.language')[0];
var bShop = $('.bShop')[0];
console.log(lan)
bind(lan, 'mouseenter', function() {
	this.lastElementChild.style.display = 'block';

	this.lastElementChild.firstElementChild.lastElementChild.style.display = 'none';
	this.lastElementChild.lastElementChild.lastElementChild.style.display = 'none';
})
var lis = $('li', lan);
forEach(lis, function(el, i) {
	bind(el, 'click', function() {
		this.lastElementChild.style.display = 'block';
		this.parentNode.previousElementSibling.innerHTML = this.innerHTML;

		this.parentNode.style.display = 'none';
	})
});
bind(lan, 'mouseleave', function() {
	this.lastElementChild.style.display = 'none';
	this.lastElementChild.firstElementChild.lastElementChild.style.display = 'block';
	this.lastElementChild.lastElementChild.lastElementChild.style.display = 'block';
})
var qh = $('.q_h')[0];
var onoff = true;
bind(qh, 'click', function() {

	if (onoff) {
		this.nextElementSibling.style.display = 'block';
		onoff = !onoff
	} else {
		this.nextElementSibling.style.display = 'none';
		onoff = !onoff;
	}

});
var L_rdd = $('.l_rdd')[0];
var btn = $('button', L_rdd)[0];
bind(btn, 'click', function(ev) {
	var timer = setInterval(function() {
		var num = window.pageYOffset;
		num -= 50;
		window.scrollTo(0, num)
		if (num <= 0) {
			clearInterval(timer)
		}
	}, 16.666)

});




var login_rig = $('.login_register')[0];
var loginOut = $('.login')[0];

var logins = $('#login')[0];
console.log(logins);
var registerOut = $('.register')[0];
var register = $('#register')[0];
bind(logins, 'click', function() {
	loginOut.style.display = 'none';
	registerOut.style.display = 'block';
});
bind(register, 'click', function() {
	registerOut.style.display = 'none';
	loginOut.style.display = 'block';

});
//登录
var dlzh = $('.username', loginOut)[0];
var dlmm = $('.password', loginOut)[0];
var jzmm = $('.jzmm', loginOut)[0];
var dlinfo = $('.info', loginOut)[0];
var dl = $('.dl', loginOut)[0];



if(document.cookie){
	console.log(document.cookie);
	 var jzuser=document.cookie;
	jzuser=jzuser.split(';')
	console.log(jzuser)
	var user1=jzuser[0];
	var pass1=jzuser[1];
	
	trueu=user1.split('=');
	truep=pass1.split('=');
	
	dlzh.value=trueu[1];
	dlmm.value=truep[1];
	jzmm.checked=true;
	bind(jzmm,'click',function(){
	if(jzmm.checked==false){
		zxmcook('username',trueu[1],-1);
		zxmcook('password',truep[1],-1);
	}
}) 
	
}








bind(dl, 'click', function() {
	//console.log(document.cookie);

			if (!dlzh.value.trim()) {
				dlinfo.innerHTML = '';
				dlinfo.innerHTML = "请输入您的账户";
			} else {
				if (checkUser(dlzh.value.trim()) == 0) {
					dlinfo.innerHTML = '';
					dlinfo.innerHTML = "您输入的账户格式不正确,请重新输入";
				} else {
					dlinfo.innerHTML = '';
					if (!dlmm.value.trim()) {
						dlinfo.innerHTML = '';
						dlinfo.innerHTML = "请输入您的密码";
					} else {
						if (checkPwd(dlmm.value.trim()) == 0) {
							dlinfo.innerHTML = '';
							dlinfo.innerHTML = "您输入的密码格式不正确,请重新输入.";
						} else {
							var a=window.localStorage.getItem(dlzh.value);
							console.log(a);
							if(a==null){
								dlinfo.innerHTML = "查无此人,请重新输入";
								dlzh.value=null;
								dlmm.value=null;
							}else{
								var a =JSON.parse(a);
								if(a.user==dlzh.value && a.password==dlmm.value){
									
									if(jzmm.checked==true){
										
										zxmcook('username',a.user,1);
										zxmcook('password',a.password,1);
										window.location.href='../index.html';
									}else{
									
										document.cookie="username="+a.user+";path="+escape("/");
										document.cookie="password="+a.password+";path="+escape("/");
										window.location.href='../index.html';
									}	
								}else{
									dlinfo.innerHTML = '';
										dlinfo.innerHTML = "账号或密码错误,请重新输入";
								}
							} 
							 
							
							}
						}
					}
			} 
	});
	
	
	
	function zxmcook(name,value,time){ //函数名字自己随意定义，zxm是哥哥我名字，你就不要郁闷了
			var exp=new Date();
			exp.setTime(exp.getTime()+time*60*24*60*1000); //这里的time就是天数
			document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString()+";path="+escape("/");
			}
	


					//注册
					var zc = $('.zc', registerOut)[0];
					var info = $('.info', registerOut)[0];
					var fsdh = $('.phonenum', registerOut)[0];
					var yz = $('.yzm', registerOut)[0];
					var fsyz = fsdh.nextElementSibling;
					bind(zc, 'click', function() {
						var zh = $('.username', registerOut)[0].value;
						var mima = $('.password', registerOut)[0].value;
						var dh = $('.phonenum', registerOut)[0].value;
						var yzm = yz.value;

						if (!zh.trim()) {
							info.innerHTML = '';
							info.innerHTML = "请输入您的账户";
						} else {
							if (checkUser(zh.trim()) == 0) {
								info.innerHTML = '';
								info.innerHTML = "您输入的账户格式不正确,请重新输入.正确格式:4到16位（字母，数字),字母开头";
							} else {
								info.innerHTML = '';
								if (!mima.trim()) {
									info.innerHTML = '';
									info.innerHTML = "请输入您的密码";
								} else {
									if (checkPwd(mima.trim()) == 0) {
										info.innerHTML = '';
										info.innerHTML = "您输入的密码格式不正确,请重新输入.正确格式:校验密码：只能输入6-20个字母、数字、下划线 ";
									} else {
										info.innerHTML = '';
										if (yzm == '') {
											info.innerHTML = "请点击生成验证码";
										} else {
											if ($('.xy', registerOut)[0].checked == false) {
												info.innerHTML = "请阅读并同意用户使用条款";
											} else if ($('.xy', registerOut)[0].checked == true) {
												var  b=window.localStorage.getItem(zh)
												if(b){
													info.innerHTML = "";
													info.innerHTML = "该用户已被注册,请另申请";
													return;
												}
												var obj = {};
												info.innerHTML = '';
													obj.user = zh,
													obj.password = mima,
													obj.phonenum = dh

												window.localStorage.setItem(zh, JSON.stringify(obj));
												registerOut.style.display = 'none';
												loginOut.style.display = 'block';
											
											
											}


										}

									}
								}
							}
						}
					});

					bind(fsyz, 'click', function() {
						if (!$('.phonenum', registerOut)[0].value.trim()) {
							info.innerHTML = '';
							info.innerHTML = "请输入您的手机号码";
						} else {
							if (checkregtel($('.phonenum', registerOut)[0].value.trim()) == 0) {
								info.innerHTML = '';
								info.innerHTML = "您输入的手机格式不正确,请重新输入";
							} else {
								info.innerHTML = '';
								this.parentNode.nextElementSibling.children[1].value = rundom();
							}
						}
					});
					//账号正则
					function checkUser(str) {
						var user = /^[a-zA-Z]\d{3,15}$/;
						if (user.test(str)) {
							return 1;
						} else {
							return 0;
						}

					}
					//密码验证
					function checkPwd(str) {
						var pwd = /^(\w){6,20}$/;
						if (pwd.test(str)) {
							return 1;
						} else {
							return 0;
						}
					}
					//手机号码验证
					function checkregtel(regtel) {
						var str = regtel;
						var Expression = /^13(\d{9})$|^15(\d{9})$|^189(\d{8})$/;
						var objExp = new RegExp(Expression);
						if (objExp.test(str) == true) {
							return 1;
						} else {
							return 0;
						}
					}
					//随即验证

					function rundom() {
						var num = "";
						for (var i = 0; i < 4; i++) {
							num += Math.floor(Math.random() * 10)

						}
						return num;

					}
	   
	   pnum()
	   function pnum(){
	   	var user =document.cookie.split(';')[0].split('=')[1];
	   	var usermessage=$('.usermessage')[0];
	   	var yhxx=$('.yhxx')[0];
	   	var  tk=$('.tk')[0].parentNode.parentNode;
	   	if(user){
	   		var userlist =window.localStorage.getItem('list'+user)
	   		if(userlist){
	   			userlist =JSON.parse(userlist);
	   		
	   		$('.pNum')[0].innerHTML=userlist.length;
	   		}else{
	   			$('.pNum')[0].innerHTML=0;
	   		}
	   		bind(tk,'click',function(){
	   			window.location.href='shoppingcar.html';
	   		})
	   		usermessage.parentNode.previousElementSibling.style.display='none';
	   		usermessage.parentNode.style.display='block';
	   		usermessage.parentNode.onmouseenter=function(){
	   			usermessage.style.display='block';
	   		}
	   		usermessage.parentNode.onmouseleave=function(){
	   			usermessage.style.display='none';
	   		}
	   		yhxx.previousElementSibling.style.display='none';
	   		yhxx.style.display='block';
	   		yhxx.onmouseenter=function(){
	   			this.children[1].firstElementChild.innerHTML='欢迎:'+user;
	   			this.children[1].style.display='block';
	   			
	   		}
	   		yhxx.children[1].children[5].addEventListener('click',function(){
	   			 var jzuser=document.cookie;
	   			jzuser=jzuser.split(';')
	   		
	   			var user1=jzuser[0];
	   			var pass1=jzuser[1];
	   			trueu=user1.split('=');
	   			truep=pass1.split('=');
	   			zxmcook('username',trueu[1],-1);
	   			zxmcook('password',truep[1],-1);
	   			window.location.href='users.html' ;
	   		})
	   		/* yhxx.children[1].children[5].click=function(){
	   			
	   			
	   		} */
	   		console.log(yhxx.children[1].children[5]);
	   		yhxx.onmouseleave=function(){
	   			this.children[1].style.display='none';
	   		}
	   		
	   	}else{
	   		
	   			bind(tk,'click',function(){
	   				window.location.href='users.html';
	   			})
	   	}
	   	
	   }