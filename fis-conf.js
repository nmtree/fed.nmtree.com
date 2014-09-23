//打包合并文件
fis.config.merge({
    statics : '/static',
    module : '/modules',
    pub : '/public',
    project : {
        charset      : 'utf8',
        md5Length    : 20,
        md5Connector : '_',
        fileType : {
            image :  ['svg', 'tif', 'tiff', 'wbmp', 'png', 'bmp', 'fax', 'gif', 'ico', 'jfif', 'jpe', 'jpeg', 'jpg', 'woff', 'cur', 'webp', 'swf', 'ttf', 'eot','js','css']
        }
    },
    modules: {
        lint : {
            js : 'jshint'
        },
        optimizer : {
            //js : ['uglify-js','shutup'],
            js : ['uglify-js'],
        },
        preprocessor : {
            css : 'image-set'
        },
        postpackager : ['simple'],
        parser: {
            less: 'less',
            tmpl: 'utc'
        }
    },
    //打包
    pack : {
        '/static/styles/base.min.css': [
            '/dev_statics/styles/ui.css',
            '/dev_statics/styles/layout.css',
            '/dev_statics/styles/icon.css',
        ],
        '/static/scripts/base.min.js': [
            '/sea_modules/seajs/seajs/2.3.0/sea.js',
            '/sea_modules/seajs/seajs-css/seajs-css.js',
            '/sea_modules/seajs/seajs-preload/seajs-preload.js',
            '/sea_modules/seajs/seajs-log/seajs-log.js',
            '/sea_modules/config.js',
            '/sea_modules/init.js'
        ]
    },
    roadmap : {
        parser : {
            //coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee : 'coffee-script',
            //less后缀的文件使用fis-parser-less插件编译
            //处理器支持数组，或者逗号分隔的字符串配置
            less : ['less'],
            //md后缀的文件使用fis-parser-marked插件编译
            md : 'marked',
        },
        ext : {
            //less后缀的文件将输出为css后缀
            //并且在parser之后的其他处理流程中被当做css文件处理
            less : 'css',
            //coffee后缀的文件将输出为js文件
            //并且在parser之后的其他处理流程中被当做js文件处理
            coffee : 'js',
            //tpl: '.j'
            //md后缀的文件将输出为html文件
            //并且在parser之后的其他处理流程中被当做html文件处理
            //md : 'html'
        },
        domain : {
            //'**.css' : 'http://127.0.0.1:8080',
            //'**.js' : 'http://127.0.0.1:8080',
            'image' : ['http://127.0.0.1:8080']
        },
        path : [
            /*网站模块发布*/
            {
                reg : /^\/web_modules\/(.*)\.(js)$/i,
                id : '$1',
                isMod : true,
                release : '${module}/$1'
            },
            {
                reg : /^\/web_modules\/(.*)/i,
                id : '$1',
                isMod : false,
                release : '${module}/$1',
                useSprite: true
            },
            {
                reg : /^\/dev_public\/(.*)/i,
                id : '$1',
                isMod : false,
                release : '${pub}/$1',
            },
            /*系统依赖模块发布*/
            {
                reg : /^\/sea_modules\/(.*)/i,
                id : '$1',
                isMod : false,
                release : '${module}/$1'
            },
            {
                reg : /^\/web_tpl\/(.*)/i,
                release : '${tpls}/$1'
            },
            /*静态资源发布*/
            {
                reg : /^\/dev_statics\/(.*)/i,
                release : '${statics}/$1',
                useSprite: true,
                query: '?t=20140620',
            },
            {
                reg : "README.md",
                release : '$&'
            },
            {
                //所有的ico文件
                reg : '**.ico',
                useHash : false,
            },
            {
                reg : /.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)/,
                useCache : false,
                release : '$&'
            },
        ]
    },
    settings : {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        lint : {
            jshint : {
                ignored : [/jquery|easing|store|cookie/i],
                i18n : 'zh-CN',
                camelcase : true,
                curly : true,
                eqeqeq : true,
                forin : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                noempty : true,
                node : true
            }
        },
        optimizer : {
            'uglify-js' : {
                output : {
                    max_line_len : 500,
                    ascii_only : true
                },
                mangle : {
                    //不要压缩require关键字，否则seajs会识别不了require
                    except : [ 'require' ]
                }
            },
            'clean-css' : {
                keepBreaks : false
            },
            'png-compressor' : {
                //type : 'pngquant'
            }
        },
        spriter : {
            csssprites : {
                layout : 'matrix',
                margin : 20
            }
        }
    },
    //部署
    deploy : {
        local : {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '/Users/bobo/wwwRoot/www_Root/nmtree.github.io',
            replace : {
                from : ['http://127.0.0.1:8080','http://localhost:8080'],
                to : 'http://git.nmtree.com'
            },
        },
        remote : {
            receiver : 'http://labs.nmtree.com/fis/receiver.php',
            //from : '/static',
            to : '/home/wwwroot/labs_nmtree_com/public_html/fis',
            replace : {
                from : ['http://127.0.0.1:8080','http://localhost:8080'],
                to : 'http://labs.nmtree.com/fis'
            },
            /*
            //通配或正则过滤文件，表示只上传所有的js文件
            include : '**.js',
            //widget目录下的那些文件就不要发布了
            exclude : /\/widget\//i,
            */
        }
    }
});
