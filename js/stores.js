console.log(shops)
console.log(allProducts);
var allstore =$('.allstore')[0]
var str='';
forEach(shops,function(data,i){
	str+=
	'<div class="store">'+
			'<div class="storel">'+
				'<a href="javascript:;">'+
					'<img src="https://img.buyimp.com/'+data.s_logo+'" >'+
					'<p>'+data.s_title+'</p>'+
				'</a>'+
				'<a href="javascript:;"><img src="../img/stores/箭头.png" ></a>'+
				'<div>'+
					'<img src="../img/stores/user_fa04b69f98eba1c7806152130-iconusual.jpg" >'+
					'<span>联系卖家</span>'+
				'</div>'+
			'</div>'+
			'<div class="storer">';
			
				var a =allProducts.filter(function(data1,j){
						return  data1.p_shop==data.s_id;
				});
				 for(var j=0;j<a.length;j++){
						 if(j<13){
							str+=
							'<div>'+
								'<a href="product_details.html?'+a[j].p_id+'">'+
								'<img src="https://img.buyimp.com/'+a[j].P_info.p_img+'" >'+
								'</a>'+
							'</div>'
							
						  }
						  }
						  
						  
			str+=	'<div>'+
					'<a href="javascript:;">'+
						'<p>'+a.length+'</p>'+
					'<p>件商品</p>'+
				'</a>'+
				'</div>'+
			'</div>'+
		'</div>';
	}) 
	allstore.innerHTML=str;
	
/* 	console.log(data.s_id)
		var a =allProducts.filter(function(data1){
				return  data1.p_shop==data.s_id;
		});
		
		console.log(a)
		 for(var j=0;j<a.length;j++){
				 if(j<13){
					 console.log(a[j].p_img)
					  var divs=document.createElement('div');
					 divs.innerHTML=`
						<a href="product_details.html?${a[j].p_id}">
						<img src="https://img.buyimp.com/${a[j].P_info.p_img}" >
						</a>
						
					 `; 
					
				  }
				   $('.store')[i].appendChild(divs)
		}*/
 

	   
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