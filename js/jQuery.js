/*
数组求和，参数是一个数组
*/
function sum(arr) {
	var num = 0;
	for (var i = 0; i < arr.length; i++) {
		num += arr[i];
	}
	return num;
}
/*
元素获取
第一个参数：字符串，css选择器
第二个参数：可选，字符串，css选择器
*/
function $(name, parent) {
	parent = parent || document;
	var obj = parent.querySelectorAll(name);
	return obj;
}
/*
添加事件
第一个参数：需要添加事件的对象
第二个参数：需要添加的事件，是一个字符串
第三个参数：该事件需要执行的代码
*/
	function bind(el,event,fn){
				if(el.nodeType!=1){
					return;
				}
				if(el.addEventListener){
					//google
					el.addEventListener(event,function(){
						/* if(typeof fn == 'function'){
							fn.call(el);
						} */
						typeof fn =='function' && fn.call(el);
					});
				}else{
					el.attachEvent('on'+event,function(){
						if(typeof fn == 'function'){
							fn.call(el);
						}
					});
				}
			}
/*
封装一个for循环，循环一个数组
*/
function forEach(obj, fn) {
	for (var i = 0; i < obj.length; i++) {
		fn(obj[i], i);
	}
}
/*
封装一个兼容获取元素的css样式的函数
*/
function getCSS(obj, attr) {
	if (obj.currentStyle) {
		//IE
		return obj.currentStyle[attr];
	} else {
		//Chrome
		return getComputedStyle(obj)[attr];
	}
}
//封装的一个倒计时函数
function countDown(obj) {
	var now = new Date().getTime();
	var future = new Date(obj.end).getTime()
	var sec = parseInt((future - now) / 1000);
	var days = parseInt(sec / (60 * 60 * 24));
	var hours = parseInt((sec - days * (60 * 60 * 24)) / (60 * 60));
	var minustes = parseInt((sec - (days * 60 * 60 * 24) - hours * 3600) / 60);
	var secs = parseInt(sec - (days * 60 * 60 * 24) - hours * 3600 - minustes * 60);
	if (days < 10) days = "0" + days;
	if (hours < 10) hours = "0" + hours;
	if (minustes < 10) minustes = "0" + minustes;
	if (secs < 10) secs = "0" + secs;
	typeof obj.success == 'function' && obj.success({
		days: days,
		hours: hours,
		minustes: minustes,
		secs: secs
	})
}
//倒计时传参
/* countDown({
			end:new Date(endTime).getTime(),
			success:function(date){
				console.log(date.days+''+date.hours+date.minustes+date.secs);
			}
		}) */

//封装一个移出类名的函数
function removeClass(obj, className) {
	if (obj.className) {
		var arr = obj.className.split(' ');
		if (arr.indexOf(className) != -1) {
			arr.splice(arr.indexOf(className), 1)
			obj.className = arr.join(' ')
		}
	}
}

//封装一个添加类名的函数
function addClass(obj, className) {
	var str = obj.className
	if (obj.className) {
		if (str.indexOf(className) == -1) {
			obj.className = obj.className + ' ' + className;
		}
	} else {
		obj.className = className;
	}
}
//查找该元素上面的所有兄弟元素
//参数为从哪儿开始查找的元素
function prevAll(el) {
	//判断参数是否为元素
	if (el.nodeType != 1) {
		return;
	}
	//定义空数组
	var arr = [];
	//封装一个递归查询元素的函数
	function fn(el) {
		//查找参数的上一个兄弟元素
		var pre = el.previousElementSibling;
		//判断参数的上一个兄弟元素是否为空
		if (pre != null) {
			//不为空,则将上一个兄的元素添入数组后
			arr.push(pre);
			//二次调用函数,继续往上查找兄弟元素,当上一个兄弟元素为空时,不在调用
			fn(pre);
		}
	}
	fn(el);
	return arr.reverse();
}
//查找该元素下面的所有兄弟元素
//参数为从哪儿开始查找的元素
function nextALL(el) {
	if (el.nodeType != 1) {
		return;
	}
	var arr = [];

	function fn(el) {
		var next = el.nextElementSibling;
		if (next != null) {
			arr.push(next);
			fn(next);
		}
	}
	fn(el);
	return arr;
}




//封装一个查找兄弟元素的函数
function siblings(el, str) {
	//判断传来的第一个参数是否为元素，不是元素则退出函数
	if (el.nodeType != 1) {
		return;
	}
	//定义一个新书徐，用来返回
	var arr = [];
	//查找传来元素的父级元素的所有子元素
	var all = el.parentNode.children;
	//剔除所有子元素中的自己；并加入数组
	for (var i = 0; i < all.length; i++) {
		if (all[i] != el) {
			arr.push(all[i])
		}
	}
	//判断第二个参数是否有值，有就进行下一步
	if (str) {
		//截取第二个参数的，判断传过来的值是类名还是元素
		var first = str.substr(0, 1)
		//是类名则进行下一步
		if (first == '.') {
			var arr3 = []; //定义一个新数组用来返回
			var one = str.substring(1); //截取参数类名(去掉 . )
			for (var j = 0; j < arr.length; j++) { //遍历查到的所有的兄弟元素
				var clName = arr[j].className.split(' '); //将每个兄弟元素的类名按空格拆分成数组
				for (var i = 0; i < clName.length; i++) { //遍历兄弟元素的类名
					if (clName[i] == one) { //如果兄弟元素的类名等相等与第二参数
						arr3.push(arr[j]) //将筛选的所有元素加入返回数组
					}
				}
			}
			return arr3; //返回筛选后的数组
		} else { //不是类名则按元素名查找

			var arr1 = []; //定义一个新数组用来返回
			for (var k = 0; k < arr.length; k++) { //遍历查找到的兄弟元素
				if (arr[k].nodeName == str.toUpperCase()) { //判断所有兄弟元素的元素名是否与第二参数的元素名相同
					arr1.push(arr[k]); //相同则加入返回数组
				}
			}
			return arr1; //返回筛选后的数组
		}

	} else { //第二个参数无值则直接返回查找到的数组
		return arr;
	}
}


function brother(el) {
	return prevAll(el).concat(nextALL(el));
}
