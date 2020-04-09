//数据渲染
//console.log(allProducts)
var elallpro = $('.proout')[0];
//page(pages,elallpro)
var pages = 1;
page(pages, elallpro)
var elpages = $('.page')[0].children[1];
var allpage = Math.ceil(allProducts.length / 16);
for (var i = 0; i < allpage; i++) {

	var li = document.createElement('li');
	if(i==0){
		li.className='active'
	}
	li.innerHTML = `<a href="javascript:;">${i+1}</a>`;
	elpages.appendChild(li)
	 li.onclick = function() {
		for(var j =0;j<siblings(this,'li').length;j++){
			removeClass(siblings(this,'li')[j],'active');
		}
		addClass(this,'active')
		pages = parseInt(this.firstElementChild.innerHTML);
		page(pages, elallpro)
		loadImg();
	}
}
console.log(allpage)

function page(pages, elallpro) {
	
	elallpro.innerHTML = '';
	var iH = window.innerHeight;
	var pagestart = (pages - 1) * 16;
	var pageend = (pages * 16) - 1;
	
	if(pageend>=allProducts.length-1){
		pageend=allProducts.length-1
	}
	$('.gesh')[0].innerHTML=`产品（${allProducts.length}中的${pagestart+1}-${pageend+1}）`;
	for (var i = pagestart; i <= pageend; i++) {
		var div = document.createElement('div');
		div.className = 'col-lg-3 product';
		div.innerHTML =
			`
			<a href="product_details.html?${allProducts[i].p_id}">
				<img _src="https://img.buyimp.com/${allProducts[i].P_info.p_img}" >
			</a>
			<h3>${allProducts[i].P_info.p_title}</h3>
		`;
		elallpro.appendChild(div);	
	}
loadImg();
}
$('.pre')[0].onclick=function(){
	pages=pages-1;
	if(pages<=1){
		pages=1;
	}
	var lis=$('.page')[0].children[1].children;
	for(var j=0;j<lis.length;j++){
	   removeClass(lis[j],'active')
	
	}
	addClass(lis[pages-1],'active');
	
	//console.log(lis)
	page(pages, elallpro)
	
}
$('.next')[0].onclick=function(){
	console.log(pages)
	pages=pages+1;
	if(pages>=allpage){
		pages=allpage;
	}
	
	var lis=$('.page')[0].children[1].children;
	for(var j=0;j<lis.length;j++){
	   removeClass(lis[j],'active')
	
	}
	addClass(lis[pages-1],'active');
	page(pages, elallpro)
	
}
/* 1  
0  15
2
16-31
3
32-47

(page-1)*16
(page*16)-1 */


//懒加载


var products = $('.product', elallpro);
//console.log(products)
function loadImg() {
	products = $('.product', elallpro);
	var iH = window.innerHeight;
	forEach(products, function(el) {
		var liTop = el.getBoundingClientRect().top;
		if (liTop <= iH) {
			setTimeout(function() {
				var img = $('img', el)[0];
				if (!img.src) {
					var s = img.getAttribute('_src');
					img.src = s;
					img.removeAttribute('_src');
				}
			}, 500)
		}

	})

}
loadImg();
window.onscroll = function() {
	loadImg();
}





pnum()

function pnum() {
	var user = document.cookie.split(';')[0].split('=')[1];
	var usermessage = $('.usermessage')[0];
	var yhxx = $('.yhxx')[0];
	var tk = $('.tk')[0].parentNode.parentNode;
	if (user) {
		var userlist = window.localStorage.getItem('list' + user)
		if (userlist) {
			userlist = JSON.parse(userlist);

			$('.pNum')[0].innerHTML = userlist.length;
		} else {
			$('.pNum')[0].innerHTML = 0;
		}
		bind(tk, 'click', function() {
			window.location.href = 'shoppingcar.html';
		})
		usermessage.parentNode.previousElementSibling.style.display = 'none';
		usermessage.parentNode.style.display = 'block';
		usermessage.parentNode.onmouseenter = function() {
			usermessage.style.display = 'block';
		}
		usermessage.parentNode.onmouseleave = function() {
			usermessage.style.display = 'none';
		}
		yhxx.previousElementSibling.style.display = 'none';
		yhxx.style.display = 'block';
		yhxx.onmouseenter = function() {
			this.children[1].firstElementChild.innerHTML = '欢迎:' + user;
			this.children[1].style.display = 'block';

		}
		yhxx.children[1].children[5].addEventListener('click', function() {
			var jzuser = document.cookie;
			jzuser = jzuser.split(';')

			var user1 = jzuser[0];
			var pass1 = jzuser[1];
			trueu = user1.split('=');
			truep = pass1.split('=');
			zxmcook('username', trueu[1], -1);
			zxmcook('password', truep[1], -1);
			window.location.href = 'users.html';
		})
		/* yhxx.children[1].children[5].click=function(){
			
			
		} */
		console.log(yhxx.children[1].children[5]);
		yhxx.onmouseleave = function() {
			this.children[1].style.display = 'none';
		}

	} else {

		bind(tk, 'click', function() {
			window.location.href = 'users.html';
		})
	}

}


var a =allProducts.filter(function(data){
	return data.p_type==1005
})
//console.log(a);

var str='';
forEach(protype,function(data,i){
	console.log(data)
	
		str+='<li><h3><span><a href="javascript:;" >'+data.bigtitle+'</a></span></h3><ul>';
			for(var j=0;j<data.lite.length;j++){
				str+='<li class="tpli"><span><a class="'+data.bigtype+'/'+data.lite[j].litetype+'" href="javascript:;">'+data.lite[j].litetitle+'</a></span></li>'	
			}
		
		
			str+='</ul></li>';
		
	
	$('.cptype')[0].innerHTML=str;
})
var typelis=$('.tpli a');
	forEach(typelis,function(el,j){
		el.onclick=function(){
			var big=el.className.split('/')[0];
			var lit=el.className.split('/')[1];
			findpro(big,lit)
		}
	})
	
	function findpro(big,lit){
		$('.page')[0].style.display='none'
		var proout=$('.proout')[0];
		proout.innerHTML='';
		var a =allProducts.filter(function(data){
			return data.p_type==big && data.p_ltype==lit;
		})
		$('.gesh')[0].innerHTML=`产品（${allProducts.length}中的${1}-${a.length}）`;
		for (var i = 0; i <a.length; i++) {
			var div = document.createElement('div');
			div.className = 'col-lg-3 product';
			div.innerHTML =
				`
				<a href="product_details.html?${a[i].p_id}">
					<img _src="https://img.buyimp.com/${a[i].P_info.p_img}" >
				</a>
				<h3>${a[i].P_info.p_title}</h3>
			`;
			elallpro.appendChild(div);	
			
		}
		loadImg()
	}