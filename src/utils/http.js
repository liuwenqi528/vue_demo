import axios from 'axios'
import {
	Message,
	Alert
} from 'element-ui'

const service = axios.create({
	baseURL: process.env.BASE_URL, // api 的 base_url
	timeout: 50000, // 请求超时时间

	withCredentials: true,
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest'
	}
})

//请求拦截器
service.interceptors.request.use(
	req => {
		console.info("request请求:", req.data);
		req.headers = {
			'Content-Type': 'application/x-www-form-urlencoded' // 设置很关键
		}
		return req;
	}, err => {
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
	} else if (res.status === 200 && res.data.code !== '1') {
		//说明请求成功。但是业务处理失败
		responseError(res);
		return Promise.reject('error')
	} else if (res.status === 200) {
		//处理成功、
		//如果是未登录
		// if(res.data&&res.data.code==2){
		// 	Alert('登录用户已超时，请重新登录', '提示', {
		// 		confirmButtonText: '确定',
		// 		type:'warning',
		// 		closeOnClickModal:false,
		// 		callback: action => {
		// 			router.push('/watchHouse-css')
		// 		}
		// 	});
		// }
		return res.data;
	}
}, err => {
	requestError(err.response);
	return Promise.reject(err);
})

function responseError(response) {
	if (response.status === 200 && !response.data.message) {
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
