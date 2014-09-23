define(function(require, exports) {
	var $ = jQuery 	= require('jquery');
	var _cookie 	= require('cookie');
	var _store   	= require('store');
	var _base		= require('base');
	var _app     	= require('app');
	var _dialog 	= require('dialog');

	require('backtop').init("top");
	var _toolTip    = require('toolTip');
	// 暴露到全局
	window.$ = $ = jQuery;
	nmBox       = _dialog;
	nmTip       = _toolTip;
	cookie 		= _cookie;
	store  		= _store;
	base 		= _base;
	APP  		= _app;
});


seajs.on('exec', function(module) {


});

seajs.on('error',function(){
	console.log("文件加载错误");
});






/*


define(function(require,exports,module) {
	var cookie 	= require('cookie');
	var dialog 	= require('dialog');
	var store   = require('store');
	//var app     = require('app');
	var $ = jQuery = require('jquery');
	window.$ = $ = jQuery;
	require.async('backtop');
});

seajs.on('exec', function(module) {
	
	if (module.uri === seajs.resolve('app')) {
	   app  = module.exports;
	}
	
	if (module.uri === seajs.resolve('cookie')) {
	  cookie  = module.exports;
	}
	
	if (module.uri === seajs.resolve('dialog')) {
	   nm_Dialog  = module.exports;
	}
	
	if (module.uri === seajs.resolve('store')) {
	   store  = module.exports;
	}
	
});


seajs.on('error',function(){
	console.log("文件加载错误");
});

*/
/*
resolve       -- 将 id 解析成为 uri 时触发
load          -- 开始加载文件时触发
fetch         -- 具体获取某个 uri 时触发
request       -- 发送请求时触发
define         -- 执行 define 方法时触发
exec         -- 执行 module.factory 时触发
config         -- 调用 seajs.config 时触发
error          -- 加载脚本文件出现 404 或其他错误时触发
*/