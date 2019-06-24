<template>
    <div class="HomeHeader">
        <h1>
            <!--<i class="icon-left" v-if="token" @click="$router.push({path:'/manage'})"></i>-->
            <router-link v-if="down && isDown" class="down" to="/down">下载APP</router-link>
            {{title}}
            <p class="reg_log" v-if="!token && title == '易趣彩票'">
                <router-link to="/login" >登录&nbsp;/&nbsp;</router-link>
                <router-link to="/register">注册</router-link>
            </p>
            <i class="icon-right" v-if="icon" @click="$router.push({path: 'ruleDetails', query: {id: 888, title: '跟单说明'}})"></i>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader",
        data(){
            return{
                token: '',
                isDown: false
            }
        },
        props: {
            title: String, // 标题
            icon: Boolean,
            down: {
                type: Boolean,
                default: false
            }
        },
        created(){
            let url = window.location.href
            if (url != 'https://www.yiqucp999.com/main' && url != 'https://www.yiqucp888.com/main' && url != 'https://yiqucp999.com/main' && url != 'https://yiqucp888.com/main') this.isDown = true
            this.token = this.$cookie.get('webToken') || ''
        }
    }
</script>

<style lang="scss" scoped>
    .HomeHeader h1 {
        height: 88px; background: #D9342F; color: #fff; font-size: 34px; line-height: 88px; text-align: center;
        .down {
            position: absolute; top: 0; left: 20px; height: 88px; line-height: 88px; font-size: 30px;
        }
        .icon-left {
            position: absolute; top: 22px; left: 20px; width: 43px; height: 44px; background: url("~@/assets/image/index/peoplelist.png") no-repeat center; background-size: cover;
        }
        .icon-right {
            position: absolute; top: 22px; right: 20px; width: 41px; height: 44px; background: url("~@/assets/image/documentary/rule.png") no-repeat center; background-size: cover;
        }
        .reg_log {
            position: absolute; top: 0; right: 20px; font-size: 30px;
            a { float: left; }
        }
    }
</style>
