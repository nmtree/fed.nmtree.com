/* 
 *  提示组件模块：tip
 * ----------------------------------
 *  作者：听着情歌流泪
 *  时间：2014-08-27
 *  准则：CMD 规范
 *  联系：281829389（qq）
 ************************************************************/

define('nmtree/tip/1.0.0/tip',function(require, exports, module){
	require('nmtree/tip/1.0.0/tip.css');
	//引用相关模块

	function Tip() {
		this._$tipTemplate = $('<div class="ui '+NM.themes+' nm-tip"><i></i><p>{content}</p></div>');
		this._$body = $('body');
	}

	//显示提示
	Tip.prototype.show = function(msg, timeout, type) {
		msg = msg ? msg : '这是一个提示信息！';
		timeout = timeout ? timeout : 2000;
		type = type ? type : 'info';

		//克隆一个消息框
		var $tip = this._$tipTemplate.clone().addClass('nm-' + type);
		switch (type){
			case 'info' :
				$tip.children('i').addClass('attention icon');
			break;
			case 'success' :
				$tip.children('i').addClass('checkmark icon');
			break;
			case 'error' :
				$tip.children('i').addClass('frown icon');
			break;
			case 'warning' :
				$tip.children('i').addClass('warning icon');
			break;
			case 'loading' :
				$tip.children('i').addClass('loading icon');
			break;
		};
		//填充提示信息
		$tip.children('p').text(msg);
		//显示提示框并校正位置
		this._$body.append($tip);
		$tip.css('margin-left', $tip.width()/-2);
		//延迟关闭
		setTimeout(function () {
			$tip.remove();
		}, timeout);
	};

	//显示提示信息
	Tip.prototype.info = function(msg, timeout) {
		this.show(msg, timeout, 'info');
	};

	//显示成功信息
	Tip.prototype.success = function(msg, timeout) {
		this.show(msg, timeout, 'success');
	};

	//显示错误信息
	Tip.prototype.error = function(msg, timeout) {
		this.show(msg, timeout, 'error');
	};

	//显示警告信息
	Tip.prototype.warning = function(msg, timeout) {
		this.show(msg, timeout, 'warning');
	};

	//显示loading
	Tip.prototype.loading = function(msg, timeout) {
		this.show(msg, timeout, 'loading');
	};
	//实例化Tip对象
	var tip = new Tip();

	//输出模块接口
	module.exports = tip;	
});