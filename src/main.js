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
	console.info("to==", to);
	console.info("from==", from);
	console.info("next==", next);
	console.info("to.matched.length === 0:", to.matched.length === 0)
	if (to.matched.length === 0) { //如果未匹配到路由
		from.name ? next({
			path: from.path
		}) : next({
			path: '/login'
		}); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
	} else {
		//如果没有登录信息。则跳转到登陆界面。
		if (!sessionStorage.getItem('userInfo') && !store.state.userInfo) {
            console.info('no session')
            if (to.path != '/login') {
				next({
					path: '/login'
				})
			}
		} else if (to.path === '/') {
            console.info("to index");
			next({
				path: '/index'
			})
		} 
    }
    console.info("{（）}");
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
