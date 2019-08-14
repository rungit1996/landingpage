// 业务代码
var flag = 1;
var tj = {
	view: false,
	acc: false,
	engine: null,
	u: 0,
	sid: 0,
	gbk: false,
	word: '',
	clearSelection: false,
	sourceURL: null,
	keywordCode: null,
	ip: "空",
	customerlocal: "空",
	equipment: "空",
	mobile: "空",
	behavior: "空",
};
window.goTJ = tj;

// 获取关键字编码
function getKeywordCode() {
    
	var a = window.location.href;
	var b = a.indexOf("?");
	if (b == -1) {
		b = a.indexOf("#");
		if (b == -1) {
			tj.sourceURL = a;
			tj.keywordCode = "空";
			return
		} else {
			var c = a.length;
			var d = a.substring(0, b);
			var e = a.substring(b + 1, c);
			tj.sourceURL = d;
			tj.keywordCode = e
		}
	} else {
		var c = a.length;
		var d = a.substring(0, b);
		var e = a.substring(b + 1, c);
		tj.sourceURL = d;
		tj.keywordCode = e
	}
}
getKeywordCode();


var url = document.referrer;
//var url = "https://www.so.com/s?ie=utf-8&src=know_side_nlp&q=%E9%98%B3%E6%9C%94%E8%87%AA%E7%94%B1%E8%A1%8C&ob_ext=";
// 获取各种路径信息
function parseURL(c) {
	var a = document.createElement('a');
	a.href = c;
	tj.params = {
		source: c,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function() {
			var b = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue
				}
				s = seg[i].split('=');
				b[s[0]] = s[1]
			}
			return b
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	}
}
parseURL(url);

// 获取搜索引擎
function getEngine(a) {
    if (a.indexOf('m.baidu.com') > -1) {
        tj.engine = '百度-移动';
        return
    } else if (a.indexOf('www.baidu.com') > -1) {
        tj.engine = '百度-电脑';
        return
    } else if (a.indexOf('sogou.com') > -1) {
        tj.engine = '搜狗';
        return
    } else if (a.indexOf('iflow.uczzd.cn') > -1) {
        tj.engine = 'UC信息流-移动';
		return
    } else if (a.indexOf('so.com') > -1) {
        tj.engine = '360搜索'
    } else if (a.indexOf('sm.cn') > -1) {
		tj.engine = "神马搜索"
	} else {
		tj.engine = "未知的搜索渠道"
	}
}
getEngine(tj.params.host);


function isGBK(a) {
	if (a == null) {
		return false
	}
	a = a.toLowerCase();
	return a.indexOf('utf') == -1
}
tj.gbk = isGBK(tj.params.ie);


// 获取有效字
function getYouxuanKeyword(a) {
	tj.gbk = true;
	for (var i = 0; i < a.length; i++) {
		if (a[i].indexOf('p=') == 0) {
			var p = unescape(a[i].substring(2));
			var s = p.indexOf('=');
			var e = p.indexOf('&');
			var b = b(p.substring(s + 1, e));
			return decodeURIComponent(b)
		}
	}
	return null
}

// 获取关键字
function getKeyWord() {
	if (url.length == 0) {
		tj.word = "无，可能是直接访问";
		return
	}
	var a = tj.params;
	if (a.host.indexOf('youxuan.baidu.com') >= 0) {
		tj.word = getYouxuanKeyword(a.query.split('&'));
		return
	}
	if (!tj.params) {
		return null
	}
	if (tj.engine == "百度-移动" || tj.engine == "百度-电脑") {
		var b = a.params.word || a.params.keyword || a.params.wd || a.params.q
	} else if (tj.engine == "搜狗") {
	    var b = a.params.query || a.params.keyword
	} else {
		var b = a.params.word || a.params.keyword || a.params.wd || a.params.q || a.params.query
	}
	if (a.host == 'cpro.baidu.com') {
		b = a.params.ori || a.params.k || a.params.k0 || a.params.k1 || a.params.k2 || a.params.k3 || a.params.k4;
		tj.gbk = true
	}
	if (b != null && b.indexOf('%') > -1) {
		tj.word = decodeURIComponent(b)
	} else {
		tj.word = b
	}
}
getKeyWord();
var date = {};

// 获取时间
function getTime() {
	var a = new Date();
	date.y = a.getFullYear();
	date.m = a.getMonth();
	date.d = a.getDate()
}
getTime();


// 获取IP
function getIP() {
	var a = document.createElement('script');
	a.type = 'text/javascript';
	a.async = true;
	a.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(a, s);
}
getIP();

// 获取设备信息
function getUserAgent(){
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { 
		tj.equipment = 'IOS';
	} else if (/(Android)/i.test(navigator.userAgent)) { 
		tj.equipment = '安卓';
	} else { 
		tj.equipment = '电脑';
	};
}
getUserAgent();

var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
			baidu: u.indexOf('BIDUBrowser') > -1, //百度浏览器
			sougou: u.indexOf('SE') > -1, //搜狗浏览器
			qqbrowser: u.indexOf('QQBrowser') > -1, //QQ浏览器
			world: u.indexOf('TheWorld') > -1, //世界之窗浏览器
			aoyou: u.indexOf('Maxthon') > -1, //遨游浏览器
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

// 获取浏览器信息
function getBrowser(){
	if(browser.versions.trident){
		tj.model = 'IE浏览器';
	}else if(browser.versions.presto){
		tj.model = 'opera浏览器';
	}else if(browser.versions.gecko){
		tj.model = '火狐浏览器';
	}else if(browser.versions.weixin){
		tj.model = '微信';
	}else if(browser.versions.qq){
		tj.model = 'qq';
	}else if(browser.versions.iPhone){
		tj.model = 'iPhone或者QQHD浏览器';
	}else if(browser.versions.iPad){
		tj.model = 'iPad';
	}else if(browser.versions.baidu){
		tj.model = '百度浏览器';
	}else if(browser.versions.sougou){
		tj.model = '搜狗浏览器';
	}else if(browser.versions.qqbrowser){
		tj.model = 'QQ浏览器';
	}else if(browser.versions.world){
		tj.model = '世界之窗浏览器';
	}else if(browser.versions.aoyou){
		tj.model = '遨游浏览器';
	}else if(browser.versions.webKit){
		tj.model = '谷歌内核浏览器';
	}
}
getBrowser();
