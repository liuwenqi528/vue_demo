// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import qs from 'qs'

// //引入封装的axios和cookie工具
import {
	post,
	get,
	patch,
	put
} from './utils/http'
import {
	getCookie,
	setCookie,
	delCookie,
	getAllCookie
} from './utils/util'

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.prototype.$getCookie = getCookie;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$delCookie = delCookie;
Vue.prototype.$getAllCookie = getAllCookie;


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    // debugger;
    //如果是跳转到登陆页面，则记录一下跳转之前的页面。用于登陆后直接访问
	if (to.path === '/login' && from.path !== '/') {
        sessionStorage.setItem("toPath",from.path);
    }
    //如果未匹配到路由
	if (to.matched.length === 0) { 
		from.name ? next({
			path: from.path
		}) : next({
			path: '/login'
		});
	} else {
        console.info("session UserInfo :",sessionStorage.getItem('userInfo'));
        console.info("store UserInfo :",store.state.userInfo);
		//如果没有登录信息。则跳转到登陆界面。
		if (!sessionStorage.getItem('userInfo') && !store.state.userInfo) {
			if (to.path != '/login') {
				next({
					path: '/login'
				})
			}
		} else if (to.path === '/') {
			next({
				path: '/index'
			})
		}
	}
	next();
})

/* eslint-disable no-new */
let app = new Vue({
	el: '#app',
	router,
	store,
	data: {
		Bus: new Vue()
	},

	components: {
		App
	},
	template: '<App/>'
})
