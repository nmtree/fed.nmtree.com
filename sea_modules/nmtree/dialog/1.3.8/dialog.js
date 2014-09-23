/**************************************************************
*  Dialog模块
* ----------------------------------
*  作者：听着情歌流泪
*  时间：2014-08-27
*  准则：CMD 规范
*  联系：281829389（qq）
        bobo.xiao@nmtree.com
        http://www.nmtree.com
**************************************************************/
define('nmtree/dialog/1.3.8/dialog',function(require, exports, module){
    'use strict';
    require('skin_1.css#');
    ;(function($) {
        'use strict';
        $.dialog = function() {

            var defaults = {
                title_icon  :               false,          //  标题图标
                close_animate :             false,          //  关闭动画
                animation_speed_hide:       250,            //  动画执行时间
                animation_speed_show:       0,              //  dialog显示时间       
                auto_close:                 false,          //  是否自动关闭
                buttons:                    false,          //  是否显示button
                                                            //  [
                                                            //   {caption: 'My button 1', callback: function() { // code }},
                                                            //   {caption: 'My button 2', callback: function() { // code }}
                                                            //  ]
                center_buttons:              false,         //  button是否居中显示
                custom_class:                'nmStyle',     //  附加样式
                keyboard:                   false,           //  键盘按钮关闭
                max_height:                 0,              //  最小高度
                message:                    '加载中……',      //  默认loading文字
                modal:                      true,           //  是否显示遮罩
                overlay_close:              false,          //  是否点击遮罩关闭弹层
                overlay_opacity:            '.6',           //  遮罩透明度
                position:      ['center', 'top+150'],       //  弹层位置
                                                            //
                                                            //  ['left + 20', 'top + 20'] would position the dialog box in the
                                                            //  top-left corner, shifted 20 pixels inside.
                                                            //
                                                            //  ['right - 20', 'bottom - 20'] would position the dialog box
                                                            //  in the bottom-right corner, shifted 20 pixels inside.
                                                            //
                                                            //  ['center', 'top + 20'] would position the dialog box in
                                                            //  center-top, shifted 20 pixels down.

                reposition_speed:           500,            //  resize window窗口，dialog设置居中执行时间
                show_close_button:          true,           //  是否显示标题栏关闭按钮
                source:                     false,          //  
                                                            //  source: {'ajax': 'http://myurl.com/'}
                                                            //
                                                            //  source: {'ajax': {
                                                            //      'url':      'http://myurl.com/',
                                                            //      'cache':    false
                                                            //  }}
                                                            
                                                            //  source: {'iframe': 'http://myurl.com/'}
                                                            //
                                                            //  source: {'iframe': {
                                                            //      'src':          'http://myurl.com/',
                                                            //      'width':        480,
                                                            //      'height':       320,
                                                            //      'scrolling':    'no'
                                                            //  }}
                                                            
                                                            //  source: {'inline': $('#myelement')}
                title:                      '提示',          //  默认标题
                type:                       false,          //  Dialog box 类型.
                vcenter_short_message:      true,           //  短消息是否垂直集中
                width:                      0,              //  宽度
                onClose:                    null            //  关闭事件

            };

            var

                // to avoid confusions, we use "plugin" to reference the current instance of the object
                plugin = this,

                // by default, we assume there are no custom options provided
                options = {},

                // we'll use this when resizing
                timeout;

            // this will hold the merged default, and user-provided options
            plugin.settings = {};

            // if plugin is initialized so that first argument is a string
            // that string is the message to be shown in the dialog box
            if (typeof arguments[0] == 'string') options.message = arguments[0];

            // if plugin is initialized so that first or second argument is an object
            if (typeof arguments[0] == 'object' || typeof arguments[1] == 'object')

                // extend the options object with the user-provided options
                options = $.extend(options, (typeof arguments[0] == 'object' ? arguments[0] : arguments[1]));

            /**
             *  Constructor method
             *
             *  @return object  Returns a reference to the plugin
             */
            plugin.init = function() {

                var $title;

                // the plugin's final properties are the merged default and user-provided options (if any)
                plugin.settings = $.extend({}, defaults, options);

                // check if browser is Internet Explorer 6 and set a flag accordingly as we need to perform some extra tasks
                // later on for Internet Explorer 6
                plugin.isIE6 = (browser.name == 'explorer' && browser.version == 6) || false;

                // if dialog box should be modal
                if (plugin.settings.modal) {

                    // create the overlay
                    plugin.overlay = $('<div>', {

                        'class':    'nm_dialogOverlay'

                    // set some css properties of the overlay
                    }).css({

                        'position': (plugin.isIE6 ? 'absolute' : 'fixed'),  //  for IE6 we emulate the "position:fixed" behaviour
                        'left':     0,                                      //  the overlay starts at the top-left corner of the
                        'top':      0,                                      //  browser window (later on we'll stretch it)
                        'opacity':  plugin.settings.overlay_opacity         //  set the overlay's opacity

                    });

                    // if dialog box can be closed by clicking the overlay
                    if (plugin.settings.overlay_close)

                        // when the overlay is clicked
                        // remove the overlay and the dialog box from the DOM
                        plugin.overlay.bind('click', function() {plugin.close();});

                    // append the overlay to the DOM
                    plugin.overlay.appendTo('body');

                }

                // create the dialog box
                plugin.dialog = $('<div>', {

                    'class':        'nm_dialog' + (plugin.settings.custom_class ? ' ' + plugin.settings.custom_class : '')

                // set some css properties of the dialog box
                }).css({

                    'position':     (plugin.isIE6 ? 'absolute' : 'fixed'),  //  for IE6 we emulate the "position:fixed" behaviour
                    'left':         0,                                      //  by default, place it in the top-left corner of the
                    'top':          0,                                      //  browser window (we'll position it later)
                    'visibility':   'hidden'                                //  the dialog box is hidden for now

                });

                // if a notification message
                if (!plugin.settings.buttons && plugin.settings.auto_close)

                    // assign a unique id to each notification
                    plugin.dialog.attr('id', 'nm_dialog_' + Math.floor(Math.random() * 9999999));

                // check to see if the "width" property is given as an integer
                // try to convert to a integer
                var tmp = parseInt(plugin.settings.width, 10);

                // if converted value is a valid number
                if (!isNaN(tmp) && tmp == plugin.settings.width && tmp.toString() == plugin.settings.width.toString() && tmp > 0)

                    // set the dialog box's width
                    plugin.dialog.css({'width' : plugin.settings.width});

                // if dialog box has a title
                if (plugin.settings.title)
                    if(plugin.settings.title_icon !== false){
                      var _dialog_title = '<i class="ui icon '+plugin.settings.title_icon+'"></i>'+plugin.settings.title;  
                    }else{
                        var _dialog_title = plugin.settings.title;  
                    }
                    // create the title
                    $title = $('<h3>', {

                        'class':    'nm_dialog_Title'

                    // set the title's text
                    // and append the title to the dialog box
                    }).html(_dialog_title).appendTo(plugin.dialog);

                // get the buttons that are to be added to the dialog box
                var buttons = get_buttons();

                // we create an outer container to apply borders to
                var body_container = $('<div>', {

                    'class':    'nm_dialog_BodyOuter' + (!plugin.settings.title ? ' nm_dialog_NoTitle' : '') + (!buttons ? ' nm_dialog_NoButtons' : '')

                }).appendTo(plugin.dialog);

                // create the container of the actual message
                // we save it as a reference because we'll use it later in the "draw" method
                // if the "vcenter_short_message" property is TRUE
                plugin.message = $('<div>', {

                    // if a known dialog box type is specified, also show the appropriate icon
                    'class':    'nm_dialog_Body' + (get_type() !== false ? ' nm_dialog_Icon nm_dialog_' + get_type() : '')

                });

                // if we have a max-height set
                if (plugin.settings.max_height > 0) {

                    // set it like this for browsers supporting the "max-height" attribute
                    plugin.message.css('max-height', plugin.settings.max_height);

                    // for IE6, go this way...
                    if (plugin.isIE6) plugin.message.attr('style', 'height: expression(this.scrollHeight > ' + plugin.settings.max_height + ' ? "' + plugin.settings.max_height + 'px" : "85px")');

                }

                // if short messages are to be centered vertically
                if (plugin.settings.vcenter_short_message)

                    // create a secondary container for the message and add everything to the message container
                    // (we'll later align the container vertically)
                    $('<div>').html(plugin.settings.message).appendTo(plugin.message);

                // if short messages are not to be centered vertically
                else

                    // add the message to the message container
                    plugin.message.html(plugin.settings.message);

                // if dialog box content is to be fetched from an external source
                if (plugin.settings.source && typeof plugin.settings.source == 'object') {

                    // the object where the content will be injected into
                    var canvas = (plugin.settings.vcenter_short_message ? $('div:first', plugin.message) : plugin.message);

                    // let's see what type of content we need
                    for (var type in plugin.settings.source) {

                        switch (type) {

                            // if we have to fetch content using an AJAX call
                            case 'ajax':

                                var

                                    // prepare the options for the AJAX call
                                    ajax_options = typeof plugin.settings.source[type] == 'string' ? {'url': plugin.settings.source[type]} : plugin.settings.source[type],

                                    // create the animated preloader and show it
                                    preloader = $('<div>').attr('class', 'nm_dialog_Preloader').appendTo(canvas);

                                // handle the "success" event
                                ajax_options.success = function(result) {

                                    // remove the preloader
                                    preloader.remove();

                                    // append new content
                                    canvas.append(result);

                                    // reposition the dialog box
                                    draw(false);
                                };

                                // make the AJAX call
                                $.ajax(ajax_options);

                                break;

                            // if we have to show an iFrame
                            case 'iframe':

                                // these are the default options
                                var default_options = {
                                        'width':        '100%',
                                        'height':       '100%',
                                        'marginheight': '0',
                                        'marginwidth':  '0',
                                        'frameborder':  '0'
                                    },

                                    // extend the default options with the ones provided by the user, if any
                                    iframe_options = $.extend(default_options, typeof plugin.settings.source[type] == 'string' ? {'src': plugin.settings.source[type]} : plugin.settings.source[type]);

                                // create the iFrame and place it inside the dialog box
                                canvas.append($('<iframe>').attr(iframe_options));

                                break;

                            // if content is to be taken from an inline element
                            case 'inline':

                                // copy content and place it inside the dialog box
                                canvas.append(plugin.settings.source[type]);

                                break;

                        }

                    }

                }

                // add the message container to the dialog box
                plugin.message.appendTo(body_container);

                // if there are any buttons to be added to the dialog box
                if (buttons) {

                    // reverse the order of the buttons because they are floated to the right
                    buttons.reverse();

                    // create the button bar
                    var button_bar = $('<div>', {

                        'class':    'ui small buttons nm_dialog_Buttons'

                    // append it to the dialog box
                    }).appendTo(plugin.dialog);

                    // iterate through the buttons that are to be attached to the dialog box
                    $.each(buttons, function(index, value) {
                        if(value.class){
                            var _class = 'ui button '+value.class+' nm_dialog_Button_' + index;
                        }else{
                           var _class = 'ui button nm_dialog_Button_' + index;
                        }
                        // create button
                        var button = $('<button>', {
                            //'href':     'javascript:void(0)',
                            'class':    _class

                        });
                        
                        // if button is given as an object, with a caption and a callback function
                        // set the button's caption

                        if ($.isPlainObject(value)) {
                            if(value.icon){
                                button.html('<i class="icon '+value.icon+'"></i>'+value.caption);
                            }else{
                                button.html(value.caption);
                            }
                        }else{
                            button.html(value);
                        }

                        // handle the button's click event
                        button.bind('click', function() {

                            // by default, clicking a button closes the dialog box
                            var close = true;

                            // execute the callback function when button is clicked
                            if (undefined !== value.callback) close = value.callback(plugin.dialog);

                            // if dialog box is to be closed
                            if (close !== false)

                                // remove the overlay and the dialog box from the DOM
                                // also pass the button's label as argument
                                plugin.close(undefined !== value.caption ? value.caption : value);

                        });

                        // append the button to the button bar
                        button.appendTo(button_bar);

                    });

                    // wrap everything in another wrapper
                    // and center buttons if needed
                    button_bar.wrap($('<div>').addClass('nm_dialog_ButtonsOuter' + (plugin.settings.center_buttons ? ' nm_dialog_Buttons_Centered' : '')));

                }

                // insert the dialog box in the DOM
                plugin.dialog.appendTo('body');

                // if we need to show the little "x" for closing the dialog box, in the top-right corner
                if (plugin.settings.show_close_button) {

                    // create the button now and append it to the dialog box's title, or to the dialog box's body if there's no title
                    var $close = $('<i class="ui remove icon nm_dialog_Close"></i>').bind('click', function(e){

                        e.preventDefault();
                        plugin.close();


                    }).appendTo($title ? $title : plugin.message);

                    // if the close button was added to the title bar
                    if ($title)

                        // center it vertically
                        $close.css({
                            'right':    parseInt($title.css('paddingRight'), 10),
                            'top':      (parseInt($title.css('height'), 10) + parseInt($title.css('paddingTop'), 10) + parseInt($title.css('paddingBottom'), 10) - $close.height()) / 2
                        });

                }

                // if the browser window is resized
                $(window).bind('resize.dialog', function() {

                    // clear a previously set timeout
                    // this will ensure that the next piece of code will not be executed on every step of the resize event
                    clearTimeout(timeout);

                    // set a small timeout before doing anything
                    timeout = setTimeout(function() {

                        // reposition the dialog box
                        draw();

                    }, 100);

                });

                // if dialog box can be closed by pressing the ESC key
                if (plugin.settings.keyboard)

                    // if a key is pressed
                    $(document).bind('keyup.dialog', function(e) {

                        // if pressed key is ESC
                        // remove the overlay and the dialog box from the DOM
                        if (e.which == 27) plugin.close();

                        // let the event bubble up
                        return true;

                    });

                // if browser is Internet Explorer 6 we attach an event to be fired whenever the window is scrolled
                // that is because in IE6 we have to simulate "position:fixed"
                if (plugin.isIE6)

                    // if window is scrolled
                    $(window).bind('scroll.dialog', function() {

                        // make sure the overlay and the dialog box always stay in the correct position
                        emulate_fixed_position();

                    });

                // if plugin is to be closed automatically after a given number of milliseconds
                if (plugin.settings.auto_close !== false) {

                    // if, in the meantime, the box is clicked
                    plugin.dialog.bind('click', function() {

                        // stop the timeout
                        clearTimeout(plugin.timeout);

                        // close the box now
                        plugin.close();

                    });

                    // call the "close" method after the given number of milliseconds
                    plugin.timeout = setTimeout(plugin.close, plugin.settings.auto_close);

                }

                // draw the overlay and the dialog box
                // (no animation)
                draw(false);

                // return a reference to the object itself
                return plugin;

            };

            /**
             *  Close the dialog box
             *
             *  @return void
             */
            plugin.close = function(caption) {

                // remove all event handlers set by the plugin
                $(document).unbind('.dialog');
                $(window).unbind('.dialog');

                if (plugin.settings.close_animate !== false) {

                    // if an overlay exists
                    if (plugin.overlay)

                        // animate overlay's css properties
                        plugin.overlay.animate({

                            opacity: 0  // fade out the overlay

                        },

                        // animation speed
                        plugin.settings.animation_speed_hide,

                        // when the animation is complete
                        function() {

                            // remove the overlay from the DOM
                            plugin.overlay.remove();

                        });

                    // animate dialog box's css properties
                    
                    plugin.dialog.animate({

                        top: 0,     // move the dialog box to the top
                        opacity: 0  // fade out the dialog box

                    },
                    
                    // animation speed
                    plugin.settings.animation_speed_hide,

                    // when the animation is complete
                    function() {

                        // remove the dialog box from the DOM
                        plugin.dialog.remove();

                        // if a callback function exists for when closing the dialog box
                        if (plugin.settings.onClose && typeof plugin.settings.onClose == 'function')

                            // execute the callback function
                            plugin.settings.onClose(undefined !== caption ? caption : '');

                    });
                
                }else{
                    if(plugin.settings.modal !== false){
                        plugin.overlay.remove();
                        plugin.dialog.remove();
                    }else{
                        plugin.dialog.remove();
                    }
                }

                //plugin.dialog.remove();
            };

            /**
             *  Draw the overlay and the dialog box
             *
             *  @return void
             *
             *  @access private
             */
            var draw = function() {

                var

                    // get the viewport width and height
                    viewport_width = $(window).width(),
                    viewport_height = $(window).height(),

                    // get dialog box's width and height
                    dialog_width = plugin.dialog.width(),
                    dialog_height = plugin.dialog.height(),

                    // the numeric representations for some constants that may exist in the "position" property
                    values = {

                        'left':     0,
                        'top':      0,
                        'right':    viewport_width - dialog_width,
                        'bottom':   viewport_height - dialog_height,
                        'center':   (viewport_width - dialog_width) / 2,
                        'middle':   (viewport_height - dialog_height) / 2

                    };

                // reset these values
                plugin.dialog_left = undefined;
                plugin.dialog_top = undefined;

                // if
                if (

                    // the position is given as an array
                    $.isArray(plugin.settings.position) &&

                    // the array has exactly two elements
                    plugin.settings.position.length == 2 &&

                    // first element is a string
                    typeof plugin.settings.position[0] == 'string' &&

                    // first element contains only "left", "right", "center", numbers, spaces, plus and minus signs
                    plugin.settings.position[0].match(/^(left|right|center)[\s0-9\+\-]*$/) &&

                    // second element is a string
                    typeof plugin.settings.position[1] == 'string' &&

                    // second element contains only "top", "bottom", "middle", numbers, spaces, plus and minus signs
                    plugin.settings.position[1].match(/^(top|bottom|middle)[\s0-9\+\-]*$/)

                ) {

                    // make sure both entries are lowercase
                    plugin.settings.position[0] = plugin.settings.position[0].toLowerCase();
                    plugin.settings.position[1] = plugin.settings.position[1].toLowerCase();

                    // iterate through the array of replacements
                    $.each(values, function(index, value) {

                        // we need to check both the horizontal and vertical values
                        for (var i = 0; i < 2; i++) {

                            // replace if there is anything to be replaced
                            var tmp = plugin.settings.position[i].replace(index, value);

                            // if anything could be replaced
                            if (tmp != plugin.settings.position[i])

                                // evaluate string as a mathematical expression and set the appropriate value
                                if (i === 0) plugin.dialog_left = eval(tmp); else plugin.dialog_top = eval(tmp);

                        }

                    });

                }

                // if "dialog_left" and/or "dialog_top" values are still not set
                if (undefined === plugin.dialog_left || undefined === plugin.dialog_top) {

                    // the dialog box will be in its default position, centered
                    plugin.dialog_left = values['center'];
                    plugin.dialog_top = values['middle'];

                }

                // if short messages are to be centered vertically
                if (plugin.settings.vcenter_short_message) {

                    var

                        // the secondary container - the one that contains the message
                        message = plugin.message.find('div:first'),

                        // the height of the secondary container
                        message_height = message.height(),

                        // the main container's height
                        container_height = plugin.message.height();

                    // if we need to center the message vertically
                    if (message_height < container_height)

                        // center the message vertically
                        message.css({

                            'padding-top':   (container_height - message_height) / 2

                        });

                }

                // if dialog box is to be placed without animation
                if ((typeof arguments[0] == 'boolean' && arguments[0] === false) || plugin.settings.reposition_speed === 0) {

                    // position the dialog box and make it visible
                    plugin.dialog.css({

                        'left':         plugin.dialog_left,
                        'top':          plugin.dialog_top,
                        'visibility':   'visible',
                        'opacity':      0

                    }).animate({'opacity': 1}, plugin.settings.animation_speed_show);

                // if dialog box is to be animated into position
                } else {

                    // stop any ongoing animation
                    // (or animations will queue up when manually resizing the window)
                    plugin.dialog.stop(true);

                    plugin.dialog.css('visibility', 'visible').animate({
                        'left': plugin.dialog_left,
                        'top':  plugin.dialog_top
                    }, plugin.settings.reposition_speed);

                }

                // move the focus to the first of the dialog box's buttons
                plugin.dialog.find('button[class^=nm_dialog_Button]:first').focus();

                // if the browser is Internet Explorer 6, call the "emulate_fixed_position" method
                // (if we do not apply a short delay, it sometimes does not work as expected)
                if (plugin.isIE6) setTimeout(emulate_fixed_position, 500);

            };

            /**
             *  Emulates "position:fixed" for Internet Explorer 6.
             *
             *  @return void
             *
             *  @access private
             */
            var emulate_fixed_position = function() {

                var

                    // get how much the window is scrolled both horizontally and vertically
                    scroll_top = $(window).scrollTop(),
                    scroll_left = $(window).scrollLeft();

                // if an overlay exists
                if (plugin.settings.modal)

                    // make sure the overlay is stays positioned at the top of the viewport
                    plugin.overlay.css({

                        'top':  scroll_top,
                        'left': scroll_left

                    });

                // make sure the dialog box always stays in the correct position
                plugin.dialog.css({

                    'left': plugin.dialog_left + scroll_left,
                    'top':  plugin.dialog_top + scroll_top

                });

            };

            /**
             *  Returns an array containing the buttons that are to be added to the dialog box.
             *
             *  If no custom buttons are specified, the returned array depends on the type of the dialog box.
             *
             *  @return array       Returns an array containing the buttons that are to be added to the dialog box.
             *
             *  @access private
             */
            var get_buttons = function() {

                // if plugin.settings.buttons is not TRUE and is not an array either, don't go further
                if (plugin.settings.buttons !== true && !$.isArray(plugin.settings.buttons)) return false;

                // if default buttons are to be used
                if (plugin.settings.buttons === true)

                    // there are different buttons for different dialog box types
                    switch (plugin.settings.type) {

                        // for "question" type
                        case 'question':

                            // there are two buttons
                            plugin.settings.buttons = ['确 定', '取 消'];

                            break;

                        // for the other types
                        default:

                            // there is only one button
                            plugin.settings.buttons = ['确 定'];

                    }

                // return the buttons
                return plugin.settings.buttons;

            };

            /**
             *  Returns the type of the dialog box, or FALSE if type is not one of the five known types.
             *
             *  Values that may be returned by this method are:
             *  -   Confirmation
             *  -   Error
             *  -   Information
             *  -   Question
             *  -   Warning
             *
             *  @return boolean     Returns the type of the dialog box, or FALSE if type is not one of the five known types.
             *
             *  @access private
             */
            var get_type = function() {

                // see what is the type of the dialog box
                switch (plugin.settings.type) {

                    // if one of the five supported types
                    case 'confirmation':
                    case 'error':
                    case 'information':
                    case 'question':
                    case 'warning':

                        // return the dialog box's type, first letter capital
                        return plugin.settings.type.charAt(0).toUpperCase() + plugin.settings.type.slice(1).toLowerCase();

                    // if unknown type
                    default:

                        // return FALSE
                        return false;

                }

            };

            // since with jQuery 1.9.0 the $.browser object was removed, we rely on this piece of code from
            // http://www.quirksmode.org/js/detect.html to detect the browser
            var browser = {
                init: function () {
                    this.name = this.searchString(this.dataBrowser) || '';
                    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || '';
                },
                searchString: function (data) {
                    for (var i=0;i<data.length;i++)    {
                        var dataString = data[i].string;
                        var dataProp = data[i].prop;
                        this.versionSearchString = data[i].versionSearch || data[i].identity;
                        if (dataString) {
                            if (dataString.indexOf(data[i].subString) != -1)
                                return data[i].identity;
                        }
                        else if (dataProp)
                            return data[i].identity;
                    }
                },
                searchVersion: function (dataString) {
                    var index = dataString.indexOf(this.versionSearchString);
                    if (index == -1) return;
                    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
                },
                dataBrowser: [
                    {
                        string: navigator.userAgent,
                        subString: 'MSIE',
                        identity: 'explorer',
                        versionSearch: 'MSIE'
                    }
                ]
            };

            browser.init();

            // fire up the plugin!
            // call the "constructor" method
            return plugin.init();

        };
    })(jQuery);

    //对外暴露接口
    module.exports = {
        dialog: function (content,cfg) {
            return new $.dialog(content,cfg);
        },
        rightTip: function(content,timer){
            return new $.dialog(content,{
                "show_close_button" : false,
                "width": 300,
                "auto_close":timer,
                "title" : false,
                "modal": false,
                "custom_class" : "nmTip",
                'position': ['right-5', 'bottom-5'],
            });
        }
    }
});
