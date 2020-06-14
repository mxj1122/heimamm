import Vue from 'vue'
import VueRouter from 'vue-router'


// 子组件导入 
import Login from '@/views/login'
import Layout from '@/views/layout'
import Chart from '@/views/layout/chart'
import Enterprise from '@/views/layout/enterprise'
import Question from '@/views/layout/question'
import Subject from '@/views/layout/subject'
import User from '@/views/layout/user'

// token导入
import { getToken } from '@/utils/token'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: "/login" },
        { path: '/login', component: Login },
        { path: '/layout', component: Layout ,children:[
            {path:'chart',component:Chart},
            {path:'enterprise',component:Enterprise},
            {path:'question',component:Question},
            {path:'subject',component:Subject},
            {path:'user',component:User}
        ]}
    ]
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
    // 如果访问注册页面   不做判断
    if (to.fullPath == '/login') {
        next()
    } else {
        const token = getToken();
        if (!token) {
            next('/login')
        } else {
            next()
        }

    }
})



export default router