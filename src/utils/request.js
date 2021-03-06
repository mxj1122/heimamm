import Vue from 'vue'
import axios from "axios"
// 导入token
import { getToken } from '@/utils/token'

// 设置axios基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许携带cookies
axios.defaults.withCredentials = true


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // return config;
    const token = getToken()
    if (token) {
        config.headers.token = token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
Vue.prototype.$axios = axios