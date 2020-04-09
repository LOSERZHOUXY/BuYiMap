var lan= $('.language')[0];
var bShop= $('.bShop')[0];
console.log(lan)
bind(lan,'mouseenter',function(){
	this.lastElementChild.style.display='block';
	
	this.lastElementChild.firstElementChild.lastElementChild.style.display='none';
	this.lastElementChild.lastElementChild.lastElementChild.style.display='none';
})
var lis=$('li',lan);
forEach(lis,function(el,i){
	bind(el,'click',function(){
		this.lastElementChild.style.display='block';
		this.parentNode.previousElementSibling.innerHTML=this.innerHTML;
		
		this.parentNode.style.display='none';
	})
});
bind(lan,'mouseleave',function(){
	this.lastElementChild.style.display='none';
	this.lastElementChild.firstElementChild.lastElementChild.style.display='block';
	this.lastElementChild.lastElementChild.lastElementChild.style.display='block';
})

       var qh=$('.q_h')[0];
	   var onoff=true;
	   bind(qh,'click',function(){
		   
		   if(onoff){
			   this.nextElementSibling.style.display='block';
			    onoff=!onoff
		   }else{
			    this.nextElementSibling.style.display='none';
				onoff=!onoff;
		   }
			
	   });
	   
	   
	   
	   pnum()
	   function pnum(){
	   	var user =document.cookie.split(';')[0].split('=')[1];
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
	   	}else{
	   		
	   			bind(tk,'click',function(){
	   				window.location.href='users.html';
	   			})
	   	}
	   	
	   }