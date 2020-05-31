import Vue from 'vue'
import VueRouter from 'vue-router'


// 子组件导入 
import Login from '@/views/login'
import Layout from '@/views/layout'


Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {path:'/',redirect:"/login"},
        {path:'/login',component:Login},
        {path:'/layout',component:Layout}
    ]
})

export default router