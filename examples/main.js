import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import elementTable from '../src/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(elementTable, {
  page: 'page',
  pageSize: 'limit',
  code: 'stat',
  apiSuccess: 1,
  data: 'data.list',
  total: 'data.total',
})

new Vue({
  render: h => h(App),
}).$mount('#app')
