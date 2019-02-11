import axios from 'axios'
import {
	Message,
	Alert,
	MessageBox
} from 'element-ui'
import qs from 'qs'
import router from '../router';
import { getCookie } from './util';
const service = axios.create({
	baseURL: process.env.BASE_URL, // api 的 base_url
	timeout: 500000, // 请求超时时间
	withCredentials: true,
	headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        	// 'Content-Type': 'application/json'
		'X-Requested-With': 'XMLHttpRequest'
	}
})

//请求拦截器
service.interceptors.request.use(
	req => {
        console.info("req",req);
        let token = getCookie("rememberId");
        console.info("token",token);
        if (token) {
            req.params = {'rememberId': token} //后台接收的参数，后面我们将说明后台如何接收
          }   
		return req;
	}, err => {
        console.info("req err");
		return Promise.reject(err);
	}
)


//响应拦截器
service.interceptors.response.use(res => {
    // debugger;
    console.info("res:",res);
	if (res.status !== 200) {
		//说明请求出现错误
		responseError(res);
		return Promise.reject('error')
	} else if (res.status === 200 && res.data.code !== '1' && res.data.code !== '2') {
		//说明请求成功。但是业务处理失败
		responseError(res);
		return Promise.reject('error')
	} else if (res.status === 200) {
		//处理成功、
		//如果是未登录
		if (res.data && res.data.code == '2') {
			MessageBox({
				title: '提示',
				message: '请先进行登陆',
				type: 'warning',
				closeOnClickModal: false,
				callback: (action, install) => {
					router.push('/login');
				}
			});
		}
		return res;
	}
}, err => {
	responseError(err);
	return Promise.reject(err);
})

function responseError(err) {
    
	let message = '';
	if (err && err == 'Error: Network Error') {
		message = "请求失败，服务器故障！";
	} else {
		let response = err.status?err: err.response;
		if (!response || (response.status === 200 && !response.data.message)) {
			return;
		}
		message = response.data.message;
		switch (response.status) {
			case 500:
				{
					message = "请求失败，服务器故障！";
					break;
				}
			case 404:
				{
					message = "请求失败，访问地址不存在！";
					break;
				}
			case 401:
				{
					message = "请求失败，权限不足！";
					break;
				}
			case 400:
				{
					message = "请求失败，服务器故障！";
					break;
                }
            case 504:
                {
                    message = "服务器无法连接！";
                    break;
                }
		}
	}
	Message({
		message: message,
		center: true,
		type: 'error',
		duration: 5 * 1000
	});
}


/**
 * get请求封装
 * @param {*} url  请求地址
 * @param {*} params  请求参数
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		service.get(url, {
			params: params
		}).then(response => {
			resolve(response.data);
		}).catch(err => {
			reject(err);
		})
	})
}

/**
 * post请求封装
 * @param {*} url  请求地址
 * @param {*} params  请求参数
 */
export function post(url, data = {}, headers = {}) {
    console.info("export post")
	return new Promise((resolve, reject) => {
		service.post(url, data, {
				headers: headers
			})
			.then(response => {
				resolve(response.data);
			}).catch(err => {
				reject(err);
			})
	})
}

/**
 * patch方法封装
 * @param {*} url  请求地址
 * @param {*} params  请求参数
 */
export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		service.patch(url, data)
			.then(response => {
				resolve(response.data);
			}).catch(err => {
				reject(err);
			})
	})
}

/**
 * put请求封装
 * @param {*} url  请求地址
 * @param {*} params  请求参数
 */
export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		service.put(url, data)
			.then(response => {
				resolve(response.data);
			}).catch(err => {
				reject(err);
			})
	})
}
// export default service;
