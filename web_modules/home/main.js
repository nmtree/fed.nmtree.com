/**************************************************************
* @name		:	
* @version	:	v1.0.0
* @author	:	听着情歌流泪
* @email	:	bobo.xiao@nmtree.com
* @explain	:	global script
* @created	:	
* @update   :
**************************************************************/
;(function(){
    'use strict';
    var Home = (function (options) {
        var token       = options.token,
            username    = options.username;
        Home.User = function() {
            this.show = function() {
                console.log(Base64.encode('bobo.xiao@nmtree.com'));
                console.log(MD5.hexdigest('bobo.xiao@nmtree.com'));
                console.log(Base64.encode(username));
            }
        };

        this.getUser = function() {
          return new Home.User();
        };
    });
    
    var github = new Home({
        token : 'af605e9303fabef95f13ddcddd6e830285383b6f',
        username : 'bobo.xiao@nmtree.com'
    });
    module.exports = github;

}).call(this);
//nmBox.dialog();