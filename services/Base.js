const http = uni.request

export class BaseService {
	host = '';
	uriPrefix = '';

	constructor(host, uriPrefix) {
		this.host = host;
		this.uriPrefix = uriPrefix;
	}

	getUri(uri = '') {
		if (uri && uri.match(/^http/)) {
			return uri;
		} else {
			if (this.uriPrefix) {
				return uri.indexOf('/') === 0 ?
					this.host + this.uriPrefix + uri :
					this.host + this.uriPrefix + '/' + uri;
			} else {
				return uri.indexOf('/') === 0 ? this.host + uri : this.host + '/' + uri;
			}
		}
	}

	requestProxy(options) {
		throw new Error('Abstract: should be overriden');
	}

	async request(req) {
		return new Promise((resolve, reject) => {
			http(req)
				.then(([err, res]) => {

					if (err) {
						if ('errMsg' in err && err.errMsg == "request:fail timeout") {
							uni.showToast({
								title: '请求超时',
								icon: 'none'
							})
						}

						return (err)
					}
					const {
						statusCode
					} = res;
					if (statusCode >= 200 && statusCode <= 300) {
						return resolve(res);
					} else {
						return reject(res);
					}
				})
		});
	}
}

export class RequestRroxyCodeFactory {
	constructRequestHeader() {
		throw new Error('Abstract: should be overriden');
	}

	constructRequestBody() {
		throw new Error('Abstract: should be overriden');
	}

	constructResponse() {
		throw new Error('Abstract: should be overriden');
	}

	checkNetworkStatus() {
		throw new Error('Abstract: should be overriden');
	}
}
