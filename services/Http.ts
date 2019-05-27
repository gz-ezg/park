import { BaseService, RequestRroxyCodeFactory } from '@/services/Base';
import { removeToken } from '@/utils/auth';
import { _config } from '@/config/app';

export const delegate = {
	async errHandler(errcode, errmsg) {
		if (errcode == '40000') {
			return true;
		} else {
			console.log('');

			if (errcode == '50003') {
				// removeToken();
				uni.navigateTo({ url: '/pages/login/login' });
			}
			return false;
		}
	}
};

class MiniProgramRequestProxy extends RequestRroxyCodeFactory {
	constructRequestBody(req) {

		req.headers = Object.assign({}, req.headers, {
			'x-requested-with': _config.version,
			'x-pin-corpid': '0',
			'x-pin-appid': _config.app_id
		});

		return req;
	}

	async constructResponse(res) {
		const { data }= res.res;

		if ('errcode' in data) {
			const status = await delegate.errHandler(data.errcode, data.errmsg);

			if (status) {
				return Promise.resolve(data.data);
			} else {
				return Promise.reject();
			}
		} else {
			const status = await delegate.errHandler(data.code || 0, data.error);

			if (status) {
				return Promise.resolve(data);
			} else {
				return Promise.reject();
			}
		}
	}

	checkNetworkStatus(): boolean {
		return true;
	}

	async preprocessRequest({ req, config }: any) {
		if (!this.checkNetworkStatus()) {
			throw new Error('network connection failed.');
		}

		const { hasLoading = false, isAuth = true } = config;
		req = this.constructRequestBody({ req, isAuth });

		// todo: show loading status
		return req;
	}
}
const miniProgramRequestProxy = new MiniProgramRequestProxy();

export class HttpService extends BaseService {
	constructor(uriPrefix: any) {
		super('', '/gateway');
	}

	post(data = {}, config: IRequestExtraConfig): Promise<any> {
		const req = {
			url: this.getUri(config.url),
			method: 'post',
			data
		};

		return this.requestProxy({ req, config });
	}

	get(params = {}, config: IRequestExtraConfig): Promise<any> {
		const req = {
			url: this.getUri(config.url),
			method: 'get',
			params
		};

		return this.requestProxy({ req, config });
	}

	async requestProxy({ req, config }: any) {
		let res;

		try {
			req = await miniProgramRequestProxy.preprocessRequest({ req, config });
		} catch (error) {
			console.warn(error);
			return;
		}

		try {
			res = await this.request(req);
		} catch (e) {
			res = e;
		}

		res = await miniProgramRequestProxy.constructResponse({ res });
		return res;
	}
}
