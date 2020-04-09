var Tween = {
	linear: function (t, b, c, d){return c*t/d + b;},
	easeIn: function(t, b, c, d){return c*(t/=d)*t + b;},
	easeOut: function(t, b, c, d){return -c *(t/=d)*(t-2) + b;},
	easeBoth: function(t, b, c, d){if ((t/=d/2) < 1) {return c/2*t*t + b;} return -c/2 * ((--t)*(t-2) - 1) + b;},
	easeInStrong: function(t, b, c, d){return c*(t/=d)*t*t*t + b;},
	easeOutStrong: function(t, b, c, d){return -c * ((t=t/d-1)*t*t*t - 1) + b;},
	easeBothStrong: function(t, b, c, d){if ((t/=d/2) < 1) {return c/2*t*t*t*t + b;} return -c/2 * ((t-=2)*t*t*t - 2) + b;},
	elasticIn: function(t, b, c, d, a, p){if (t === 0) {return b;} if ( (t /= d) == 1 ) {return b+c;}
	if (!p) {p=d*0.3;} if (!a || a < Math.abs(c)) {a = c; var s = p/4;} else {var s = p/(2*Math.PI) * Math.asin 	(c/a);} return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;},
	elasticOut: function(t, b, c, d, a, p){if (t === 0) {return b;} if ( (t /= d) == 1 ) {return b+c;} if (!p) {p=d*0.3;}
	if (!a || a < Math.abs(c)) {a = c; var s = p / 4;} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};


/*
	书写一个运动的函数
	作用 ：元素移动起来有动画效果
	参数 ：
		el : 运动的元素
		attr : 哪一个样式有动画效果
		target : 目标位置
		time : 运动时间
		type : 运动的方式
		fn   : 是一个函数，在定时器里面，调用
		callback   : 是一个函数，在关闭定时器时，调用函数,回调函数
		
*/ 
function move(el,attr,target,time,type,fn,callback){
	var t = 0;
	
	var b = parseFloat(getCSS(el,attr));  // 初始值
	
	var c = target - parseFloat(getCSS(el,attr));        // 当前值与目标值之间的插值
	
	var d = time/20;   // 定时器的次数
	
	var timer = null;
	
	
	timer = setInterval(function(){
		t++;
		var reslut = Tween[type](t,b,c,d);
			
		if(attr == 'opacity'){
			
			el.style[attr] = reslut;
		}else{
			el.style[attr] = reslut + 'px';
		}
		
		if(typeof fn == 'function'){
			fn()
		}
		
		if(t>=d){
			// 关闭定时器
			clearInterval(timer);	
			
			if(typeof callback == 'function'){
				callback()
			}
			
		}
	},20);
}

function moreAttrs(obj){
	var t = 0;
	
	var b = {};  // 初始值
	
	var c = {};        // 当前值与目标值之间的插值
	
	var d = obj.time/20;   // 定时器的次数
	
	var timer = null;
	for(var attr in obj.attrs){
		b[attr] = parseFloat(getCSS(obj.el, attr));
		c[attr] = obj.attrs[attr] - parseFloat(getCSS(obj.el, attr));
	}
	 timer = setInterval(function(){
		 t++;
		for(var k in b){
			var reslut = Tween[obj.type](t,b[k],c[k],d);
			if(k == 'opacity'){			
				obj.el.style[k] = reslut;
			}else{
				obj.el.style[k] = reslut + 'px';
			}			
		}
		
		if(t>=d){
			clearInterval(timer);
		}
	},20)
}
function getCSS(obj,attr){  
   if(obj.currentStyle){
	   // ie
	   return obj.currentStyle[attr]
   }else{
	   // 谷歌
	   return getComputedStyle(obj)[attr];
   }
}