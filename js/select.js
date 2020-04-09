var session = window.sessionStorage.getItem('search');
var sessiontype =session.split('/')[0];
var sessionvalue=session.split('/')[1];
console.log(sessiontype,sessionvalue);

if(sessiontype=='sp'){
	$('.spss')[0].value=sessionvalue
	
	var b =fuzzyQuery(allProducts, sessionvalue)
	
			if(b.length==0){
				$('.allproduct')[0].innerHTML='<p>暂未查询到你搜索的商品</p>';
			}else{
				$('.allproduct')[0].innerHTML ='';
			for (var i = 0; i <b.length; i++) {
				var div = document.createElement('div');
				div.className = 'col-lg-3 product';
				div.innerHTML =
					`
					<a href="product_details.html?${b[i].p_id}">
						<img src="https://img.buyimp.com/${b[i].P_info.p_img}" >
					</a>
					<h3>${b[i].P_info.p_title}</h3>
				`;
				$('.allproduct')[0].appendChild(div);	
				
			}
		} 
	
}else if(sessiontype=='dp'){
	$('.dpss')[0].value=sessionvalue;
		var a =fuizzyQuery(shops, sessionvalue);
	if(a.length==0){
		$('.allproduct')[0].innerHTML='<p>暂未查询到你搜索的店铺</p>';
	}else{
		$('.allproduct')[0].innerHTML ='';
			var str='';
			forEach(a,function(data,i){
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
				$('.allproduct')[0].innerHTML=str;
	} 
		
}
$('.SPSS')[0].onclick=function(){
	var val =$('.spss')[0].value;
	if(val.trim()){
		var c=fuzzyQuery(allProducts, val)
		if(c.length==0){
				$('.allproduct')[0].innerHTML='<p>暂未查询到你搜索的商品</p>';
			}else{
				$('.allproduct')[0].innerHTML ='';
				for (var i = 0; i <c.length; i++) {
				var div = document.createElement('div');
				div.className = 'col-lg-3 product';
				div.innerHTML =
					`
					<a href="product_details.html?${c[i].p_id}">
						<img src="https://img.buyimp.com/${c[i].P_info.p_img}" >
					</a>
					<h3>${c[i].P_info.p_title}</h3>
				`;
				$('.allproduct')[0].appendChild(div);	
				
			}
		} 
		
		
	}
}
$('.DPSS')[0].onclick=function(){
	var val =$('.dpss')[0].value;
	if(val.trim()){
		var a=fuizzyQuery(shops, val)
			if(a.length==0){
				$('.allproduct')[0].innerHTML='<p>暂未查询到你搜索的店铺</p>';
			}else{
				$('.allproduct')[0].innerHTML ='';
					var str='';
					forEach(a,function(data,i){
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
						$('.allproduct')[0].innerHTML=str;
			} 
		
		}
		
		
		
		
		}




forEach(protype,function(data,i){
	
	var option1 =document.createElement('option');
		option1.className='big';
		option1.value=+data.bigtype;
		option1.innerHTML=data.bigtitle;
		$('.plsx')[0].appendChild(option1)
		for(var j=0;j<data.lite.length;j++){
			var option2 =document.createElement('option');
				option2.className='lite';
				option2.value=+data.bigtype+' '+data.lite[j].litetype;
				option2.innerHTML=data.lite[j].litetitle
					$('.plsx')[0].appendChild(option2)
		}
	})
var ops=$('option',$('.plsx')[0])
document.getElementById('select').addEventListener('change',function(){
	var a =this.value.split(' ');
	if(a.length==1){
		var big= parseInt(a[0]);
		findpro(big)
	}else if(a.length==2){
		var big= parseInt(a[0]);
		var lite= parseInt(a[1]);
		findpro(big,lite)
	}
},true);
 	function findpro(big,lit){
		//$('.page')[0].style.display='none'
		//var proout=$('.proout')[0];
		$('.allproduct')[0].innerHTML='';
		if(lit){
			var a =allProducts.filter(function(data){
				return data.p_type==big && data.p_ltype==lit;
			})
		}else{
			var a =allProducts.filter(function(data){
			return data.p_type==big;
		})
		}
		
		//$('.gesh')[0].innerHTML=`产品（${allProducts.length}中的${1}-${a.length}）`;
		for (var i = 0; i <a.length; i++) {
			var div = document.createElement('div');
			div.className = 'col-lg-3 product';
			div.innerHTML =
				`
				<a href="product_details.html?${a[i].p_id}">
					<img src="https://img.buyimp.com/${a[i].P_info.p_img}" >
				</a>
				<h3>${a[i].P_info.p_title}</h3>
			`;
			$('.allproduct')[0].appendChild(div);	
			
		}
	}    

	function fuzzyQuery(list, keyWord) {
	    var arr = [];
	    for (var i = 0; i < list.length; i++) {
	      if (list[i].P_info.p_title.indexOf(keyWord) >= 0) {
	        arr.push(list[i]);
	      }
	    }
	    return arr;
	  }


function fuizzyQuery(list, keyWord) {
	    var arr = [];
	    for (var i = 0; i < list.length; i++) {
	      if (list[i].s_title.indexOf(keyWord) >= 0) {
	        arr.push(list[i]);
	      }
	    }
	    return arr;
	  }




//排序
