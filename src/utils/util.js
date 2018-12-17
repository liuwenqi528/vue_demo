/**
 * 获取cookie
 * @param {*} name 
 */

export function getCookie(name) {
	console.info("getcookie==", name);
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return (arr[2]);
	} else {
		return "";
	}
}

/**
 * 获取所有的cookie
 * @param {*} name 
 */

export function getAllCookie() {
	console.info("getcookie==");

	return document.cookie;

}
/** 
 * 设置cookie
 * @param {*} name 
 * @param {*} value 
 * @param {*} expiredays 
 */
export function setCookie(name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());

}

/**
 * 删除某个cookie
 * @param {*} name 
 */
export function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

}
