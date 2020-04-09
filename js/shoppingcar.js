//加减
carlist();

function carlist() {
	var tbbody = $('.tbbody')[0];
	var fiPrice = $('.fiPrice')[0];
	var allchecked = false;
	var data = window.localStorage.getItem('list' + document.cookie.split(';')[0].split('=')[1]);
	data = JSON.parse(data)
	var checkArr = [];
	var airobj = {};
	var xarr = [];
	forEach(data, function(data1, i) {

		var index = i;
		var a = allProducts.filter(function(data) {
			return data.p_id == data1.pid;
		})
		var div = document.createElement('div');
		div.className = 'tbtr row';
		div.innerHTML =
			`
			
				<div class="shop col-lg-12  ">
					<div class="inp"><input type="checkbox" name="" id="" value="${data1.pid}" /></div>
					<p>页申化妆品专营店</p>
					<p>收货地址：${data1.adress}</p>
				</div>
				
				<div class="col-lg-2 check">
					<div class="inp"><input type="checkbox" name="" id="" value="${data1.pid}" /></div>
					</div>
				<div class="col-lg-5 pname ">
					<a href="product_details.html?${data1.pid}">
						<img src="https://img.buyimp.com/${a[0].P_info.p_img}">
					</a>
					<a>${a[0].P_info.p_title}</a>
				</div>
				<div class="col-lg-1 pprice">￥${a[0].P_info.p_nowprice}</div>
				<div class="col-lg-2 pnum">
					<button class="minus">-</button><input type="text" name=""  id="num" value="${data1.num}" /><button class="plus">+</button>
					<p class="info"></p>
				</div>
				<div class="col-lg-1 pAprice"><strong>￥${ parseInt((data1.num *a[0].P_info.p_nowprice)*100)/100 }</strong></div>
				<div class="col-lg-1 status"><a href="javascript:;">删除该商品</a></div>
			
			
			
			
			`;

		tbbody.appendChild(div)
		var mi = $('.minus', div)[0];
		var pl = $('.plus', div)[0];
		var allp = mi.parentNode.nextElementSibling.firstElementChild;
		var info = $('.info', div)[0];

		//购物车加减
		bind(mi, 'click', function() {
			var val = mi.nextElementSibling.value;
			if (val <= 1) {
				this.nextElementSibling.value = 1;
				info.innerHTML = '';
				info.innerHTML = '不能再减了,最少一件';
			} else {
				this.nextElementSibling.value = parseFloat(val) - 1;

			}
			data[index].num = val;

			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data));
			val = parseFloat(mi.nextElementSibling.value);
			var dpri = parseFloat((this.parentNode.previousElementSibling.innerHTML).substr(1));
			allp.innerHTML = '￥' + (parseInt(val * dpri * 100)) / 100;
			var lipri = parseInt(val * dpri * 100) / 100;
			if (this.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.checked == true) {
				airobj[index] = parseFloat(allp.innerHTML.substr(1))
				alpri(airobj);
			}
			//airobj[index]=parseFloat(allp.innerHTML.substr(1))
			//alpri(airobj);
		});

		bind(pl, 'click', function() {
			var val = pl.previousElementSibling.value;
			this.previousElementSibling.value = parseFloat(val) + 1;
			val = parseFloat(pl.previousElementSibling.value);
			data[index].num = val;
			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data));
			var dpri = parseFloat((this.parentNode.previousElementSibling.innerHTML).substr(1));
			allp.innerHTML = '￥' + (parseInt(val * dpri * 100)) / 100;
			var lipri = parseInt(val * dpri * 100) / 100;
			if (this.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.checked == true) {
				airobj[index] = parseFloat(allp.innerHTML.substr(1))
				alpri(airobj);
			}
			console.log()

		});
		//单个删除商品
		var status = $('.status  a', div)[0];
		bind(status, 'click', function() {
			confirmAct.call(status)

			function confirmAct(el) {
				if (confirm('你确定要将该商品从你的购物车中删除吗?')) {
					this.parentNode.parentNode.remove();
					data.splice(index, 1);
					var key = 'list' + document.cookie.split(';')[0].split('=')[1];
					//console.log(key)
					window.localStorage.setItem(key, JSON.stringify(data));
					pinum()
					pnum()
					airobj[index] = 0;
					alpri(airobj);

				} else {
					window.location.reload();
				}

			}

		})
		//删除选中商品
		var inps = $('.inp input', div);
		bind(inps[0], 'click', function() {

			if (this.checked == true) {
				inps[1].checked = true;
				checkArr.push(index);
				allcheck(checkArr);
				airobj[index] = parseFloat(allp.innerHTML.substr(1))
				alpri(airobj);
				xarr.push(this.value)
			} else {
				allchecked = false;
				inps[1].checked = false;
				checkArr.splice(checkArr.indexOf(index), 1);
				allcheck(checkArr)
				airobj[index] = 0;
				//console.log(airobj);
				alpri(airobj);
				xarr.splice(xarr.indexOf(this.value), 1);
			}
			//console.log(checkArr)
		})
		bind(inps[1], 'click', function() {

			if (this.checked == true) {
				inps[0].checked = true;
				checkArr.push(index);
				allcheck(checkArr)
				airobj[index] = parseFloat(allp.innerHTML.substr(1))
				alpri(airobj);
				xarr.push(this.value)
			} else {
				allchecked = false;
				inps[0].checked = false;
				checkArr.splice(checkArr.indexOf(index), 1);
				xarr.splice(xarr.indexOf(this.value), 1);
				allcheck(checkArr, allchecked)
				airobj[index] = 0;
				alpri(airobj);
			}
			//console.log(checkArr)
		})
	})


	var delanny = $('.delanny')[0];
	bind(delanny, 'click', function() {
		//console.log(checkArr)
		delannys(checkArr, allchecked, airobj);
		//console.log(checkArr);
	})

	function delannys(obj, allchecked) {
		//console.log(allchecked)
		if (allchecked) {
			//console.log(obj)
			//console.log(allchecked)
			var tbtr = $('.tbtr');
			if (confirm('你确定要将该商品从你的购物车中删除吗?')) {
				for (var i = 0; i < tbtr.length; i++) {
					tbtr[i].remove()
				}
				data = [];
				var key = 'list' + document.cookie.split(';')[0].split('=')[1];
				window.localStorage.setItem(key, JSON.stringify(data));
				pinum()
				pnum()
				airobj = {};
				alpri(airobj)
				checkArr = [];
				console.log(checkArr)
			} /**/
		} else {
			var tbtr = $('.tbtr');
			if (obj.length == 0) {
				return;
			}
			//console.log(obj);
			//console.log(allchecked)
			if (confirm('你确定要将该商品从你的购物车中删除吗?')) {
				for (var i = 0; i < obj.length; i++) {
					delete data[obj[i]];
					tbtr[obj[i]].remove();
				}
				var newarr2 = [];
				for (var j = 0; j < data.length; j++) {
					if (data[j]) {
						newarr2.push(data[j])
					}
				}
				window.localStorage.removeItem('list' + document.cookie.split(';')[0].split('=')[1]);
				window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(newarr2));

				pinum()
				pnum()
				alpri(airobj)
				checkArr = [];

			} /**/
		}


	}

	var ainps = $('.ainp input');
	bind(ainps[0], 'click', function() {
		var tbtr = $('.tbtr');
		if (this.checked == true) {
			ainps[1].checked = true;
			forEach(tbtr, function(el, j) {
				var inps = $('.inp input', el);
				//console.log(inps);
				forEach(inps, function(el) {

					el.checked = true;
				})
				checkArr.push(j);
			})
			allchecked = true;

			var divList = $('.tbtr');
			var arr = [];
			forEach(divList, function(el, i) {
				var mi = $('.minus', el)[0];
				var allp = parseFloat((mi.parentNode.nextElementSibling.firstElementChild.innerHTML).substr(1));

				airobj[i] = allp;
			})

		} else {
			allchecked = false;
			//ainps[0].checked = false;
			ainps[1].checked = false;
			forEach(tbtr, function(el, j) {
				var inps = $('.inp input', el);
				//console.log(inps);
				forEach(inps, function(el) {
					el.checked = false;
				})

			})

			checkArr = [];
			var divList = $('.tbtr');
			var arr = [];
			forEach(divList, function(el, i) {
				var mi = $('.minus', el)[0];
				var allp = parseFloat((mi.parentNode.nextElementSibling.firstElementChild.innerHTML).substr(1));
				airobj[i] = 0;
			})
		}
		pppp()
	})
	bind(ainps[1], 'click', function() {
		var tbtr = $('.tbtr');
		if (this.checked == true) {
			ainps[0].checked = true;
			forEach(tbtr, function(el, j) {
				var inps = $('.inp input', el);
				//console.log(inps);
				forEach(inps, function(el) {
					el.checked = true;
				})
				checkArr.push(j);
			})
			allchecked = true;
			var divList = $('.tbtr');
			var arr = [];
			forEach(divList, function(el, i) {
				var mi = $('.minus', el)[0];
				var allp = parseFloat((mi.parentNode.nextElementSibling.firstElementChild.innerHTML).substr(1));

				airobj[i] = allp;
			})

		} else {
			allchecked = false;
			ainps[0].checked = false;
			forEach(tbtr, function(el, j) {
				var inps = $('.inp input', el);
				//console.log(inps);
				forEach(inps, function(el) {
					el.checked = false;
				})

			})
			checkArr = [];
			var divList = $('.tbtr');
			var arr = [];
			forEach(divList, function(el, i) {
				var mi = $('.minus', el)[0];
				var allp = parseFloat((mi.parentNode.nextElementSibling.firstElementChild.innerHTML).substr(1));
				airobj[i] = 0;
			})
		}
		pppp()
	})



	function allcheck(obj) {
		var ainps = $('.ainp input');
		var tbtr = $('.tbtr');
		var a = parseInt($('.Allnum')[0].innerHTML);
		if (obj.length == a) {
			allchecked = true;
			ainps[0].checked = true;
			ainps[1].checked = true;

		} else {
			allchecked == false;
			ainps[0].checked = false;
			ainps[1].checked = false;
		}

	}
	var settlement = $('.settlement')[0];

	bind(settlement, 'click', function() {
		if (checkArr.length != 0) {
			Settlement(checkArr, xarr, allchecked)
			pnum()
			pinum()
			window.location.href = 'shoppingList.html'
		}



	})


}

function Settlement(obj, xarr, allchecked) {
	var data = window.localStorage.getItem('list' + document.cookie.split(';')[0].split('=')[1]);
	data = JSON.parse(data)


	var tbtr = $('.tbtr');
	var overlist = 'overlist' + document.cookie.split(';')[0].split('=')[1];
	//console.log(obj)
	//console.log(xarr)

	if (!window.localStorage.getItem(overlist)) {

		var overdata = [];
		if (!allchecked) {
			forEach(obj, function(indexs, j) {
				var t = new Date().getTime();
				data[indexs].intotime = timestampToTime(t);
				data[indexs].bianhao = parseInt(t) + 1;
				overdata.push(data[indexs]);
				window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(overdata));
				//console.log(1);
			})
			var newarr = [];

			for (var i = 0; i < obj.length; i++) {
				tbtr[obj[i]].remove();
				delete data[obj[i]];
			}
			var newarr2 = [];
			for (var j = 0; j < data.length; j++) {
				if (data[j]) {
					newarr2.push(data[j])
				}
			}
			window.localStorage.removeItem('list' + document.cookie.split(';')[0].split('=')[1]);
			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(newarr2));
		} else {
			forEach(obj, function(index, j) {
				tbtr[index].remove();
			})
			forEach(obj, function(indexs, j) {
				var t = new Date().getTime();
				data[indexs].intotime = timestampToTime(t);
				data[indexs].bianhao = parseInt(t) + 1;;
				overdata.push(data[indexs]);
				window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(overdata));
				//console.log(1);
			})
			data = []

			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data));

			/* alert()
			overdata = data;
			; */
			//console.log(obj)
			/* forEach(obj, function(index, j) {

				
				tbtr[j].remove();
				var t =new Date().getTime();
				data[index].intotime=timestampToTime(t);
				data[index].bianhao=t;
				window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(overdata));
			}) */
		}



	} else {

		if (!allchecked) {
			var data1 = JSON.parse(window.localStorage.getItem(overlist));
			forEach(obj, function(indexs, j) {
				var t = new Date().getTime();
				data[indexs].intotime = timestampToTime(t);
				data[indexs].bianhao = parseInt(t) + 1;;
				data1.push(data[indexs]);
				window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data1));

			})
			var newarr = [];
			for (var i = 0; i < obj.length; i++) {
				tbtr[obj[i]].remove();
				delete data[obj[i]];
			}
			var newarr2 = [];
			for (var j = 0; j < data.length; j++) {
				if (data[j]) {
					newarr2.push(data[j])
				}
			}
			window.localStorage.removeItem('list' + document.cookie.split(';')[0].split('=')[1]);
			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(newarr2));
		} else {
			forEach(obj, function(indexs, j) {
				var data1 = JSON.parse(window.localStorage.getItem(overlist));
				var t = new Date().getTime();
				data[indexs].intotime = timestampToTime(t);
				data[indexs].bianhao = parseInt(t) + 1;;
				data1.push(data[indexs]);
				window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data1));
				//console.log(1);
			})
			data = []

			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data));



			/* alert()
			
			
			var a = data1.concat(data);
			window.localStorage.setItem('overlist' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(a));
			data = [];
			window.localStorage.setItem('list' + document.cookie.split(';')[0].split('=')[1], JSON.stringify(data)); */
			forEach(obj, function(index, j) {
				tbtr[index].remove();
			})
		}
	}
}

function alpri(obj) {

	var ainps = $('.ainp input');
	var divList = $('.tbtr');
	var a = 0;
	for (var attr in obj) {
		a = a + obj[attr];
	}
	$('.fiPrice')[0].innerHTML = '￥' + parseInt(a * 100) / 100;


}

//增减
function pppp() {
	var ainps = $('.ainp input');
	if (ainps[0].checked == true) {

		var divList = $('.tbtr');
		var arr = [];
		forEach(divList, function(el, i) {
			var mi = $('.minus', el)[0];
			var allp = parseFloat((mi.parentNode.nextElementSibling.firstElementChild.innerHTML).substr(1));

			arr.push(allp)
		})

		var truep = null;
		for (var i = 0; i < arr.length; i++) {
			truep = truep + arr[i];

		}
		truep = parseInt(truep * 100) / 100;
		$('.fiPrice')[0].innerHTML = '￥' + truep;
	} else {
		$('.fiPrice')[0].innerHTML = '0';
	}

}

/* function  plusMinus(){
	
} */

pinum()

function pinum() {
	var user = document.cookie.split(';')[0].split('=')[1];
	if (user) {
		var userlist = window.localStorage.getItem('list' + user)
		if (userlist) {
			userlist = JSON.parse(userlist);

			$('.Allnum')[0].innerHTML = userlist.length;
		} else {
			$('.Allnums')[0].innerHTML = 0;
		}

	}

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


var t = new Date().getTime();
console.log(timestampToTime(t))

function timestampToTime(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = change(date.getDate()) + ' ';
	h = change(date.getHours()) + ':';
	m = change(date.getMinutes()) + ':';
	s = change(date.getSeconds());
	return Y + M + D + h + m + s;
}

function change(t) {
	if (t < 10) {
		return "0" + t;
	} else {
		return t;
	}
}

var tj=$('.tj')[0].firstElementChild;
forEach(allProducts,function(data,i){
	if(i<5){
		//console.log(data.P_info.p_img);
		 var li=document.createElement('li');
		var a=document.createElement('a');
		li.appendChild(a);
		bind(li,'click',function(){
			window.location.href=`product_details.html?${data.p_id}`;
		})
		var img =document.createElement('img');
		img.setAttribute('src',`https://img.buyimp.com/${data.P_info.p_img}`);
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
			
		tj.appendChild(li); 
	}
		
})
