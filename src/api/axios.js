import axios from 'axios';
import {BASEURL} from "../config/base";
import store from '../store';
let instance=axios.create({
    baseURL:BASEURL,
});
//请求拦截  在发送请求之前拦截
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = sessionStorage.getItem('token') || '';
    config.headers.token=token;
    store.commit('change',true);
    return config;
}, function (error) {
    // Do something with request error
    store.commit('change',false)
    return Promise.reject(error);
});
//响应拦截
instance.interceptors.response.use(function (response) {
    // Do something with response data
    store.commit('change',false);
    return response.data;
}, function (error) {
    // Do something with response error
    store.commit('change',false);
    return Promise.reject(error);
});
export default instance;