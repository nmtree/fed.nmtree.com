define('common/base',function(require, exports, module) {
    "use strict";
    var Base = (function(){
        var _base = {};
        /*
        * 返回格式化后的日期字符串
        * ----------------------------------
        * @param yyyy MM dd HH mm ss
        * @return
        */
        _base.dateFormat = function(formatStr) {
            var _date = new Date();
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str = str.replace(/yyyy|YYYY/, _date.getFullYear());
            str = str.replace(/yy|YY/, (_date.getYear() % 100) > 9 ? (_date.getYear() % 100).toString() : '0' + (_date.getYear() % 100));
            var month = _date.getMonth() + 1;
            str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
            str = str.replace(/M/g, month);
            str = str.replace(/w|W/g, Week[_date.getDay()]);
            str = str.replace(/dd|DD/, _date.getDate() > 9 ? _date.getDate().toString() : '0' + _date.getDate());
            str = str.replace(/d|D/g, _date.getDate());
            str = str.replace(/hh|HH/, _date.getHours() > 9 ? _date.getHours().toString() : '0' + _date.getHours());
            str = str.replace(/h|H/g, _date.getHours());
            str = str.replace(/mm/, _date.getMinutes() > 9 ? _date.getMinutes().toString() : '0' + _date.getMinutes());
            str = str.replace(/m/g, _date.getMinutes());
            str = str.replace(/ss|SS/, _date.getSeconds() > 9 ? _date.getSeconds().toString() : '0' + _date.getSeconds());
            str = str.replace(/s|S/g, _date.getSeconds());
            return str;
        };
        /*
        * 当前浏览器名
        * ----------------------------------
        * @param
        * @return 包括版本号
        */
        _base.getBrowser = function() {
           var browser = {};
            var ua = navigator.userAgent.toLowerCase();
            var s;(s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
            return browser;
        };
        /*
        * HTML转换成文本 
        * ----------------------------------
        * @param string
        * @return 
        */
        _base.escapeHTML = function(c) {
            c = c.replace(/<br>/ig, "");
            c = c.replace(/(\n)/ig, "");
            c = c.replace(/(\r|\n)/ig, "");
            c = c.replace(/</ig, "&lt;");
            c = c.replace(/>/ig, "&gt;");
            c = c.replace(/'/ig, "&#039;");
            c = c.replace(/"/ig, "&quot;");
            //  c = c.replace(/,/ig, "，");
            c = c.replace(/&/ig, "&amp;");
            return c;

        };
        /*
        * 文本转换成HTML
        * ----------------------------------
        * @param string
        * @return 
        */
        _base.unescapeHTML = function(c) {

            c = c.trim();
            c = c.replace(/[\r\n]/ig, "");
            c = c.replace(/[\r]/ig, "");
            c = c.replace(/[\n]/ig, "");
            c = c.replace(/&lt;/ig, "<");
            c = c.replace(/&gt;/ig, ">");
            c = c.replace(/&quot;/ig, "\"");
            c = c.replace(/&#039;/ig, "'");
            c = c.replace(/&amp;/ig, "&");
            return c;
        };
        /**
        * 简化ReturnFalse
        *
        * @param {jQueryEvent} evt : jQuery事件对象
        * @param {Integer} type : 1 - 只取消冒泡；2 - 只阻止事件默认行为；0 - 既取消冒泡，阻止事件默认行为
        * @return null
        * 
        */
        _base.returnFalse = function(evt, type){
            type = type || 0;
            switch(parseInt(type, 10)){
                case 1: {
                    evt.stopPropagation();
                    break;
                }
                case 2: {
                    evt.preventDefault();
                    break;
                }
                default : {
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            };
            return null;
        };
        /**
        * 格式化标题
        *
        * @param title
        * @return null
        * 
        */
        _base.formatTitle = function(tit){
            var title = $.trim(tit) || "";
            title = title.replace("（无主题","（主题为空）");
            var curTitle = title.replace(/[‘’',.，。<>《》\/、~:：；;"“”\[\]【】\{\}|\-——_+=^*\(\)（）]/ig,"").substring(0,1);
            if((title.indexOf("（主题为空）") != -1) || ($.trim(curTitle) == "")){
                curTitle = "空";
            }
            //
            var shotTitle = title;
            if(shotTitle.length > 5) {
                shotTitle = shotTitle.substring(0,5) + "...";
            }
            if(shotTitle.length > 3){
                shotTitle = shotTitle.substring(0,3) + "<br />" + shotTitle.substring(3);
            }
            return {
                title : title,
                shotTitle : shotTitle,
                curTitle : curTitle
            }
        };
        /*
        * 限制字符个数，并在末尾加上自定义字符
        */
        _base.limitStr = function(str,num,t) {
            num = num || 11; //限制字符数默认为11个，注意，两个英文字符，算一个！！！
            t = t || '...'; //默认在末尾加上省略号
            var re = '';

            var leg = str.length;
            var h = 0;
            for(var i=0;h<num*2&&i<leg;i++){
                h += str.charCodeAt(i)>128?2:1;
                re += str.charAt(i);
            }
            if(i<leg){
                re+=t;
            }
            return re;
        };
        /*
        * 通过秒数格式化时间长度
        */
        _base.Formstsec = function(sesonds) {
            var secs = Math.floor(sesonds) % 60;
            var mins = Math.floor(Math.floor(sesonds) / 60) % 60;
            var hurs = Math.floor(Math.floor(sesonds) / 3600) % 24;
            var re = '';
            if(hurs>0){ 
                return (hurs>9?hurs:'0'+hurs)+':'+(mins>9?mins:'0'+mins)+':'+(secs>9?secs:'0'+secs); 
            }
            if(mins>0){ 
                return (mins>9?mins:'0'+mins)+':'+(secs>9?secs:'0'+secs); 
            }
            if(secs>0){
                return '0:'+(secs>9?secs:'0'+secs); 
            }
            return '0:0';
        };
        /*
        * 生成GUID
        */
        _base.generateGUID = function(param){
            var d = param;
            var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x7|0x8)).toString(16);
            });
            return uuid;
        };
        
        return _base;
    })();
    //暴露外部接口
    module.exports = Base;
});