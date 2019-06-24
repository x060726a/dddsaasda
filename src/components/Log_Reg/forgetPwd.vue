<template>
    <section class="comBox">
        <div class="forgetH">
            <TrayHeader :title="title" />
            <a :href="firmUrl" target="_blank" class="kefu"><i></i>联系客服</a>
        </div>
        <div class="content">
            <span class="logo"></span>
            <form class="form">
                <div>
                    <i class="icon i_u"></i>
                    <input type="text" v-model="account" placeholder="请输入手机号" maxlength="11" @blur="isPhone()" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' />
                </div>
                <div>
                    <i class="icon i_c"></i>
                    <input type="text" v-model="code" placeholder="请输入验证码" maxlength="4" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' />
                    <strong class="code" :class="{codeGry:time!==60}" @touchstart="getCode()">获取验证码{{time < 60 ? time: ''}}</strong>
                    <countdown v-model="time" :start="start" @on-finish="finish" v-show="show"></countdown>
                </div>
                <div>
                    <i class="icon i_p"></i>
                    <input type="password" v-model="password" ref="isPsd" placeholder="请输入新密码" maxlength="16" @blur="ispsd" @touchstart="inp($event)" />
                    <i :class="{'showEye': iconEye, 'closeEye': !iconEye}" @click="isEyes(1)"></i>
                </div>
                <div>
                    <i class="icon i_p"></i>
                    <input type="password" v-model="confirmPsd" ref="isPwd" placeholder="请再次输入新密码" maxlength="16" @touchstart="inp($event)" />
                    <i :class="{'showEye': iconEyes, 'closeEye': !iconEyes}" @click="isEyes(0)"></i>
                </div>
                <button type="button" class="com_btn" @touchstart="register()">确认</button>
            </form>
        </div>
    </section>
</template>

<script>
    import {regTest} from "../../assets/js/util";
    import { Countdown } from 'vux'
    const TrayHeader = import('../public/rn-header')
    export default {
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
                title: '忘记密码',
                account: '', // 账号
                password: '', // 密码
                confirmPsd: '', // 确认密码
                code: '', // 验证码
                firstClick: true, // 防止用户投注重复点击
                time: 60, // 倒计时
                start: false,
                show: false,
                firmUrl: '', // 客服链接
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
            // 失焦事件
            isPhone () {
                if (!regTest().regPhone.test(this.account) && this.account) return this.$vux.toast.text('请输入正确的手机号码', 'middle')
            },
            ispsd () {
                if (!regTest().regPwd.test(this.password) && this.password) return this.$vux.toast.text('密码至少6~16字符组合', 'middle')
            },
            // 找回密码
            register () {
                if (!regTest().regPhone.test(this.account)) return this.$vux.toast.text('请输入正确的手机号码', 'middle')
                if (!regTest().regCode.test(this.code)) return this.$vux.toast.text('请输入4位验证码', 'middle')
                if (!regTest().regPwd.test(this.password)) return this.$vux.toast.text('密码至少6~16字符组合', 'middle')
                if (this.password !== this.confirmPsd) return this.$vux.toast.text('两次密码不一致', 'middle')
                let module = {
                    phone: this.account,
                    verify_code: this.code,
                    forget_password: this.password,
                    confirm_forget_password: this.confirmPsd
                }
                this.$vux.loading.show({text: '修改中'})
                this.$post('forgetPwd', module).then(res => {
                    this.$vux.loading.hide()
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    localStorage.setItem('account', res.data.username)
                    this.$vux.toast.text('修改成功，请重新登录!', 'middle')
                    this.$router.push('/login')
                })
            },
            // 在线客服链接
            get_setting () {
                this.$get('setting', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.firmUrl = res.data.online_service.value
                })
            },
            // 获取验证码
            getCode () {
                if (!this.firstClick) return false
                this.firstClick = false // 防止重复点击
                if (this.start) return false // 倒计时中
                if (!regTest().regPhone.test(this.account)) return this.$vux.toast.text('请输入正确的手机号码', 'middle'), this.firstClick = true
                let module = { phone: this.account, for: 1 }
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
