<template>
    <section class="comBox">
        <TrayHeader :title="title" />
        <a :href="firmUrl" target="_blank" class="kefu"><i></i>联系客服</a>
        <div class="content">
            <span class="logo"></span>
            <form class="form">
                <div>
                    <i class="icon i_u"></i>
                    <input type="text" v-model="username" placeholder="请输入6-16位用户名" maxlength="16" @blur="isUser()" onkeyup="this.value=this.value.replace(/[^a-z0-9_]/g,'');" />
                </div>
                <div>
                    <i class="icon i_ph"></i>
                    <input type="text" v-model="account" placeholder="请输入手机号码" maxlength="11" @blur="isPhone()" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' />
                </div>
                <div>
                    <i class="icon i_p"></i>
                    <input type="password" v-model="password" ref="isPsd" placeholder="请输入6-16位密码" maxlength="16" @blur="ispsd()" />
                    <i :class="{'showEye': iconEye, 'closeEye': !iconEye}" @click="isEyes(1)"></i>
                </div>
                <div>
                    <i class="icon i_p"></i>
                    <input type="password" v-model="confirmPsd" ref="isPwd" placeholder="请再次输入密码" maxlength="16" @blur="ispwd()" @touchstart="inp($event)" />
                    <i :class="{'showEye': iconEyes, 'closeEye': !iconEyes}" @click="isEyes(0)"></i>
                </div>
                <div>
                    <i class="icon i_c"></i>
                    <input type="text" v-model="code" placeholder="请输入验证码" maxlength="4" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' @touchstart="inp($event)" />
                    <strong class="code" :class="{codeGry:time!==60}" @touchstart="getCode()">获取验证码{{time < 60 ? time: ''}}</strong>
                    <countdown v-model="time" :start="start" @on-finish="finish" v-show="show"></countdown>
                </div>
                <button type="button" class="com_btn" @touchstart="register()">注册</button>
            </form>
        </div>
    </section>
</template>

<script>
    import {regTest} from "../../assets/js/util";
    import { Countdown } from 'vux'
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "register",
        components: {
            Countdown,
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '注册',
                firmUrl: '', // 客服链接
                username: '', // 用户名
                account: '', // 账号
                password: '', // 密码
                confirmPsd: '', // 确认密码
                code: '', // 验证码
                time: 60, // 倒计时
                firstClick: true, // 防止用户投注重复点击
                start: false,
                show: false,
                iconEye: false,
                iconEyes: false
            }
        },
        methods: {
            inp (e) { // 兼容键盘挡住input框
                setTimeout(() => {
                    e.target.scrollIntoView(true)
                }, 300)
            },
            // 密码框切换
            isEyes (bool) {
                if (bool) {
                    this.iconEye = !this.iconEye
                    if (this.iconEye) {
                        this.$refs.isPsd.setAttribute('type', 'text')
                    } else {
                        this.$refs.isPsd.setAttribute('type', 'password')
                    }
                } else {
                    this.iconEyes = !this.iconEyes
                    if (this.iconEyes) {
                        this.$refs.isPwd.setAttribute('type', 'text')
                    } else {
                        this.$refs.isPwd.setAttribute('type', 'password')
                    }
                }
            },
            // 在线客服链接
            get_setting () {
                this.$get('setting', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.firmUrl = res.data.online_service.value
                })
            },
            // 失焦事件
            isUser () {
                if (!regTest().regAccount.test(this.username) && this.username) return this.$vux.toast.text('用户名至少6~16数字、字母下划线组合', 'middle')
            },
            isPhone () {
                if (!regTest().regPhone.test(this.account) && this.account) return this.$vux.toast.text('请输入正确的手机号码', 'middle')
            },
            ispsd () {
                if (!regTest().regPwd.test(this.password) && this.password) return this.$vux.toast.text('密码至少6~16字符组合', 'middle')
            },
            ispwd () {
                if (this.password !== this.confirmPsd && this.confirmPsd) return this.$vux.toast.text('两次密码不一致', 'middle')
            },
            // 注册
            register () {
                if (!regTest().regAccount.test(this.username) && this.username) return this.$vux.toast.text('用户名至少6~16数字、字母下划线组合', 'middle')
                if (!regTest().regPhone.test(this.account)) return this.$vux.toast.text('请输入正确的手机号码', 'middle')
                if (!regTest().regPwd.test(this.password)) return this.$vux.toast.text('密码至少6~16字符组合', 'middle')
                if (this.password !== this.confirmPsd) return this.$vux.toast.text('两次密码不一致', 'middle')
                if (!regTest().regCode.test(this.code)) return this.$vux.toast.text('请输入4位验证码', 'middle')
                let module = {
                    username: this.username,
                    phone: this.account,
                    password: this.confirmPsd,
                    verify_code: this.code,
                    parent_id:this.$route.query.pUID||''
                }
                this.$vux.loading.show({text: '注册中'})
                this.$post('reg', module).then(res => {
                    this.$vux.loading.hide()
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.$vux.toast.text('注册成功，登录中!', 'middle')
                    this.login(res.data.username, res.data.password)
                })
            },
            // 登录
            login (name, pwd) {
                let module = {
                    username: name,
                    password: pwd
                }
                this.$post('login', module).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(reg.msg_zh, 'middle')
                    localStorage.setItem('account', name)
                    this.$cookie.set('webToken', res.data.token, {expires: '24h'})
                    this.$router.push('/')
                })
            },
            // 获取验证码
            getCode () {
                if (!this.firstClick) return false
                this.firstClick = false // 防止重复点击
                if (!regTest().regPhone.test(this.account)) return this.$vux.toast.text('请输入正确的手机号码', 'middle'), this.firstClick = true
                if (!this.password) return this.$vux.toast.text('请输入密码', 'middle'), this.firstClick = true
                if (!regTest().regPwd.test(this.password) && this.password) return this.$vux.toast.text('密码至少6~16字符组合', 'middle'), this.firstClick = true
                if (!this.confirmPsd) return this.$vux.toast.text('请再次输入密码', 'middle'), this.firstClick = true
                if (this.password !== this.confirmPsd && this.confirmPsd) return this.$vux.toast.text('两次密码不一致', 'middle'), this.firstClick = true
                if (this.start) return false // 倒计时中
                let module = { phone: this.account }
                this.$post('verCode', module).then(res => {
                    if (res.code !== 0) return this.firstClick = true
                    this.start = true // 倒计时开始
                    this.$vux.toast.text('验证码已发送', 'middle')
                })
            },
            // 倒计时结束
            finish (index) {
                this.start = false, this.firstClick = true
                this.time = 60
            }
        },
        mounted () {
            this.$nextTick(() => {
                if (sessionStorage.getItem('kefuUrl')) {
                    this.firmUrl = sessionStorage.getItem('kefuUrl')
                } else {
                    this.get_setting()
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "css/comm";
</style>
