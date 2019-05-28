import {
	getUrlQuery
} from '@/utils/index.js';
import {
	toastConfig
} from '@/config/app.js'

const linkTo = ({
	url,
	type,
	data
}) => {
	// TODO: `AUTH` might be a property from getApp() or data
	// Here we just set it to `true` if you don't have auth stuff.
	const AUTH = true;

	if (AUTH) {
		switch (type) {
			case 'navigateTo':
				uni.navigateTo(getUrlQuery(url, data));
				break;
			case 'redirectTo':
				uni.redirectTo(getUrlQuery(url, data));
				break;
			case 'switchTab':
				uni.switchTab(getUrlQuery(url, data));
				break;
			case 'reLaunch':
				uni.reLaunch(getUrlQuery(url, data));
				break;
			default:
				break;
		}
	} else {
		uni.navigateTo({
			url: "/pages/error/error"
		});
	}
};

const navigateTo = ({
	url
}, data = {}) => {
	linkTo({
		url,
		data,
		type: 'navigateTo'
	});
};

export const redirectTo = ({
	url
}, data = {}) => {
	linkTo({
		url,
		data,
		type: 'redirectTo'
	});
};

export const switchTab = ({
	url
}, data = {}) => {
	linkTo({
		url,
		data,
		type: 'switchTab'
	});
};

export const reLaunch = ({
	url
}, data = {}) => {
	linkTo({
		url,
		data,
		type: 'reLaunch'
	});
};

export const toast = (config) => {
	if (typeof config == 'string') {
		return uni.showToast(Object.assign({}, toastConfig, {
			title: config
		}))
	} else {
		return uni.showToast(
			Object.assign({}, toastConfig, config))
	}
}

const api = {
	navigateTo,
	reLaunch,
	switchTab,
	redirectTo,
	toast
}
export default api;
