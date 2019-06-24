// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// const FastClick = require('fastclick')
import Plugin from './api/judge'
import { Scroller,TransferDom,XInput,Group,LoadingPlugin,Icon,Spinner,Popup,Picker,Tab,TabItem,ToastPlugin,ConfirmPlugin,Popover } from 'vux'
import App from './App'
import qs from 'qs'
import router from './router'
import store from './store/index.js'
import 'amfe-flexible'
import 'babel-polyfill'
import mixin from './mixin.js'
import Vuecookie from 'vue-cookie'
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ConfirmPlugin)
Vue.use(Vuecookie)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(Plugin)
Vue.directive('transfer-dom', TransferDom)
Vue.component('scroller', Scroller)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('icon', Icon)
Vue.component('spinner', Spinner)
Vue.component('popup', Popup)
Vue.component('picker', Picker)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('popover', Popover)
const routerToggle = function (str){
    var arr = ['/setmoneypaw','/band-bankcard'],userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if(arr.indexOf(str)>-1){
        switch (str) {
            case '/setmoneypaw':
                return !userinfo.isset_coin_pwd
            case '/band-bankcard':
                return !userinfo.is_bind_bank
        }
    }else{
        return true
    }
}
const regRouter = function(str){
    var notAllowRouters = [
        '/manage',
        '/payDetails',
        '/betRecord',
        '/usertask',
        '/ssc_cq',
        '/ssc_fenfen',
        '/ssc_sanfen',
        '/pk10_bj',
        '/pk10_jisu',
        '/pk10_fenfen',
        '/xyft',
        '/28_lucky',
        '/6_hk',
        '/6_jisu',
        '/shaibao',
        '/niuniu',
    ]
    return notAllowRouters.indexOf(str)
}
router.beforeEach((to,from,next) => {
    store.commit('routerStatus',to.meta);
    // Vue.$vux.loading.show({text: '加载中'})
    if(!Vuecookie.get('webToken')){
        if(regRouter(to.path)>-1){
            Vue.$vux.confirm.show({
                title: '温馨提示',
                content:'您还未登录，请先登录！',
                confirmText:'确认',
                showCancelButton:false,
                onConfirm () {
                    next('/login')
                }
            });
        }else{
            next();
        }
    }else{
        if(routerToggle(to.path)){
            next();
        }else{
            next(from.path)
        }
    }
})
router.afterEach((to,from,next) => {
    Vue.$vux.loading.hide()
})
// 配置axios默认参数
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截
axios.interceptors.request.use(config => {
    let token = Vuecookie.get('webToken') || ' '
    if (token) config.headers['Authorization'] = 'Bearer ' + token;
    return config
}, function (error) {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('网络连接失败','bottom')
    return Promise.reject(error)
})
// 返回结果拦截
axios.interceptors.response.use(response => {
    Vue.$vux.loading.hide()
    if(response.data.code === 10302){
        Vue.$vux.confirm.show({
            title:'温馨提示',
            content:response.data.msg_zh,
            showCancelButton:false,
        })
    }
    if (response.data.code === 10005) { // 网站维护
        return router.push({path:'/maintain'})
    }
    if (response.data.code == 401  || response.data.code === 19999) {
        return Vue.$vux.confirm.show({
            title: '温馨提示',
            content:'您的登录已过期，请重新登录！',
            confirmText:'确认',
            showCancelButton:false,
            onConfirm () {
                localStorage.clear()
                sessionStorage.clear()
                Vuecookie.delete('webToken')
                Vuecookie.delete('nickname')
                response.config.headers['Authorization'] = ''
                Vue.$vux.loading.hide()
                store.commit('userinfo','')
                router.push({path:'/login'})
            }
        });
    }
    // 20001表示签到未达到要求，不是错误提示
    if(response.data.code != 0 && response.data.code != 20001 && response.config.url!='/static/js/zh_pro.json' && response.data.msg_zh && '账户余额不足' && response.data.code != 30001){
        Vue.$vux.toast.show({
            type:'text',
            text:response.data.msg_zh,
            position:'bottom',
            width:'auto',
            time:3000
        })
    }
    return response
}, function (error) {
    console.log(1213)
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('网络连接失败','bottom')
    return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    mixins:[mixin],
    components: { App },
    template: '<App/>'
})
// FastClick.attach(document.body)
