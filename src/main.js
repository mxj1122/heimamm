import Vue from 'vue'
import App from './App.vue'


// 路由导入
import router from '@/router'
Vue.config.productionTip = false
// import "@/styles/base.less"
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
