pro_detail()

function pro_detail() {
	var search = window.location.search.substr(1);
	if (!search) {
		alert('请选择你需要查看的商品')
		window.location.href = '../index.html';
	}
	var data = allProducts.filter(function(data) {
		return data.p_id == search;
	})
	data = data[0];
	//console.log(data);
	var pro_detail = $('.pro_details')[0];
	var top = $('.top', pro_detail)[0];
	var down = $('.down', pro_detail)[0];
	var ul1 = $('ul', down)[0];
	var r1 = $('.r1')[0];
	var hprice = $('h3')[0];
	var gmty = $('.gmty')[0];
	hprice.firstElementChild.firstElementChild.innerHTML = data.P_info.p_nowprice;
	hprice.children[1].firstElementChild.innerHTML = data.P_info.P_inchina;
	r1.firstElementChild.innerHTML = data.P_info.p_title;
	top.firstElementChild.firstElementChild.innerHTML = data.P_info.p_title;
	forEach(data.P_info.p_typpicture, function(data, i) {
		var li = document.createElement('li');
		li.innerHTML = `<a href="javascript:;"><img src="https://img.buyimp.com/${data}" ></a>`;
		gmty.children[1].appendChild(li)

	})
	forEach(data.P_info.p_sidpicture, function(data, i) {
		//console.log(data)
		var li = document.createElement('li');
		li.innerHTML = `<a href="javascript:;"><img src="https://img.buyimp.com/${data}" ></a>`;
		if (i == 0) {
			li.className = 'check';
		}
		ul1.appendChild(li)
	})
}
var joinBtn = $('.gm')[0].firstElementChild;
joinBtn.onclick = function() {
joincar();
		
}


	
function joincar() {
	var search = window.location.search.substr(1);
	var place2 = $('.place2')[0].value;
	var adress = $('.place1')[0].innerHTML + '' + $('.place2')[0].value;
	var username = document.cookie.split(';')[0].split('=')[1]
	console.log();
	if (!username) {
		alert('你还未登录,请登录过后购买');
		window.location.href = 'users.html';
	}
		if(!place2){
			alert('请输入您的收货地址');
			
		} 
	else {
		var shuliang =  $('.shuliang')[0].firstElementChild.value;
			shuliang=parseFloat(shuliang);
		var arr = [];
		var shopList = window.localStorage.getItem('list' + username + '')
		var shopListName =document.cookie.split(';')[0].split('=')[1]
		console.log(shopListName);
		if (!shopList) {
			var list = {
				'pid': search,
				'adress': adress,
				'num': shuliang
			};
			arr.push(list)
			arr = JSON.stringify(arr);
			window.localStorage.setItem('list' + shopListName, arr);
			//window.location.reload();
		} else {

			var listsp = window.localStorage.getItem('list' + username);
				listsp = JSON.parse(listsp);
			console.log(listsp)
			 var onoff = listsp.some(function(data) {
				return data.pid == search;
			})
			if (onoff) {
				var index = null;
				for (var i = 0; i < listsp.length; i++) {
					if (listsp[i].pid == search) {
						index = i;
					}
				}
				listsp[index].num =parseFloat(listsp[index].num ) + shuliang;
				listsp[index].adress =adress;
				
			}else{
				var obj = {
					'pid': search,
					'adress': adress,
					'num': shuliang
				};
				listsp.push(obj)
			} 
			window.localStorage.setItem('list' + shopListName, JSON.stringify(listsp));
			if(confirm('商品已加入购物车,是否前往购物车?')){
				
						window.location.href='shoppingcar.html'	
					}else{
						
						 pnum()
						}
		}

	}
}


var down = $('.down')[0];
var left = $('.left', down)[0];
var right = $('.right', down)[0];
var btntop = $('.btntop', down)[0];
var btntop = $('.btntop', down)[0];
var btndown = $('.btndown', down)[0];
var pro = $('.pro', down)[0];
var fd = $('.fd', down)[0];
var fdj = $('.fdj', down)[0];
var list = $('ul', down)[0];
var num = 0;
var onoff = true;
bind(btntop, 'click', function() {
	/* if (onoff) {
		onoff = !onoff; */
	num = num - 95;
	//console.log(num)
	if (num <= -380) {
		num = -380;
		list.style.transform = 'translateY(' + num + 'px)';
	} else {

		list.style.transform = 'translateY(' + num + 'px)';

	}
	console.log(num);
	/* setTimeout(function() {
			onoff = !onoff;
		}, 1000)
	} */
});
bind(btndown, 'click', function() {
	/* if (onoff) {
		onoff = !onoff; */
	num = num + 95;
	if (num >= 0) {
		num = 0;
		list.style.transform = 'translateY(' + num + 'px)';
	} else {

		list.style.transform = 'translateY(' + num + 'px)';
	}
	console.log(num)


	console.log(num);
	//console.log(list.offsetHeight);
	/* setTimeout(function() {
			onoff = !onoff;
		}, 1000)
	} */
});

var lis = $('li', list);
var proImg = $('img', pro)[0];
var fdjImg = $('img', fdj)[0];
//console.log(proImg)
forEach(lis, function(el, i) {
	if (el.className == 'check') {
		proImg.src = lis[i].children[0].children[0].src;
		fdjImg.src = lis[i].children[0].children[0].src;
		//console.log(lis[i].children[0].children[0].src);
	}
})
forEach(lis, function(el, i) {
	bind(el, 'mouseenter', function() {
		var a = siblings(this, 'li')
		for (var j = 0; j < a.length; j++) {
			removeClass(a[j], 'check')
		}
		addClass(this, 'check');
		proImg.src = this.children[0].children[0].src;
		fdjImg.src = this.children[0].children[0].src;
	})
});
var gmty = $('.gmty')[0];
var tyli = $('li', gmty);
forEach(tyli, function(el, i) {
	bind(el, 'click', function() {
		fdjImg.src = this.firstElementChild.firstElementChild.src;
		proImg.src = this.firstElementChild.firstElementChild.src;
		//console.log(this.firstElementChild.firstElementChild.src);
	});
})
var div = null;
pro.onmouseenter = function(ev) {
	//console.log(ev.pageY);
	div = document.createElement('div');
	div.className = 'fdk';
	this.appendChild(div);
	fdj.style.display = 'block';
	var position = fd.getBoundingClientRect();
	var x = ev.pageX - position.left - div.offsetWidth / 2;
	var y = ev.pageY - position.top - div.offsetHeight / 2;


	var maxL = fd.clientWidth - div.offsetWidth;
	var maxT = fd.clientHeight - div.offsetHeight;

	if (x >= maxL) {
		x = maxL;
	} else if (x <= 0) {
		x = 0;
	}
	if (y >= maxT) {
		y = maxT;
	} else if (y <= 0) {
		y = 0;
	}

	div.style.left = x + 'px';
	div.style.top = y + 'px';
}

pro.onmouseleave = function(ev) {
	fdj.style.display = 'none';
	div.remove();
}


pro.onmousemove = function(ev) {
	var position = fd.getBoundingClientRect();
	var x = ev.pageX - position.left - div.offsetWidth / 2;
	var y = ev.pageY - position.top - div.offsetHeight / 2;

	var maxL = fd.clientWidth - div.offsetWidth;
	var maxT = fd.clientHeight - div.offsetHeight;

	if (x >= maxL) {
		x = maxL;
	} else if (x <= 0) {
		x = 0;
	}
	if (y >= maxT) {
		y = maxT;
	} else if (y <= 0) {
		y = 0;
	}
	div.style.left = x + 'px';
	div.style.top = y + 'px';

	// 获取一个比例
	var proportion_x = x / maxL;
	var proportion_y = y / maxT;
	var moveL = fdjImg.offsetWidth - fdj.offsetWidth;
	var moveT = fdjImg.offsetHeight - fdj.offsetHeight;
	fdjImg.style.left = -moveL * proportion_x + 'px';
	fdjImg.style.top = -moveT * proportion_y + 'px';
}

//三级联动
var where = $('.where')[0];
var place = $('.place', where)[0];
var tcontent = $('.tcontent', where)[0];
var tplan = $('.tplan', place)[0];
var ssq = $('a', tplan);
var sheng = $('.sheng', tplan)[0];
var shi = $('.shi', tplan)[0];
var qu = $('.qu', tplan)[0];
var shengC = $('.shengC', tcontent)[0];
var shiC = $('.shiC', tcontent)[0];
var quC = $('.quC', tcontent)[0];
var relas = $('.relas', where)[0];
var placedata = ChineseDistricts[86];

relas.onmouseenter = function() {
	sheng.innerHTML = '省';
	shi.innerHTML = '市';
	qu.innerHTML = '区/县';
	shengC.innerHTML = '';
	quC.style.display = 'none';
	shiC.style.display = 'none';
	place.style.display = 'block';
	shengC.style.display = 'block';
	for (var attr in placedata) {

		forEach(placedata[attr], function(data1, i) {
			//console.log(data1[i]);
			var oA = document.createElement('a');
			oA.href = "javascript:;";
			oA.className = data1.code;
			oA.innerHTML = data1.address;
			shengC.appendChild(oA);
			oA.onclick = function() {
				sheng.innerHTML = this.innerHTML;
				var shengCode = this.className;
				shengC.style.display = 'none';
				shiC.style.display = 'block'
				//console.log(shengCode)

				//console.log(shengCode)
				findCity(shengCode)
			}
		})

	}
}
sheng.onclick = function() {
	shengC.style.display = 'block';
	shiC.style.display = 'none';
	quC.style.display = 'none';
	for (var attr in placedata) {
		console.log(placedata[attr]);
		forEach(placedata[attr], function(data1, i) {
			//console.log(data1[i]);
			var oA = document.createElement('a');
			oA.href = "javascript:;";
			oA.className = data1.code;
			oA.innerHTML = data1.address;
			shengC.appendChild(oA);
			oA.onclick = function() {
				sheng.innerHTML = this.innerHTML;
				var shengCode = this.className;
				shengC.style.display = 'none';
				shiC.style.display = 'block';
				shengC.innerHTML = '';
				shiC.innerHTML = '';
				quC.innerHTML = '';
				//console.log(shengCode)
				console.log(shengCode)
				findCity(shengCode)

			}
		})

	}
}

function findCity(shengCode) {

	var citydata = ChineseDistricts[shengCode];
	for (var code in citydata) {
		var oA = document.createElement('a');
		oA.href = "javascript:;";
		oA.className = code;
		oA.innerHTML = citydata[code];
		shiC.appendChild(oA);
		oA.onclick = function() {
			shi.innerHTML = this.innerHTML;
			var shiCode = this.className;
			shiC.style.display = 'none';
			quC.style.display = 'block';
			shengC.innerHTML = '';
			shiC.innerHTML = '';
			quC.innerHTML = '';
			findcounty(shengCode, shiCode)
		}
	}


	//console.log(citydata);


}

function findcounty(shengCode, shiCode) {
	var countydata = ChineseDistricts[shiCode];
	//console.log(countydata);
	for (var code in countydata) {
		var oA = document.createElement('a');
		oA.href = "javascript:;";
		oA.className = code;
		oA.innerHTML = countydata[code];
		quC.appendChild(oA);
		oA.onclick = function() {
			qu.innerHTML = this.innerHTML;
			var quCode = this.className;
			relas.innerHTML = sheng.innerHTML + shi.innerHTML + qu.innerHTML;
			place.style.display = 'none';
			//quC.style.dsisplay='block';

		}
	}
	shi.onclick = function() {
		shengC.style.display = 'none';
		shiC.style.display = 'block';
		quC.style.display = 'none';
		//console.log(shenCodes)
		var citydata = ChineseDistricts[shengCode];
		for (var code in citydata) {
			var oA = document.createElement('a');
			oA.href = "javascript:;";
			oA.className = code;
			oA.innerHTML = citydata[code];
			shiC.appendChild(oA);
			oA.onclick = function() {
				shi.innerHTML = this.innerHTML;
				var shiCode = this.className;
				shiC.style.display = 'none';
				quC.style.display = 'block';
				shengC.innerHTML = '';
				shiC.innerHTML = '';
				quC.innerHTML = '';
				findcounty(shengCode, shiCode)
			}
		}
	}
}
where.onmouseleave = function() {
	place.style.display = 'none'
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
	  
	  //商家
	  	var search = window.location.search.substr(1);
		var sto =$('.sto')[0];
		var s=allProducts.filter(function(data){
			return data.p_id==search;
		})
		var shopid=s[0].p_shop;
		console.log(shopid)
		var sho =shops.filter(function(data){
			return data.s_id==shopid;
		})
		sto.innerHTML=`
		
		<h1>   <a href="javascript::"><img src="https://img.buyimp.com/${sho[0].s_logo}" ></a>店家信息
				<p>${sho[0].s_introduce}</p>
		</h1>
		<h4>商家推荐</h4>
		<div class="tj">
			<ul>
				
			</ul>
		</div>
		`;
		var oul=$('ul',sto)[0];
		console.log(oul)
		var ss=allProducts.filter(function(data){
			return data.p_shop==shopid
			
		})
		forEach(ss,function(data,i){
			if(i<10){
				//console.log(data.P_info.p_img);
				 var li=document.createElement('li');
				var a=document.createElement('a');
				li.appendChild(a);
				bind(li,'click',function(){
					window.location.href=`product_details.html?${data.p_id}`;
				})
				var img =document.createElement('img');
				img.setAttribute('_src',`https://img.buyimp.com/${data.P_info.p_img}`);
				a.appendChild(img)
				var p1 =document.createElement('p');
				p1.innerHTML=`<strong>${data.P_info.p_title}</strong>`;
				a.appendChild(p1);
				var p2 = document.createElement('p');
				if(data.P_info.p_Price !=0){
					var del = document.createElement('del');
					del.innerHTML='￥'+data.P_info.p_Price;
					p2.appendChild(del)
					}
					var span = document.createElement('span');
					span.innerHTML='￥'+data.P_info.p_nowprice;
					p2.appendChild(span)
					
					a.appendChild(p2)
					var p3 =document.createElement('p');
					p3.innerHTML=`<span>国内含税参考价￥${data.P_info.P_inchina}</span>`;
					a.appendChild(p3);
					
				oul.appendChild(li); 
			}
				
		})
		var iLis =$('li',oul)
		//console.log(iLis)
		 var iH = window.innerHeight;
		loadImg();
		   function loadImg(){
			   forEach(iLis,function(el){
				   var liTop = el.getBoundingClientRect().top;
				   if(liTop<= iH){ 
					  setTimeout(function(){
						  var img = $('img',el)[0];
						  if(!img.src){	  
							  var s = img.getAttribute('_src');
							  img.src = s;
							  img.removeAttribute('_src');
						  }						  
					  },500)						
				   }
				   
			   })
			   
		   }
		  
		  window.onscroll = function(){
			   loadImg();
			  
		  }