//线上
var URL = "http://egou.cnpc.com.cn:8080/SHXS";
var PICURL = "http://egou.cnpc.com.cn:8080";
// var URL = "http://127.0.0.1:8080/SHXS";
//var PICURL = "http://127.0.0.1:8080";

// 9002
// var URL = "http://106.38.74.232:9002/SHXS";
// var PICURL = "http://106.38.74.232:9002";

// 194
//  var URL = "http://11.11.153.194:8080/SHXS";
//  var PICURL = "http://11.11.153.194:8080";

// 岩
// var URL = "http://11.0.36.205:8080/SHXS";
// var PICURL = "http://11.0.36.205:8080";

// 歌华 岩
// var URL = "http://10.88.113.24:8080/SHXS";
// var PICURL = "http://10.88.113.24:8080";

//测试
// var URL = "http://10.88.113.96:8080/SHXS";
// var PICURL = "http://10.88.113.96:8080";

var offset = "1";
//从第几条开始
var limit = 15;
//每页显示行数

var pageNo = 1;
//每页显示行数
var pageSize = 15;

var defaultDate = getDate(0, "obj");

function getId(str) {
	return document.getElementById(str);
}

function $$(selector, el) {
	if (!el) {
		el = document;
	}

	return Array.prototype.slice.call(el.querySelectorAll(selector));
}


//扩展对象
var _extend = function (option, opt) {
	if (typeof (opt) != 'object' || !opt) {
		return option;
	}
	for (var property in opt) {
		option[property] = opt[property];
	}
	return option;
};

// form表单序列化
function serialize(form) {
	var parts = [],
		field = null,
		i,
		len,
		j,
		optLen,
		option,
		optValue;

	for (i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i];

		switch (field.type) {
			case "select-one":
			case "select-multiple":

				if (field.name.length) {
					for (j = 0, optLen = field.options.length; j < optLen; j++) {
						option = field.options[j];
						if (option.selected) {
							optValue = "";
							if (option.hasAttribute) {
								optValue = (option.hasAttribute("value") ? option.value : option.text);
							} else {
								optValue = (option.attributes["value"].specified ? option.value : option.text);
							}
							parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
						}
					}
				}
				break;

			case undefined: //fieldset
			case "file": //file input
			case "submit": //submit button
			case "reset": //reset button
			case "button": //custom button
				break;

			case "radio": //radio button
			case "checkbox": //checkbox
				if (!field.checked) {
					break;
				}
				/* falls through */

			default:
				//don't include form fields without names
				if (field.name.length) {
					parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
				}
		}
	}
	return parts.join("&");
}

function getVal(str) {
	return appcan.locStorage.getVal(str);
}

function setVal(param) {
	if (typeof param === 'object' && arguments.length === 1) {
		for (var i in param) {
			appcan.locStorage.setVal(i, param[i]);
		}
	} else {
		var arr = Array.prototype.slice.call(arguments);
		appcan.locStorage.setVal(arr[0], arr[1]);
	}


}
/*
window.onerror = function (
  errMsg,
  scriptURI,
  lineNumber,
  columnNumber,
  errorObj
) {
  setTimeout(function () {
    var rst = {
      "错误信息：": errMsg,
      "出错文件：": scriptURI,
      "出错行号：": lineNumber,
      "出错列号：": columnNumber,
      "错误详情：": errorObj
    };

    alert(JSON.stringify(rst, null, 10));
  });
}; */
//AJAX sync POST
function syncLoadData(url, param, Func) {
	$.ajax({
		url: url,
		type: 'POST',
		data: param,
		dataType: 'text',
		async: false,
		// contentType: 'application/json; charset=UTF-8',
		success: function (data) {
			Func(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
			console.error(jqXHR.responseText);
			console.error('[' + textStatus + ']' + errorThrown);
		}
	});
}

function ajaxPostQuery(url, paramJsonStr, func, dataType) {
	var type = dataType || "json";
	var sid = appcan.locStorage.getVal("sid");
	var response = null;

	$.ajax({
		type: "POST",
		url: URL + '/app/admin/validationSession',
		data: "&sid=" + sid,
		success: function (data) {
			response = eval("(" + data + ")");
			if (response.hasOwnProperty('validation') && response.validation === true) {
				$.ajax({
					type: "POST",
					url: url,
					data: paramJsonStr + "&sid=" + sid,
					headers: {
						accept: "*/*"
					},
					//contentType:"application/x-www-form-urlencoded",
					dataType: type,
					timeout: 0,
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						appcan.window.alert("提示", "网络暂时不可用", "确定");
					},
					success: function (data) {
						func(data);
					}
				});
			} else {
				// token 失效
				closeToast();
				oneAlert("您的登录认证已过期，请您重新登录...", "确定", function () {

					lsrmItems(["sid", "cusId", "password", "userId", "username", "userType", "tag", "QRCode"]);
					setTimeout(function () {
						appcan.window.open("index", "../index.html", 0);
					}, 0);
				});
			}

		},
		error: function (error) {
			console.log(error);
		}
	});
}


function ajaxPostQueryDNnotVerifySid(url, paramJsonStr, func, dataType) {
	var type = dataType || "json";
	var sid = appcan.locStorage.getVal("sid");
	var username = appcan.locStorage.getVal("username");


	$.ajax({
		type: "POST",
		url: url,
		data: paramJsonStr + "&sid=" + sid,
		headers: {
			accept: "*/*"
		},
		//contentType:"application/x-www-form-urlencoded",
		dataType: type,
		timeout: 0,
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			appcan.window.alert("提示", "网络暂时不可用", "确定");
		},
		success: function (data) {

			if (typeof func === 'function') {
				func(data);
			} else {
				throw new Error('func 需要传入一个函数作为参数');
			}
		}
	});
}

function oneAlert(text, button, callback) {
	var val = button || "确定";

	appcan.window.alert({
		title: "提示",
		content: text,
		buttons: [val],
		callback: function (err, data, dataType, optId) {
			if (data == '0') {
				if (callback && typeof callback === 'function') {
					callback();
				}
			}
			if (data == '1') {}
			console.log(err, data, dataType, optId);
		}
	});
}

function twoAlert(text, button1, button2, func1, func2) {
	appcan.window.alert({
		title: "提示",
		content: text,
		buttons: [button1, button2],
		callback: function (err, data, dataType, optId) {
			if (data == '0' && typeof func1 ==='function') {
				func1();
			}
			if (data == '1' && typeof func2 ==='function') {
				func2();
			}
			console.log(err, data, dataType, optId);
		}
	});
}

// 节流函数

function throttle(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) options = {};

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		func.apply(context, args);
		if (!timeout) context = args = null;
	};

	var throttled = function () {
		var now = new Date().getTime();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
	};
	return throttled;
}

Date.prototype.formate = function (format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds(), // second
		"q+": Math.floor((this.getMonth() + 3) / 3), // quarter
		"S": this.getMilliseconds()
		// millisecond
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
// 根据num选择当前时间之前或之后,默认选择当天，支持区间（-15,15）
function getDate(num, type) {
	var dt = new Date();
	var getMonthDays = function (year, month) {
		var d = new Date(year, month, 0);
		return d.getDate();
	};
	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	var prevMonth = month - 1 || 12;
	var day = dt.getDate();

	var thisMonthDays = getMonthDays(year, month);
	var prevMonthDays = getMonthDays(year, prevMonth);
	if (day + num > 0) {
		day = day + num;
	} else if (day + num > thisMonthDays) {
		day = day + num - thisMonthDays;
		month++;
	} else if (day + num <= 0) {
		month--;
		day = prevMonthDays + day + num;
	}
	if (type === "obj") {
		var obj = {
			year: year,
			month: month,
			day: day
		};
		return obj;
	}
	// default
	var date = [
		[year, month, day].join('-'), [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(
			':')
	].join(' ').replace(/(?=\b\d\b)/g, '0');

	// 正则补零 (略微改动)
	return date;
}

function getMonth() {
	var date = new Date().formate("yyyy-MM-dd"),
		y = date.split("-")[0],
		m = Number(date.split("-")[1]);

	if (m < 10) {
		m = '0' + m;
	}
	return y + '-' + m;
}


// 获取对应月份的天数
function mGetDate(year, month) {
	var d = new Date(year, month, 0);
	return d.getDate();
}
//无数据提示统一格式
function noDataMsg(tip) {

	var msg = "<div id='time' class='ub ub-pc tip-wrapper'>" + "<span class='mf-size2 tip'>" + tip + "</span>" + "</div>";

	return msg;
}

//price = fmoney(price,2);
function fmoney(s, n) {

	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
	t = "";
	for (j = 0; j < l.length; j++) {
		t += l[j] + ((j + 1) % 3 == 0 && (j + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

function rmoney(s) {
	return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

// 单选
function cellbtnClick(id) {

	if ($("#" + id)[0].className == "m-check") {
		$("#" + id)[0].className = "m-check m-check-active";
		yesNo++;

		;
	} else {
		$("#" + id)[0].className = "m-check";
		yesNo--;

	}

	if (yesNo == listData.length) {
		$("#checkall")[0].className = "m-check m-check-active";
	} else {
		$("#checkall")[0].className = "m-check";
	}
}


// 将NodeList转为数组
function convertToArray(nodeList) {
	var array = null;
	try {
		// IE8-NodeList是COM对象
		array = Array.prototype.slice.call(nodeList, 0)
	} catch (err) {
		array = []
		for (var i = 0, len = nodeList.length; i < len; i++) {
			array.push(nodeList[i])
		}
	}
	return array;
}

function nodata(id, text) {
	var ele = document.getElementById(id);
	ele.innerHTML = '';
	var listhtml = "<div id='nodata' class='ub ub-pc' style='margin: 0.8em 0;'>" + "<span class='mf-size2 nodata'>" + text + "</span></div>";
	ele.innerHTML = listhtml;
}

function openPopPage(pageName) {
	var s = window.getComputedStyle($('#page_0')[0], null);
	//var w = parseInt(s.width);
	//var h = parseInt(s.height);
	appcan.frame.open(pageName, "../common_page/" + pageName + ".html", 0);

}

function open2PopPage(pageName) {
	var s = window.getComputedStyle($('#page_0')[0], null);
	//var w = parseInt(s.width);
	//var h = parseInt(s.height);
	appcan.frame.open(pageName, "../../common_page/" + pageName + ".html", 0);

}

function addEvent(a, b, c, d) {
	a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
}


function setStyle(e, a) {
	for (var i in a) {
		e.style[i] = a[i];
	}
}

function show(element) {
	setStyle(element, {
		"display": ""
	});
}

function hide(element) {
	setStyle(element, {
		"display": "none"
	});
}

function lsSetItems(obj) {
	for (var i in obj) {
		appcan.locStorage.setVal(i, obj[i])
	}

}

function lsrmItems(arr) {
	arr.forEach(function (i) {
		appcan.locStorage.remove(arr[i])
	});

}

function openToast(text) {
	var text = text || "加载中...";
	appcan.window.openToast(text, '0', '5', '1');
	appcan.initBounce();
}

function closeToast() {
	appcan.window.closeToast();
}

String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

var CURRENT_PAGE = 1;
var CURRENT_DATA = null;
var SHENGYU_DATA = null;
var DATA = null;

var loadMore = {
	init: function (options) {
		var y = this;
		var defaultOptions = {
			limit: 10,
			CURRENT_PAGE: 1,
			MAX_PAGE: null
		}
		y.options = _extend(defaultOptions, options);
		if (y.checkOptions()) {
			y.checkOptions().appendById(y.options.ele).bind();
			var splitNum = y.options.limit;
			DATA = y.options.data;
			SHENGYU_DATA = DATA.slice(splitNum);
		}

	},
	checkOptions: function () {
		if (!this.options.hasOwnProperty("ele") || !document.getElementById(this.options.ele)) {
			throw new Error("ele必须为getElementById可获取的dom元素,用于存放loadmore组件");
		}
		if (!this.options.hasOwnProperty('data') || !this.options.data.length || !Array.isArray(this.options.data)) {
			throw new Error('传入的分页数据不是数组格式');
		}
		if (!this.options.hasOwnProperty('totalNum') || !(typeof (this.options.totalNum) === 'number')) {
			throw new Error('分页器的总页数必须指定,且为Number类型')
		}
		if (!this.options.hasOwnProperty('clickFn') || !(typeof (this.options.clickFn) === 'function')) {
			throw new Error('请为分页器指定点击回调函数')
		}
		MAX_PAGE = Math.ceil(this.options.totalNum / Number(this.options.limit));
		this.options.MAX_PAGE = MAX_PAGE;

		if (CURRENT_PAGE === MAX_PAGE) {
			console.log('分页器完成工作任务，消失...')
			return null;
		}
		return this;
	},
	makeBtnLayout: function () {
		var box = document.createElement("div");
		box.id = "loadMore";
		box.className = "text-center";
		box.innerHTML = '<ul class="pager">' +
			'<li id="btn-load-more" class="">' +
			'<a href="javascript:;">点击载入更多</a></li>'

			+
			'<li id="btn-loading" class="hidden">' +
			'<a href="javascript:;">' +
			'<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> 载入中</a> </li>' +
			'</ul>';

		return box;
	},
	appendById: function (id) {
		var y = this;
		var box = y.makeBtnLayout();
		document.getElementById(id).appendChild(box);
		return y;
	},
	bind: function () {
		var y = this;
		var loadMore = document.getElementById("btn-load-more");
		var loading = document.getElementById("btn-loading");

		loadMore.onclick = function () {

			this.classList.add("hidden");
			loading.classList.remove("hidden");
			CURRENT_PAGE++;

			console.log('CURRENT_PAGE :' + CURRENT_PAGE)

			if (!y.options.frontendPager) {
				y.options.clickFn.call(null, CURRENT_PAGE, y.options.MAX_PAGE, y.options.totalNum)

			} else {
				// 前端分页

				if (SHENGYU_DATA.length > 0 && CURRENT_PAGE - 1 < MAX_PAGE) {

					CURRENT_DATA = SHENGYU_DATA.splice(0, y.options.limit);
					y.options.clickFn.call(null, CURRENT_PAGE, CURRENT_DATA, y.options.MAX_PAGE, y.options.totalNum)

					if (CURRENT_PAGE === MAX_PAGE) {
						document.getElementById('loadMore').remove();
						console.log('分页完毕');
						return;
					}
					y.loadingGoOn();

				}
			}
		}

	},
	loadingGoOn: function () {
		var loading = document.getElementById("btn-loading");
		var loadMore = document.getElementById("btn-load-more");
		setTimeout(function () {
			loading.classList.add("hidden");
			loadMore.classList.remove("hidden");
		}, 1000);
	}
}

// 选中的个数
var ISCHECKNUM = 0;

//全选
if (document.getElementById("checkall")) {
	appcan.button("#checkall", "ani-act", function () {

		isCheckAll();

	})
}

function isCheckAll() {
	if ($("#checkall")[0].className == "m-check") {

		$("#checkall")[0].className = "m-check m-check-active";

		for (var i = 0; i < dataLength; i++) {
			if ($("#" + i)[0]) {
				$("#" + i)[0].className = "m-check singleSelection m-check-active";
				ISCHECKNUM++;
			}
		}

	} else {
		$("#checkall")[0].className = "m-check";
		for (var i = 0; i < dataLength; i++) {
			if ($("#" + i)[0]) {
				$("#" + i)[0].className = "m-check singleSelection";
			}
		}

		ISCHECKNUM = 0;
	}
}

function CheckAll() {
	if ($("#checkall")[0].className == "m-check m-check-active") {

		for (var i = 0; i < dataLength; i++) {
			if ($("#" + i)[0]) {
				$("#" + i)[0].className = "m-check singleSelection m-check-active";
			}
		}

	}
}

//列表中单选
function cellbtnClick(that) {

	var id = that.dataset.num;

	if ($("#" + id)[0].className == "m-check singleSelection") {
		$("#" + id)[0].className = "m-check singleSelection m-check-active";
		ISCHECKNUM++;

	} else {
		$("#" + id)[0].className = "m-check singleSelection";
		ISCHECKNUM--;

	}

	if ($("#checkall")[0].className == "m-check m-check-active") {
		var number = Array.prototype.slice.call(document.querySelectorAll('.m-check-active')).length - 1;
	} else {
		var number = Array.prototype.slice.call(document.querySelectorAll('.m-check-active')).length;
	}
	ISCHECKNUM = Math.max(ISCHECKNUM, number);




	if (ISCHECKNUM == dataLength) {
		$("#checkall")[0].className = "m-check m-check-active";
	} else {
		$("#checkall")[0].className = "m-check";
	}
}

// 四舍五入 格式化数字
// toFix(8440.55,1) => 8440.6
function toFixed(number, fractionDigits) {
	var times = Math.pow(10, fractionDigits);
	var roundNum = Math.round(number * times) / times;
	return roundNum.toFixed(fractionDigits);
}
// ------------------------------------查询页面公共方法 ------------------------------------
// 购油分公司 查询页面专用
function getGYFGS() {
	var paramJsonStr = "&pager.pageNo=" + pageNo + "&pager.pageSize=" + 100;
	var func = GYFGS;
	syncLoadData(URL + "/backgrd/bilOutstorePlan/selectERPCompany", paramJsonStr, func);
}

function GYFGS(data) {
	SelectData.gyfgs = JSON.parse(data);
}
// 油品列表数据 查询页面专用
function getOilInfo() {
	var paramJsonStr = "";
	var func = getOilInfoCallback;
	syncLoadData(URL + "/backgrd/oil/order/queryOilName", paramJsonStr, func);
}

function getOilInfoCallback(data) {
	SelectData.oilList = JSON.parse(data);
}

// appcan的方式获取时间
function getNativityDate() {
	var mydate = new Date();
	var year = mydate.getFullYear();
	var month = mydate.getMonth() + 1;
	var day = mydate.getDate();
	uexControl.openDatePicker(year, month, day);
	index = $(this);
}

function cbOpenDatePicker(opId, dataType, data) {
	var obj = eval('(' + data + ')');
	$(index).val(obj.year + '-' + obj.month + '-' + obj.day);
}