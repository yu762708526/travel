import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../mint'

// 引入全部组件
// import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

// Vue.use(Mint)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
