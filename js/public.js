//导航

var navright = $('.Znavright')[0];
var lis = $('li', navright);
var As = $('a', navright);
var lan = document.querySelector('.language');
var tk = document.querySelectorAll('.tk');
/* forEach(As, function(el, i) {
	bind(el, 'mouseenter', function() {
	 	for (var k = 0; k < As.length; k++) {
			As[k].style.background = '';
		}
		if (i == 0) {
			lan.style.display = 'block';
			//console.log('5')
		} else { 
			tk[k].style.top='85px';
			tk[k].style.opacity=1;
			
	 } 
		//tk[i].style.display='none';
		el.style.background = '#ff9900';
	})
	bind(el, 'mouseleave', function() {
		for (var i = 0; i < As.length; i++) {
			As[i].style.background = '';
		}
	})
}) */
lis[0].onmouseenter = function() {
	lan.style.display = 'block';

}
lis[0].onmouseleave = function() {
	lan.style.display = 'none';
}
//console.log(oMenuData);
/* bind(navlis[0],'hover',) */
//menu菜单栏
var menu = '';

var menuAll = $('.menu')[0];

forEach(oMenuData, function(data, i) {
	//console.log(data.content);
	menu +=
		`<li class="${i}" >
							<a href="javascript:;">
								${data.title}<span class="glyphicon glyphicon-chevron-down"></span>
							</a>
							<div class="menuTk">
								<div class="menuLeft">
									<ul class='list2'>
										 
									</ul>
							
								</div>
								<div class=" menuCenter">
							
									
								</div>
								<div class="menuRight ">
									
								</div>
							</div>
							
						</li>`;
});

menuAll.innerHTML = menu;

var menuLis = $('li', menuAll);
forEach(menuLis, function(el, i) {
	el.onmouseenter = function() {
		var Mi = this.className;
		var menuTK = $('.menuTk', el)[0];
		var list2 = $('.list2', menuTK)[0];
		var menuCenter = $('.menuCenter', menuTK)[0];
		var menuRight = $('.menuRight', menuTK)[0];
		menuTK.style.display = 'block';
		//console.log(oMenuData[Mi].content);
		list2.innerHTML = '';
		menuRight.innerHTML='';
		forEach(oMenuData[Mi].content, function(data, k) {
			//console.log(data.contentType)
			var li = document.createElement('li');
				li.innerHTML = `<span>${data.contentTitle}</span> <span class="glyphicon glyphicon-arrow-right"></span>`;
			
			if (k == 0) {
			li.className = 'active';
			var h1=document.createElement('h1');
			h1.innerHTML=data.contentTitle;
			var p=document.createElement('p');
			for(var i=0;i<data.contentType.length;i++){
				menuCenter.innerHTML='';
				var span=document.createElement('span');
				span.innerHTML=data.contentType[i];
				p.appendChild(span)
			}
			menuCenter.appendChild(h1);
			menuCenter.appendChild(p);
			
			
			for(var i=0;i<data.contentPicture.length;i++){
				
				var dis=document.createElement('div');
				dis.innerHTML=`<a href="view/product_details?${data.contentPicture[i].ID}">
								<img src="https://img.buyimp.com/${data.contentPicture[i].image_key}-usual" alt="">
							</a>`;
				menuRight.appendChild(dis)
			}
		}
			list2.appendChild(li)
			
		})
		var leftLis = $('li', list2);	
		forEach(leftLis,function(el,i){
			bind(el,'mouseenter',function(){
				menuRight.innerHTML='';
				menuCenter.innerHTML='';
				forEach(siblings(el,'li'),function(ee,i){
					ee.className='';
				})
				this.className='active';
				var tdata=oMenuData[Mi].content[i];
				
				var h1=document.createElement('h1');
				h1.innerHTML=tdata.contentTitle;
				var p=document.createElement('p');
				forEach(tdata.contentType,function(data,i){
					menuCenter.innerHTML='';
					var span=document.createElement('span');
					span.innerHTML=data;
					p.appendChild(span)
					
				})
					menuCenter.appendChild(h1);
				menuCenter.appendChild(p);
				
				
				forEach(tdata.contentPicture,function(data,i){
					console.log(data.image_key)
					var dis=document.createElement('div');
					dis.innerHTML=`<a href="view/product_details.html?${data.ID}">
									<img src="https://img.buyimp.com/${data.image_key}-usual" alt="">
								</a>`;
					menuRight.appendChild(dis) 
				})
				
			
				
				
				
				
				console.log(tdata.contentTitle);
				
				
				
				/* var h1=document.createElement('h1');
				h1.innerHTML=oMenuData[Mi].content[i].contentTitle;
				var p=document.createElement('p'); */
				
				
				
				
				
			})
		})
	}

	el.onmouseleave = function() {
		var menuTK = $('.menuTk', el)[0];
		menuTK.style.display = 'none';

	}
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
var backtotop = $('.backToTop')[0];
//console.log(backtotop)
bind(backtotop, 'click', function() {
	var top = window.pageYOffset;
	var timer = setInterval(function() {
		top -= 50;
		window.scrollTo(0, top);
		if (top <= 0) {
			clearInterval(timer);
		}
	}, 20);
}) /**/
//检测是否有用户

	function zxmcook(name,value,time){ //函数名字自己随意定义，zxm是哥哥我名字，你就不要郁闷了
			var exp=new Date();
			exp.setTime(exp.getTime()+time*60*24*60*1000); //这里的time就是天数
			document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString()+";path="+escape("/");
			}
