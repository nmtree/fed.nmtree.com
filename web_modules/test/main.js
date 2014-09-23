;(function( factory ) {
    if ( typeof define === "function" && define.amd ) {
        define( [ "jquery" ], factory );
    } else {
        factory( jQuery );
    }
}(function( $ ) {

    (function () {

        'use strict';
        APP.init();
        function close(){
            
        }

        
        nmBox.rightTip(' 中考数学满分120分',2000);

        //console.log(base.dateFormat('yyyy-MM-dd'));
        //require('tip').loading('asd',300000);
        $(".dialog").bind("click",function(){
            nmBox.dialog(
                ' 中考数学满分120分，几何约考43分，几何部分难题最高可达16分，无论是分值比例还是难题占比，都非同一般！另外，中考数学压轴题第23题，第24题，第25题都与几何息息相关，尤其是三大变换，是很多学生中考失分的痛点！',
                {
                    'title' : '系统提示信息',
                    'title_icon' : 'info letter',
                    'buttons' : [
                        {
                            'caption':"确定",
                            'class' : 'google plus',
                            'icon' : 'checkmark',
                            callback:function(){
                                alert('s')
                            }
                        },
                        {
                           'caption':"取消",
                           'icon' : 'ban circle',
                            callback:function(){
                                alert('d')
                            },  
                        }
                    ]
                }
            );
        });

        //require('miniTip');

        nmTip.TipB($('.TipB'));
        
        //$('.tip').miniTip();
        
    })();
    /*
    require('miniSlider');
    $('#slider').miniSlider();
    */
    
    seajs.log('app end\n');
}));