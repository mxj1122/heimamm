import Vue from 'vue'
import App from './App.vue'


// 路由导入
import router from '@/router'
// Element-UI导入
import "@/plugins/elementui/elementui"


Vue.config.productionTip = false
// 也可以在这里导入基本样式
// import "@/styles/base.less"



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
