import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs'
import {
	getCookie,
	setCookie,
	delCookie,
	getAllCookie
} from '../utils/util'

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
	state: {
		options: [],
		activeIndex: '/',
		userInfo: null,
		menuIndex: '0',
		tabState: false
	},
	mutations: {
		// 添加tabs
		add_tabs(state, data) {
			this.state.options.push(data);
			// sessionStorage.setItem("options",this.state.options);
		},
		// 存储index
		save_index(state, data) {
			this.state.menuIndex = data ? data : '0';
		},
		// 删除tabs
		delete_tabs(state, route) {
            let index =0;
			for (let option of state.options) {
				if (option.path === route) {
					break;
				}
				index++;
			}
			this.state.options.splice(index, 1);
		},
		// 设置当前激活的tab
		set_active_index(state, index) {
			this.state.activeIndex = index;
		},
		// 设置详情信息
		save_detail_info(state, info) {
            let userInfo = JSON.stringify(info);
            this.state.userInfo = userInfo;
            sessionStorage.setItem("userInfo",userInfo);
            // setCookie("userInfo",userInfo);
        },
		// 退出
		logout(state) {
            this.state.userInfo = null
            sessionStorage.removeItem("userInfo");
            delCookie("userInfo");
		}
	},
	modules: {

	}
});

export default store;
