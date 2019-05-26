import Vuex from 'vuex';
import Vue from 'vue';
import test from './modules/test.js'
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		test
	},
	sttestte: {
		login: false,
		token: '',
		title: 'hello',
		avatarUrl: '',
		userName: ''
	},
	mutations: {
		login(state, provider) {
			console.log(state)
			console.log(provider)
			state.title = provider.title;
			state.login = true;
			state.token = provider.token;
			state.userName = provider.userName;
			state.avatarUrl = provider.avatarUrl;
		},
		logout(state) {
			state.login = false;
			state.token = '';
			state.userName = '';
			state.avatarUrl = '';
		}
	},
	getters: {
		title(state, getter) {
			return 'haha'
		}
	},
	actions: {
		getTime(e, v) {
			console.log(e, v)
		}
	}
})

export default store
