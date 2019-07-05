import Vue from 'vue'
import store from './store'
import App from './App'
import api from '@/utils/uniApi'
import {
	channelLogicApi
} from '@/services/channelLogicApi.js'
import xLoading from './components/x-loading/x-loading.vue'
import xPopup from './components/x-popup/x-popup.vue';




Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$http = channelLogicApi

Vue.component('x-Loading', xLoading)
Vue.component('x-popup', xPopup)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
