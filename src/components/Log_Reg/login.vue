<template>
    <section class="comBox">
        <TrayHeader :title="title" />
        <a :href="firmUrl" target="_blank" class="kefu"><i></i>联系客服</a>
        <div class="content">
            <span class="logo"></span>
            <form class="form">
                <div>
                    <i class="icon i_u"></i>
                    <input type="text" v-model="account" placeholder="请输入6-16位用户名" maxlength="16" @blur="isUser()" onkeyup="this.value=this.value.replace(/[^a-z0-9_]/g,'');" />
                    <!--<input type="text" v-model="account" placeholder="请输入用户名" maxlength="16" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')" />-->
                </div>
                <div>
                    <i class="icon i_p"></i>
                    <input type="password" v-model="password" ref="isPsd" placeholder="请输入密码" maxlength="16" />
                    <i :class="{'showEye': iconEye, 'closeEye': !iconEye}" @click="isEyes"></i>
                </div>
                <button type="button" class="com_btn" @touchstart="login()">登录</button>
                <p class="info clearfix">
                    <!--<a>游客试玩</a>-->
                    <router-link to="/register">立即注册</router-link>
                    <router-link to="/forgetPwd">忘记密码</router-link>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
    const TrayHeader = import('../public/rn-header')
    import {regTest} from "../../assets/js/util";
    export default {
        name: "login",
        components: {
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '登录',
                account: '', // 账号
                password: '', // 密码
                firmUrl: '', // 客服链接
                iconEye: false // 是否显示密码
            }
        },
        methods: {
            isEyes () { // 密码框切换
                this.iconEye = !this.iconEye
                if (this.iconEye) {
                    this.$refs.isPsd.setAttribute('type', 'text')
                } else {
                    this.$refs.isPsd.setAttribute('type', 'password')
                }
            },
            // 在线客服链接
            get_setting () {
                this.$get('setting', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.firmUrl = res.data.online_service.value
                    sessionStorage.setItem('kefuUrl', this.firmUrl)
                })
            },
            login () {
                if (!regTest().regAccount.test(this.account) && this.account) return this.$vux.toast.text('用户名至少6~16数字、字母下划线组合', 'middle')
                // if (!this.account || this.account.length < 6) return this.$vux.toast.text('用户名至少6~16字符组合', 'middle')
                if (!regTest().regPwd.test(this.password)) return this.$vux.toast.text('密码至少6~16字符组合', 'middle')
                let module = {
                    username: this.account,
                    password: this.password
                }
                this.$vux.loading.show({text: '登录中'})
                this.$post('login', module).then(res => {
                    this.$vux.loading.hide()
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    localStorage.setItem('account', this.account)
                    this.$cookie.set('webToken', res.data.token, {expires: '24h'})
                    this.$router.push('/')
                })
            }
        },
        mounted () {
            this.$nextTick(() => setTimeout(this.get_setting(), 500))
        },
        created () {
            if (this.$cookie.get('webToken')) this.$router.push('/')
            if (localStorage.getItem('account')) this.account = localStorage.getItem('account')
        }
    }
</script>

<style scoped lang="scss">
    @import "css/comm";
</style>
