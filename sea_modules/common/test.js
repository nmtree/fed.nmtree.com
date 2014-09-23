define('common/test',function(require, exports, module) {
	'use strict';
	(function(test){

		test.init = function() {
			//console.log(this.version);
		};
		test.show = function(){
			//alert('shwo')
		};

		if (typeof module != "undefined" && typeof module != "function") {
            module.exports = test;
        } else if (typeof define === "function" && define.amd) {
            define([ "jquery" ],test);
        } else {
            //this.test = test;
             test( jQuery );
        }
	})( {version:'1.0'} );

})
