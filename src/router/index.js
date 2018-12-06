import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '../assets/date';
//引入的页面
import Home from '@/components/layout/home'
import Food from '@/components/food'
import Rating from '@/components/rating'
import Seller from '@/components/seller'
import User from '@/components/modules/system/user'
// import NoFoundPage from '@/components/error/404'

Vue.use(Router)
Vue.use(ElementUI)
const  router =  new Router({
	routes: [
		{
			path: '/',
			name: '首页',
			component: Home
		},{
			path: '/food',
			name: '食品',
			component: Food
		},
		{
			path: '/seller',
			name: '卖',
			component:  Seller
		},
		{
			path: '/rating',
			name: '折扣',
			component: Rating
		},
		{
			path: '/user',
			name: '用户管理',
			component: User
		}
		/*,
		{
			path:'*',
			name:'404',
			component:NoFoundPage
		}*/
	],

})

export default router

