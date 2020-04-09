
//订单
var tbbody=$('.tbbody')[0];
var overdata =JSON.parse(window.localStorage.getItem('overlist' + document.cookie.split(';')[0].split('=')[1]));
console.log(allProducts);
console.log(overdata)
var username=document.cookie.split(';')[0].split('=')[1];
forEach(overdata,function(data,i){
	var a = allProducts.filter(function(data1) {
		return data1.p_id == data.pid;
	})
	var div = document.createElement('div');
	div.className = 'tbtr row';
	div.innerHTML =`
		<div class="shop col-lg-12  ">
			<p>${data.intotime}</p>
			<p>订单号：${data.bianhao}</p>
		</div> 
		<div class="col-lg-6 pname">
			<a href="javascript:;">
				<img src="https://img.buyimp.com/${a[0].P_info.p_img}">
			</a>
			<a>${a[0].P_info.p_title}</a>
		
			<div class="gmsl">
				x${data.num}
			</div>
		</div>
		<div class="col-lg-1 username">${username}</div>
								
		<div class="col-lg-2 pAprice"><strong>￥${ parseInt((data.num *a[0].P_info.p_nowprice)*100)/100 }</strong></div>
		<div class="col-lg-2 status"><a href="javascript:;">评价</a></div>
	
	
	
	`;
	
	tbbody.appendChild(div)
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
	   
	   pinum()
	   
	   function pinum() {
	   	var user = document.cookie.split(';')[0].split('=')[1];
	   	if (user) {
	   		var userlist = window.localStorage.getItem('overlist' + user)
	   		if (userlist) {
	   			userlist = JSON.parse(userlist);
	   
	   			$('.Allnum')[0].innerHTML = userlist.length;
	   		} else {
	   			$('.Allnums')[0].innerHTML = 0;
	   		}
	   
	   	}
	   
	   }
	   