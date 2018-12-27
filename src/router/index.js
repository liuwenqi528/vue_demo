import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '../assets/date';
//引入的页面
// 主体界面
import Home from '@/components/layout/home'
// 测试界面
import Food from '@/components/food'
import Rating from '@/components/rating'
import Seller from '@/components/seller'

//系统模块--用户模块
import userList from '@/components/modules/system/user/userList'
import userAdd from '@/components/modules/system/user/userAdd'

// 登录页面
import Login from '@/components/login'
// 首页
import Index from '@/components/index'
// import NoFoundPage from '@/components/error/404'

Vue.use(Router)
Vue.use(ElementUI)
const  router =  new Router({
	routes: [
		{
			path: '/login',
			name: '登陆',
            component: Login //改为重定向
		},{
			path: '/home',
            name: '主体',
            alias: '/',
            component: Home,
            children:[
                {
                    path: '/index',
                    name: '首页',
                    component: Index
                    
                },
                {
                    path: '/food',
                    name: '食品',
                    component: Food,  
                    menuShow: true, 
                    meta:{requireAuth: true }
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
                    component: userList,  
                    menuShow: true, 
                    meta:{requireAuth: true }
                }
                // ,
                // {
                //     path: '/userAdd',
                //     name: '用户添加',
                //     component: userAdd
                // }
            ]
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

