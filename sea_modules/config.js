var myDate = new Date();
var time = myDate.getTime();
var host = 'http://'+location.host;
seajs.config({
  // Sea.js 的基础路径
  base: host+'/modules',
  // 路径配置
  paths: {
    'sea_module'        : '/modules',
    'jquery_plugin'     : 'jquery/plugin',
    'gallery'           : 'gallery',
  },
  priority: ['text'],
  // 别名配置
  alias: {
    'jquery'      : 'jquery/jquery/1.10.1/jquery',
    'es5-safe'    : 'gallery/es5-safe/0.9.3/es5-safe',
    'easing'      : 'jquery/easing/1.3.0/easing',
    'store'       : 'gallery/store/1.3.7/store',
    'handlebars'  : 'gallery/handlebars/1.3.0/handlebars',

    'miniTip'     : 'gallery/mini/miniTip/1.0.0/miniTip',
    'miniSlider'  : 'gallery/mini/miniSlider/1.0.0/miniSlider',
    'miniCount'  : 'gallery/mini/miniCount/1.0.0/miniCount',
    
    "cookie"      : "jquery_plugin/cookie/jquery.cookie",
    //"jquery_handlebars"      : "jquery_plugin/handlebars/jquery.handlebars",
    "base"        : "common/base",
    'app'         : 'nmtree/app/1.0.0/appUtil',
    "backtop"     : "nmtree/backtop/1.0.0/backtop",
    'tip'         : 'nmtree/tip/1.0.0/tip',
    'dialog'      : 'nmtree/dialog/1.3.8/dialog',
    'toolTip'      : 'nmtree/toolTip/1.2.1/toolTip',
  },
  shim: {
    handlebars: {
        exports: "Handlebars"
    }
  },
  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },
  // 映射配置
  map: [
    [ /^(.*\.(?:css|js))(.*)$/i, '$1?v='+time ]
  ],
  // 预加载项
  preload: [
    //'jquery',
    'handlebars'
    //'jquery_handlebars'
  ],
  // 调试模式
  debug: true,
  // 文件编码
  charset: 'utf-8'
});





