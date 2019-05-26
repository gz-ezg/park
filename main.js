import Vue from 'vue'
import store from './store'  
import App from './App'
import api from '@/utils/uniApi'

Vue.config.productionTip = false
Vue.prototype.$store = store  
Vue.prototype.$api = api  

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
