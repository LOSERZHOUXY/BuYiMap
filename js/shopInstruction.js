	   
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