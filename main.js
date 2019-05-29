import Vue from 'vue'
import store from './store'
import App from './App'
import api from '@/utils/uniApi'
import {
	channelLogicApi
} from '@/services/channelLogicApi.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$http = channelLogicApi

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
