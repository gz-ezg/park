import {
	BaseService,
	RequestRroxyCodeFactory
} from '@/services/Base';
import {
	_config
} from '@/config/app';

export const delegate = {
	async errHandler(errcode, errmsg) {
		if (errcode == '40000') {
			return true;
		} else {
			if (errcode == '50003') {
				// removeToken();
				uni.showToast({
					title: '登录已过期',
					icon:'none'
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				},1000)

			}
			return false;
		}
	}
};

class MiniProgramRequestProxy extends RequestRroxyCodeFactory {
	constructRequestBody(req) {

		req.req.header = Object.assign({}, req.header, {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		});
		return req.req;
	}

	async constructResponse(res) {
		const {
			data
		} = res;
		if ('msgCode' in data) {
			const status = await delegate.errHandler(data.msgCode, data.msg);

			if (status) {
				return Promise.resolve(data.data);
			} else {
				return Promise.reject();
			}
		} else {
			const status = await delegate.errHandler(data.code || 0, data.error);

			if (status) {
				return Promise.resolve(data.data);
			} else {
				return Promise.reject();
			}
		}
	}

	checkNetworkStatus() {
		return true;
	}

	async preprocessRequest({
		req,
		config
	}) {
		if (!this.checkNetworkStatus()) {
			throw new Error('network connection failed.');
		}

		const {
			hasLoading = false, isAuth = true
		} = config;
		req = this.constructRequestBody({
			req,
			isAuth
		});

		return req;
	}
}
const miniProgramRequestProxy = new MiniProgramRequestProxy();

export class HttpService extends BaseService {
	constructor(uriPrefix) {
		super('', uriPrefix);
	}

	post(data = {}, config) {
		const req = {
			url: this.getUri(config.url),
			method: 'POST',
			data
		};
		return this.requestProxy({
			req,
			config
		});
	}

	get(params = {}, config) {
		const req = {
			url: this.getUri(config.url),
			method: 'GET',
			params
		};

		return this.requestProxy({
			req,
			config
		});
	}

	async requestProxy({
		req,
		config
	}) {
		let res;

		try {
			req = await miniProgramRequestProxy.preprocessRequest({
				req,
				config
			});
			console.log(req)
		} catch (error) {
			console.warn(error);
			return;
		}
		console.log(req)
		try {
			res = await this.request(req);
		} catch (e) {
			res = e;
		}

		console.log(req)
		console.warn(res, req)

		res = await miniProgramRequestProxy.constructResponse(res);
		return res;
	}
}
