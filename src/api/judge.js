import Vue from 'vue'
import axios from 'axios'
import { apis } from './config'
import md5 from 'js-md5'
import qs from 'qs'
import {objKeySort} from "../assets/js/util";

/**
 *
 * @param url 请求地址
 * @param params 请求参数
 * @returns {Promise<any>}
 */
export function axiosGet(url, params) {
    let secret = '' // 秘钥
    params ? secret = objKeySort(params) + 'secret=22a950f3a33160517920a23ef18baf5e' : secret = 'secret=22a950f3a33160517920a23ef18baf5e'
    url = apis[url]
    params.sign = md5(secret)
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then( res =>{
            resolve(res.data)
        })
        .catch(function (error) {
            reject(error)
        })
    })
}

export function axiosPost(url, params) {
    let secret = ''
    params ? secret = objKeySort(params) + 'secret=22a950f3a33160517920a23ef18baf5e' : secret = 'secret=22a950f3a33160517920a23ef18baf5e'
    url = apis[url]
    params.sign = md5(secret)
    // console.log(secret, params.sign)
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(function (response) {
            resolve(response.data)
        })
        .catch(function (error) {
            reject(error)
        })
    })
}

export default {
    install(Vue, options) {
        Vue.prototype.$get = axiosGet
        Vue.prototype.$post = axiosPost
        Vue.prototype.$http = axios
    }
}
