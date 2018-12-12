import axios from 'axios'
import {
	Message,
	Alert
} from 'element-ui'
import qs from 'qs'
import router from '../router';
const service = axios.create({
	baseURL: process.env.BASE_URL, // api 的 base_url
	timeout: 50000, // 请求超时时间

	withCredentials: true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	}
})

//请求拦截器
service.interceptors.request.use(
	req => {
		console.info("request请求:", req.data);
		req.headers = {
			'Content-Type': 'application/json' // 设置很关键
        }
        // req.data = qs.stringify(req.data);
		return req;
	}, err => {
        console.info("请求失败");
		return Promise.reject(err);
	}
)


//响应拦截器
service.interceptors.response.use(res => {
    console.info("返回数据：", res);
	if (res.status !== 200) {
		//说明请求出现错误
		responseError(res);
		return Promise.reject('error')
    } 
    else if (res.status === 200 && res.data.code !== '1'&& res.data.code !== '2') {
		//说明请求成功。但是业务处理失败
		responseError(res);
		return Promise.reject('error')
    } 
    else if (res.status === 200) {
        console.info('返回数据res==',res.data.code=='2')
		//处理成功、
		//如果是未登录
		if(res.data&&res.data.code=='2'){
            router.push('/login')
		}
		return res.data;
	}
}, err => {
	responseError(err.response);
	return Promise.reject(err);
})

function responseError(response) {
    console.info("resp:",response)
	if (!response ||( response.status === 200 && !response.data.message) ){
		return;
	}
	let message = response.data.message;
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
		// debugger;
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
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		console.info("post请求", url);
		// debugger;
		service.post(url, data)
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
