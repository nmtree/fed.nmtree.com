/* 
*  站点APP
*  -------------------
*  作者：听着情歌流泪
*  时间：2014-08-27
*  准则：CMD 规范
*  联系：281829389（qq）
*/
define('nmtree/app/1.0.0/appUtil',function(require, exports, module){
    "use strict";
    var appUtil = {
        init : function() {
           //seajs.log('app begin\n')
        },
        /* 
        * 获取模版所需的数据模块
        * -------------------
        * @param url
        * @param contentBox
        * @param source
        */
        getData : function(_uri,_contentBox,_source) {
            var template = Handlebars.compile(_source);
            $.post(_uri,function(data, textStatus, xhr) {
                if ('success' === textStatus){
                    $("#"+_contentBox).html( template(data) );
                }
            },'json');
        },
         


    };
    //输出模块
    module.exports = appUtil; 
});