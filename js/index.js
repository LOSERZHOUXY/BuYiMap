
var tabin = $('.tabin')[0];
var tabbtns=$('button',tabin);
var tabContent=$('.tabContent')[0];
var inp =$('.inp',tabContent)[0];
tabbtns[0].onclick=function(){
	var a=tabContent.children[0].firstElementChild.innerHTML='您可以查询商品的中文名、英文名或者商品标签';
	inp.style.marginTop=5+'px';
	tabbtns[0].style.background='#ff9900';
	tabbtns[0].style.color='#fff';
	inp.setAttribute('id','sp')
	tabbtns[1].style.background='transparent';
	tabbtns[1].style.color='#ff9900';
}
tabbtns[1].onclick=function(){
	var a=tabContent.children[0].firstElementChild.innerHTML='您可以查询店铺的名称';
	inp.style.marginTop=5+'px';
	inp.setAttribute('id','dp')
	tabbtns[1].style.background='#ff9900';
	tabbtns[1].style.color='#fff';
	tabbtns[0].style.background='transparent';
	tabbtns[0].style.color='#ff9900';
}
inp.onfocus=function(){
	this.previousElementSibling.style.display='block';
	this.style.marginTop=0+'px';
	this.parentNode.style.border='1px solid #00AEF0'
}
inp.onblur=function(){
	this.previousElementSibling.style.display='none';
	this.style.marginTop=5+'px';
	this.parentNode.style.border='none';
}
var product=$('.product')[0];
//console.log(product);
 var iH = window.innerHeight;
//console.log(allProducts);
$('.searchbtn')[0].onclick=function(){
	var  inp =$('.inp')[0];
	var idname = inp.getAttribute('id');
	
	if(inp.value.trim() ){
			window.location.href='view/select.html'
			window.sessionStorage.setItem('search',idname+'/'+inp.value);
	}else{
		window.location.href='view/products.html'
	}

}
forEach(allProducts,function(data,i){
	if(i<20){
		//console.log(data.P_info.p_img);
		 var li=document.createElement('li');
		var a=document.createElement('a');
		li.appendChild(a);
		bind(li,'click',function(){
			window.location.href=`view/product_details.html?${data.p_id}`;
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
			
		product.appendChild(li); 
	}
		
})

var iLis =$('li',product)
//console.log(iLis)

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
/* forEach(Products,function(data,i){
		var li=document.createElement('li');
		var a=document.createElement('a');
		li.appendChild(a);
		var img =document.createElement('img');
		img.src=`https://img.buyimp.com/${data.p_img}`;
		a.appendChild(img)
		var p1 =document.createElement('p');
		p1.innerHTML=`<strong>${data.p_title}</strong>`;
		a.appendChild(p1);
		var p2 = document.createElement('p');
		if(data.p_Price !=0){
			var del = document.createElement('del');
			del.innerHTML='￥'+data.p_Price;
			p2.appendChild(del)
			}
			var span = document.createElement('span');
			span.innerHTML='￥'+data.p_nowprice;
			p2.appendChild(span)
			
			a.appendChild(p2)
			var p3 =document.createElement('p');
			p3.innerHTML=`<span>国内含税参考价￥${data.P_inchina}</span>`;
			a.appendChild(p3);
			
		product.appendChild(li);
}) */
var shop=$('.shop')[0];
	
forEach(shops,function(data,i){
	var li=document.createElement('li');
	
	var div=document.createElement('div');
		div.innerHTML=`<a href="#">
								<img src="img/index/loveIcon_03.gif">
							</a>
							<h2>
								<a href="#">
									<img src="https://img.buyimp.com/${data.s_logo}">
								</a>
								<ul>
									<li>商铺</li>
									<li>${data.s_title}</li>
								</ul>
							</h2>
							<p class="introce">${data.s_introduce}
							</p>`;
							
						var ul =document.createElement('ul')
						forEach(data.s_type,function(data1,j){
						var li1 = document.createElement('li');
						 li1.innerHTML=data1;
						 ul.appendChild(li1)
						})
					div.appendChild(ul)
				li.appendChild(div);
				var introceduce=$('.introce',div)[0];
				var introce= $('.introce',div)[0].innerHTML.split('');
				console.log(introce.length)
				 if(introce.length>40){
					introceduce.innerHTML= '';
					 introce.splice(40,100000)
					 console.log(introce)
					introceduce.innerHTML=introce.join('')+'......<span>更多</span>';
					
				} 
				//console.log(introce)
				var div2=document.createElement('div');
				forEach(data.s_pro,function(data3,l){
					if(l>2){
						return;
					}
					var As=document.createElement('a');
					As.innerHTML=`<img alt="${data3.pro_intro}" src="https://img.buyimp.com/${data3.pro_img}" >`;
					div2.appendChild(As)
					
				})
				var oa = document.createElement('a');
				oa.innerHTML=`<p>
									<span>${data.s_pnum}</span>
									<span>件商品</span>
								</p>`;
				div2.appendChild(oa)
				li.appendChild(div2)
				shop.appendChild(li)
})

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
			window.location.href='view/shoppingcar.html';
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
			window.location.href='view/users.html' ;
		})
		/* yhxx.children[1].children[5].click=function(){
			
			
		} */
		console.log(yhxx.children[1].children[5]);
		yhxx.onmouseleave=function(){
			this.children[1].style.display='none';
		}
		
	}else{
		
			bind(tk,'click',function(){
				window.location.href='view/users.html';
			})
	}
	
}

	