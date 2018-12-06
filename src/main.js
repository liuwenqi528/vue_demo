// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'

// //引入封装的axios和cookie工具
import {post,get,patch,put} from './utils/http'
import {getCookie,setCookie,delCookie,getAllCookie} from './utils/util'

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
	if (to.matched.length === 0) { //如果未匹配到路由
		from.name ? next({
			path: from.path
		}) : next({
			path: '/'
		}); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
	} else {
		if (to.path === '/') {
			next()
		} else {
			if (!window.sessionStorage.userInfo && !store.state.userInfo) {
				next({
					path: '/'
				})
			} else {
				next()
			}
		} //如果匹配到正确跳转
	}
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
